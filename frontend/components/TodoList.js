import React from 'react'
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    const { todos, message } = this.props;

    return (
      <div className="todoList">
        <h2>Todos:</h2>
        {todos.map((todo) => {
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
