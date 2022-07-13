import React from 'react'
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    const { todos, message } = this.props;
    console.log(this.props, "from todolist");
    return (
      <div className="todoList">
        <h2>
          {" "}
          {message === "Here are your Todos"
            ? `${message} :`
            : "there was an error"}
        </h2>
        {todos.map((todo) => {
          console.log(todo, "from todo");
          return (
            <Todo
              key={todo.id}
              todo={todo}
              clickhandler={this.props.clickhandler}
            />
          );
        })}
      </div>
    );
  }
}
