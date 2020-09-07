package app

import (
	"github.com/juanbelieni/biolog/server/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func newApp() *echo.Echo {
	app := echo.New()

	middleware.ErrJWTMissing.Code = 401
	middleware.ErrJWTMissing.Message = "Faça login primeiro."

	app.Use(middleware.Logger())
	app.Use(middleware.Recover())
	app.Use(middleware.CORS())

	routes.SetupRoutes(app)

	return app
}

var App = newApp()
