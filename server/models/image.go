package models

import "time"

type Image struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	Name      string    `json:"name"`
	Filename  string    `json:"filename"`
	UserID    uint      `json:"-"`
	User      User      `json:"user"`
	CreatedAt time.Time `json:"createdAt"`
}
