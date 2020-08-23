package routes

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/juanbelieni/biolog/server/database"
	"github.com/juanbelieni/biolog/server/middlewares"
	"github.com/juanbelieni/biolog/server/models"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type serializedImage struct {
	models.Image
	URL string `json:"url"`
}

func storeImage(ctx echo.Context) error {
	name := ctx.FormValue("name")
	userID := ctx.Get("id").(uint)

	file, err := ctx.FormFile("image")
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao enviar imagem.")
	}
	src, err := file.Open()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao enviar imagem.")
	}
	defer src.Close()

	filename := strconv.FormatInt(time.Now().UnixNano(), 10) + filepath.Ext(file.Filename)

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

	if err := database.DB.Create(image).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao enviar imagem.")
	}

	return ctx.NoContent(http.StatusCreated)
}

func indexImages(ctx echo.Context) error {
	images := &[]models.Image{}

	if err := database.DB.Preload("User").Find(images).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao buscar imagens no banco de dados.")
	}

	serializedImages := []serializedImage{}

	for _, image := range *images {
		serializedImages = append(serializedImages, serializedImage{
			Image: image,
			URL:   fmt.Sprintf("http://%s/public/%s", ctx.Request().Host, image.Filename),
		})
	}

	return ctx.JSON(http.StatusOK, serializedImages)
}

func deleteImage(ctx echo.Context) error {
	imageID, err := strconv.ParseUint(ctx.Param("id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao apagar imagem.")
	}

	userID := ctx.Get("id").(uint)

	image := new(models.Image)
	if err := database.DB.Where(imageID).First(image).Error; err != nil || uint(imageID) != image.ID {
		return echo.NewHTTPError(http.StatusNotFound, "Imagem não encontrada.")
	}

	if image.UserID != userID {
		return echo.NewHTTPError(http.StatusUnauthorized, "Você não tem permisão para apagar essa imagem.")
	}

	if err := database.DB.Delete(image).Error; err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Erro ao apagar imagem.")
	}

	return ctx.NoContent(http.StatusOK)
}

func SetupImageRoutes(app *echo.Echo) {
	group := app.Group("/image")
	group.POST("", storeImage, middleware.JWT([]byte("secret")), middlewares.Auth)
	group.GET("", indexImages)
	group.DELETE("/:id", deleteImage, middleware.JWT([]byte("secret")), middlewares.Auth)
}
