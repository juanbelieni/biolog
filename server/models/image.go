package models

import "time"

type Image struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	Name      string    `json:"name"`
	URL       string    `json:"url"`
	UserID    uint      `json:"-"`
	User      User      `json:"user"`
	CreatedAt time.Time `json:"createdAt"`
}
