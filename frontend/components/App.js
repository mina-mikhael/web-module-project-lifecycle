import React from 'react'
import TodoList from "./TodoList";
import axios from "axios";

const URL = "http://localhost:9000/api/todos";

export default class App extends React.Component {
  state = {
    todos: [],
    message: "",
  };

  componentDidMount() {
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data);
        this.setState({
          todos: res.data.data,
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  clickhandler = (itemID) => {
    this.setState({
      todos: this.state.todos.map((item) => {
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
  render() {
    return (
      <div className="app">
        <TodoList
          todos={this.state.todos}
          message={this.state.message}
          clickhandler={this.clickhandler}
        />
      </div>
    );
  }
}
