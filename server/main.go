package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func initalizeRouter(){
	router := mux.NewRouter()

	router.HandleFunc("/", getTasks).Methods("GET")
	router.HandleFunc("/", createTask).Methods("POST")
	router.HandleFunc("/{id}", updateTask).Methods("PUT")
	router.HandleFunc("/{id}", deleteTask).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":9000", router))
}

func main(){
	initialMigration()
	initalizeRouter()
}