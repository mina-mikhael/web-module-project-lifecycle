import React from 'react'

export default class Form extends React.Component {
  render() {
    const {
      changeHandler,
      submitHandler,
      newToDoText,
      clearCompleted,
      clearBtnPressed,
    } = this.props;
    return (
      <div>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="add new todo"
            value={newToDoText}
            onChange={changeHandler}
          />
          &nbsp;
          <button> Add</button>
        </form>
        <button
          onClick={() => {
            clearCompleted();
          }}>
          {" "}
          {clearBtnPressed ? "Show Completed" : "Clear Completed"}
        </button>
      </div>
    );
  }
}
