package utils

import (
	"context"
	"io"
	"mime/multipart"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"
)

func UploadFile(file multipart.File, filename string) (string, error) {
	ctx := context.Background()

	storageClient, err := storage.NewClient(ctx, option.WithCredentialsFile("google-credentials.json"))
	if err != nil {
		return "", err
	}

	sw := storageClient.Bucket("biolog").Object(filename).NewWriter(ctx)
	_, err = io.Copy(sw, file)
	if err != nil {
		return "", err
	}

	err = sw.Close()
	if err != nil {
		return "", err
	}

	return "https://storage.googleapis.com/biolog/" + filename, nil
}
