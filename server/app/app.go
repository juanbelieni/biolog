package app

import (
	"github.com/juanbelieni/biolog/server/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func newApp() *echo.Echo {
	app := echo.New()

	app.Use(middleware.Logger())
	app.Use(middleware.Recover())
	app.Use(middleware.CORS())
	app.Static("public", "public")

	routes.SetupRoutes(app)

	return app
}

var App = newApp()
