package main

import "github.com/juanbelieni/biolog/server/app"

func main() {
	app := app.App
	app.Logger.Fatal(app.Start(":3333"))
}
