package main

import (
	_ "github.com/joho/godotenv/autoload"
	"biolog/app"
)

func main() {
	app := app.App
	port := "3333"

	app.Logger.Fatal(app.Start(":" + port))
}
