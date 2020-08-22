package middlewares

import (
	"net/http"

	"github.com/dgrijalva/jwt-go"
	"github.com/juanbelieni/biolog/server/database"
	"github.com/juanbelieni/biolog/server/models"
	"github.com/labstack/echo/v4"
)

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(ctx echo.Context) error {
		userID := uint(ctx.Get("user").(*jwt.Token).Claims.(jwt.MapClaims)["id"].(float64))

		user := new(models.User)
		if err := database.DB.Where(userID).First(user).Error; err != nil || user.ID != userID {
			return echo.NewHTTPError(http.StatusUnauthorized, "Falha na autenticação, faça login novamente.")
		}

		ctx.Set("id", userID)
		return next(ctx)
	}
}
