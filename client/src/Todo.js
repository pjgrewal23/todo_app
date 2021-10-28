import React, { Component } from "react";
import axios from 'axios';
import { Card, Header, Form, Input, Button } from "semantic-ui-react";
import moment from 'moment'
import 'semantic-ui-css/semantic.min.css';
import TodoModal from "./TodoModal";

let api = "http://localhost:9000";

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: []
    };

    this.getTask = this.getTask.bind(this);
  }
  
  componentDidMount() {
    this.getTask();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    let todo = { todo:this.state.task};
    if (this.state.task) {
      axios
        .post(
          api, JSON.stringify(todo)
        )
        .then(res => {
          this.getTask();
          this.setState({
            task: ""
          });
          console.log(res);
        });
    }
  };

  getTask = () => {
    axios.get(api).then(res => {
      if (res.data) {
        this.setState({
          items: res.data
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  };

  updateTask = id => {
    axios
      .put(api + "/" + id)
      .then(res => {
        
        this.getTask();
      });
  };

  deleteTask = id => {
    axios
      .delete(api + "/" + id)
      .then(res => {
        console.log(res);
        this.getTask();
      });
  };

  //Creates list as Cards
  todoList = () => {
     return (this.state.items.map(item => {
      return (
      <Card key={item.ID} fluid>
        <Card.Content>
          <Card.Header textAlign="left">
            <div style={{ wordWrap: "break-word" }}>{item.todo}</div>
          </Card.Header>
          <Card.Meta textAlign="right">
            <span style={{ paddingRight: 10 }}>{moment(item.CreatedAt).format('MMMM Do YYYY')}</span>
            <TodoModal todo={item} getTask={this.getTask}/>
            <Button onClick={() => this.deleteTask(item.ID)} basic color='red'>Delete</Button>
          </Card.Meta>
        </Card.Content>
      </Card>
    );})
    )
  }
  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2">
            TO DO LIST
          </Header>
        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Create Task"
            />
            
          </Form>
          <br/>
        </div>
        <div className="row">
          <Card.Group>{this.todoList()}</Card.Group>
        </div>
      </div>
    );
  }
}

export default Todo;