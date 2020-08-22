package database

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/juanbelieni/biolog/server/models"
)

func getConnection() *gorm.DB {
	c, err := gorm.Open("sqlite3", "db.sqlite")
	if err != nil {
		panic("db: Failed to connect to database")
	}

	c.AutoMigrate(&models.User{}, &models.Image{})

	return c
}

var DB = getConnection()
