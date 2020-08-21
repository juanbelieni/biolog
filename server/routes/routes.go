package routes

import (
	"github.com/labstack/echo/v4"
)

func SetupRoutes(app *echo.Echo) {
	SetupUserRoutes(app)
	SetupImageRoutes(app)
}
