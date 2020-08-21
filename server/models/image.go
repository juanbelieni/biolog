package models

import "time"

type Image struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	Name      string    `json:"name"`
	Filename  string    `json:"filename"`
	User      User      `json:"user" gorm:"polymorphic:User;"`
	UserID    uint      `json:"-"`
	CreatedAt time.Time `json:"createdAt"`
}
