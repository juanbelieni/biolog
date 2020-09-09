package main

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
	"github.com/juanbelieni/biolog/server/app"
)

func main() {
	app := app.App
	port := os.Getenv("PORT")
	if port == "" {
		port = "3333"
	}

	app.Logger.Fatal(app.Start(":" + port))
}
