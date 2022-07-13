import React from 'react'
import TodoList from "./TodoList";
import axios from "axios";
import Form from "./Form";
const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
    todoNewText: "",
    clearBtnPressed: false,
    error: "",
  };
  postNewTodo = () => {
    axios
      .post(URL, { name: this.state.todoNewText })
      .then(() => this.addAllTodos())
      .catch((err) =>
        this.setState({ ...this.state, error: err.response.data.message })
      );
  };

  addAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
        this.setState({ ...this.state, error: "" });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  componentDidMount() {
    this.addAllTodos();
  }

  clickhandler = (itemID) => {
    axios
      .patch(`${URL}/${itemID}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((item) => {
            if (item.id !== itemID) {
              return item;
            } else return res.data.data;
          }),
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  changeHandler = (e) => {
    this.setState({
      ...this.state,
      todoNewText: e.target.value,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.postNewTodo();
    this.setState({ ...this.state, todoNewText: "" });
  };

  clearCompleted = () => {
    this.setState({
      ...this.state,
      clearBtnPressed: !this.state.clearBtnPressed,
    });
  };

  render() {
    return (
      <div className="app">
        {this.state.error && (
          <h2 className="error">ERROR: {this.state.error}</h2>
        )}
        <TodoList
          todos={this.state.todos}
          message={this.state.message}
          clickhandler={this.clickhandler}
          clearBtnPressed={this.state.clearBtnPressed}
        />
        <Form
          changeHandler={this.changeHandler}
          submitHandler={this.submitHandler}
          todoNewText={this.state.todoNewText}
          clearCompleted={this.clearCompleted}
          clearBtnPressed={this.state.clearBtnPressed}
        />
      </div>
    );
  }
}
