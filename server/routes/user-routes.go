package routes

import (
	"net/http"
	"time"

	"github.com/juanbelieni/biolog/server/database"
	"github.com/juanbelieni/biolog/server/models"
	"github.com/juanbelieni/biolog/server/utils"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

type signinData struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func signin(ctx echo.Context) error {
	data := new(signinData)
	if err := ctx.Bind(data); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao cadastrar usuário.")
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

	user := new(models.User)
	database.DB.Where(&models.User{Email: data.Email}).First(user)

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

func SetupUserRoutes(app *echo.Echo) {
	group := app.Group("/user")

	group.POST("/signin", signin)
	group.POST("/login", login)
}
