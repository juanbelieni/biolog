package models

import "time"

type User struct {
	ID             uint      `json:"id" gorm:"primary_key"`
	Name           string    `json:"name"`
	Email          string    `json:"email"`
	HashedPassword string    `json:"-"`
	CreatedAt      time.Time `json:"createdAt"`
}
