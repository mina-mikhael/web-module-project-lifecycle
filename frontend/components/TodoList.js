import React from 'react'
import Todo from "./Todo";

export default class TodoList extends React.Component {
  render() {
    const { todos, clearBtnPressed, clickhandler } = this.props;

    return (
      <div className="todoList">
        <h2>Todos:</h2>
        {todos.reduce((acc, todo) => {
          if (!clearBtnPressed || !todo.completed)
            return acc.concat(
              <Todo key={todo.id} todo={todo} clickhandler={clickhandler} />
            );
          return acc;
        }, [])}
      </div>
    );
  }
}
