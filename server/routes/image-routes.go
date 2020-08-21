package routes

import (
	"io"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/juanbelieni/biolog/server/database"
	"github.com/juanbelieni/biolog/server/models"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func storeImage(ctx echo.Context) error {
	name := ctx.FormValue("name")
	userID := uint(ctx.Get("user").(*jwt.Token).Claims.(jwt.MapClaims)["id"].(float64))

	file, err := ctx.FormFile("image")
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao enviar imagem.")
	}
	src, err := file.Open()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao enviar imagem.")
	}
	defer src.Close()

	filename := strconv.FormatInt(time.Now().UnixNano(), 10) + "-" + file.Filename

	dst, err := os.Create("public/" + filename)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao enviar imagem.")
	}
	defer dst.Close()

	if _, err = io.Copy(dst, src); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao enviar imagem.")
	}

	image := &models.Image{
		Name:     name,
		Filename: filename,
		UserID:   userID,
	}

	if err := database.DB.Create(&image).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao enviar imagem.")
	}

	return ctx.NoContent(http.StatusCreated)
}

func indexImages(ctx echo.Context) error {
	images := &[]models.Image{}

	if err := database.DB.Preload("User").Find(&images).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao buscar imagens no banco de dados.")
	}

	return ctx.JSON(http.StatusOK, images)
}

func SetupImageRoutes(app *echo.Echo) {
	group := app.Group("/image")
	group.POST("", storeImage, middleware.JWT([]byte("secret")))
	group.GET("", indexImages)
}
