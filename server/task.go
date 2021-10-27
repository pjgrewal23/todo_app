package main

import (
	"net/http"
	"encoding/json"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"github.com/gorilla/mux"
)

type Task struct {
	gorm.Model
	Todo string `json:"todo"`
}

var database *gorm.DB
var err error
const connectionString = "sql3447065:bAmenEaEUj@tcp(sql3.freemysqlhosting.net:3306)/sql3447065?charset=utf8mb4&parseTime=True&loc=Local"


func initialMigration(){
	database, err = gorm.Open(mysql.Open(connectionString), &gorm.Config{})

	//Check for errors
	if err != nil {
		panic("Couldn't connect to Database")
	}

	//Checks if Task table exists in database if not it creates one
	database.AutoMigrate(&Task{})
}

func getTasks(writer http.ResponseWriter, request *http.Request){
	writer.Header().Set("Content-Type", "application/json")

	var tasks []Task

	//gets tasks in desceding order from the database
	database.Order("created_at desc").Find(&tasks)

	json.NewEncoder(writer).Encode(&tasks)

}

func createTask(writer http.ResponseWriter, request *http.Request){
	writer.Header().Set("Content-Type", "application/json")

	var task Task
	json.NewDecoder(request.Body).Decode(&task)

	database.Create(&task)

	json.NewEncoder(writer).Encode(task)
}

func updateTask(writer http.ResponseWriter, request *http.Request){
	writer.Header().Set("Content-Type", "application/json")
	params := mux.Vars(request)

	var task Task

	//finds task in database using id 
	database.First(&task, params["id"])
	
	json.NewDecoder(request.Body).Decode(&task)
	database.Save(&task)

	json.NewEncoder(writer).Encode(task)
}

func deleteTask(writer http.ResponseWriter, request *http.Request){
	
}