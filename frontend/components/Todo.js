import React from 'react'

export default class Todo extends React.Component {
  render() {
    const { todo } = this.props;
    return (
      <div
        className="todo"
        onClick={() => {
          this.props.clickhandler(todo.id);
        }}>
        <h3>
          {" "}
          {todo.name} {todo.completed ? String.fromCharCode(0x2713) : ""}{" "}
        </h3>
      </div>
    );
  }
}
