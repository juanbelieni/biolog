package main

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
	"github.com/juanbelieni/biolog/server/app"
)

func main() {
	var port string
	app := app.App

	port, exists := os.LookupEnv("PORT")
	if !exists {
		port = "3333"
	}

	app.Logger.Fatal(app.Start(":" + port))
}
