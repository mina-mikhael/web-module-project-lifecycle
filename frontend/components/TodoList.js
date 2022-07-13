import React from 'react'
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    const { filteredTodos, message } = this.props;

    return (
      <div className="todoList">
        <h2>
          {" "}
          {message === "Here are your Todos"
            ? `${message} :`
            : "there was an error"}
        </h2>
        {filteredTodos.map((todo) => {
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
