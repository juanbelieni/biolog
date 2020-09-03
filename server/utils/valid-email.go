package utils

import "fmt"

var validEmails []string = []string{
	"juan.belieni@alunos.ifsuldeminas.edu.br",
}

func IsValidEmail(email string) bool {
	for _, validEmail := range validEmails {
		if email == validEmail {
			fmt.Println(email)
			return true
		}
	}

	return false
}
