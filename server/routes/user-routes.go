package routes

import (
	"net/http"
	"time"

	"biolog/database"
	"biolog/middlewares"
	"biolog/models"
	"biolog/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type signupData struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func signup(ctx echo.Context) error {
	data := new(signupData)
	if err := ctx.Bind(data); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao cadastrar usuário.")
	}

	if !utils.IsValidEmail(data.Email) {
		return echo.NewHTTPError(http.StatusBadRequest, "Email não permitido.")
	}

	existingUser := new(models.User)
	database.DB.Where(&models.User{Email: data.Email}).First(&existingUser)

	if existingUser.Email == data.Email {
		return echo.NewHTTPError(http.StatusBadRequest, "Email já cadastrado no banco de dados.")
	}

	hashedPassword, err := utils.HashPassword(data.Password)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao cadastrar usuário.")
	}

	user := &models.User{
		Name:           data.Name,
		Email:          data.Email,
		HashedPassword: hashedPassword,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao cadastrar usuário.")
	}

	return ctx.NoContent(http.StatusCreated)
}

func login(ctx echo.Context) error {
	data := new(loginData)
	if err := ctx.Bind(data); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao fazer login.")
	}

	if !utils.IsValidEmail(data.Email) {
		return echo.NewHTTPError(http.StatusBadRequest, "Email não permitido.")
	}

	user := new(models.User)
	database.DB.Where("email = ?", data.Email).First(user)

	if user.ID == 0 || !utils.CheckPasswordHash(data.Password, user.HashedPassword) {
		return echo.NewHTTPError(http.StatusBadRequest, "Email ou senha incorretos.")
	}

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte("secret"))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao fazer login.")
	}

	return ctx.JSON(http.StatusOK, echo.Map{
		"token": t,
	})
}

func profile(ctx echo.Context) error {
	userID := ctx.Get("id").(uint)

	user := new(models.User)
	database.DB.Where(userID).First(user)

	if err := database.DB.Where(userID).First(user).Error; err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Erro ao requisitar dados da conta.")
	}

	return ctx.JSON(http.StatusOK, user)
}

func SetupUserRoutes(app *echo.Echo) {
	group := app.Group("/user")

	group.POST("/signup", signup)
	group.POST("/login", login)
	group.GET("/profile", profile, middleware.JWT([]byte("secret")), middlewares.Auth)

}
