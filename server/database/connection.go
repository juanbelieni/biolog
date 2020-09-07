package database

import (
	"fmt"
	"os"

	"biolog/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func getConnection() *gorm.DB {
	dsn, exists := os.LookupEnv("DATABASE_URL")
	if !exists {
		panic("db: DATABASE_URL not found in env")
	}
	c, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
		panic("db: Failed to connect to database")
	}

	c.AutoMigrate(&models.User{}, &models.Image{})

	return c
}

var DB = getConnection()
