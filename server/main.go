package main

import (
	"os"

	_ "github.com/joho/godotenv/autoload"
	"github.com/juanbelieni/biolog/server/app"
)

func main() {
	app := app.App
	app.Logger.Fatal(app.Start(":" + os.Getenv("PORT")))
}
