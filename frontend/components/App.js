import React from 'react'
import TodoList from "./TodoList";
import axios from "axios";
import Form from "./Form";
const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    message: "",
    newToDoText: "",
    clearBtnPressed: false,
    newTodo: {},
  };

  componentDidMount() {
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
        this.setState({
          todos: res.data.data,
          message: res.data.message,
          filteredTodos: res.data.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  clickhandler = (itemID) => {
    this.setState({
      filteredTodos: this.state.filteredTodos.map((item) => {
        if (itemID === item.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        } else {
          return { ...item };
        }
      }),
    });
  };

  changeHandler = (e) => {
    this.setState({
      newToDoText: e.target.value,
    });
  };
  newToDo = () => {
    const createdTodo = {
      name: this.state.newToDoText,
      id: Date.now(),
      completed: false,
    };
    this.setState({ newTodo: createdTodo });
    console.log("new ToDO: ", this.state.newTodo);
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.newToDo();
    axios
      .post(URL, this.state.newTodo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
    this.setState({ newToDoText: "" });
  };

  clearCompleted = () => {
    this.setState({
      clearBtnPressed: !this.state.clearBtnPressed,
    });
    if (this.state.clearBtnPressed === false) {
      this.setState({ filteredTodos: this.state.todos });
    } else {
      this.setState({
        filteredTodos: this.state.todos.filter((element) => !element.completed),
      });
    }
  };
  render() {
    return (
      <div className="app">
        <TodoList
          filteredTodos={this.state.filteredTodos}
          message={this.state.message}
          clickhandler={this.clickhandler}
        />
        <Form
          changeHandler={this.changeHandler}
          submitHandler={this.submitHandler}
          newToDoText={this.state.newToDoText}
          clearCompleted={this.clearCompleted}
          clearBtnPressed={this.state.clearBtnPressed}
        />
      </div>
    );
  }
}
