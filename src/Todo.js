import React, { useEffect } from 'react';

const Todo = ({ todo, index, error, timerTodo, setTime, setAlarm, completeTodo, deleteTodo }) => {
  return (
    <div style={{
      color: todo.completed ? 'green' : todo.stars > 0 ? 'rgba(0, 75, 75, .7)' : 'black',
      textDecoration: todo.completed ? 'line-through' : '',
      animation: todo.timer === -1 ? 'flash 1.1s 4 ease-in-out' : 'none'
    }} className="todo">
      {todo.text}
      {todo.stars > 0 ? ' *' : ''}
      {todo.stars > 1 ? <span id="stars-amount">({todo.stars})</span> : null}
      <div className="buttons">

        {/* test code */}
        {todo.timer < 0 ? <button className="timer-button-2">
          <i className="fa fa-bell-slash" id="slash-bell"></i>
        </button> : <button className="timer-button" onClick={() => timerTodo(index)}>
          <i className="fa fa-bell"></i>
        </button>}

        {/* <button className="timer-button active" onClick={() => timerTodo(index)}>
          <i className="fa fa-bell"></i>
        </button>
        <button className="timer-button-2">
          <i className="fa fa-bell-slash" id="slash-bell"></i>
        </button> */}
        <button className="complete-button" onClick={() => completeTodo(index)}>
          {todo.completed ? <i className="fa fa-undo"></i> : <i className="fa fa-check"></i>}
        </button>

        {/* test code */}
        {todo.timer < 0 ?
          <button className="delete-button-2">
            <i className="fa fa-times"></i>
          </button> : <button className="delete-button" onClick={() => deleteTodo(index)}>
            <i className="fa fa-times"></i>
          </button>}

        {/* <button className="delete-button" onClick={() => deleteTodo(index)}>
            <i className="fa fa-times"></i>
          </button>
          <button className="delete-button-2">
            <i className="fa fa-times"></i>
          </button> */}
      </div>
      <span className="timer-input">
        <div className="timer-box">
          <i className="fa fa-window-close"></i>
          <label htmlFor="timer-input">
            <span style={{ color: 'black' }}>Set timer for: </span><br></br>
            <span className="todo-text" style={{ fontStyle: 'italic' }}>{todo.text}</span>
          </label><br></br>
          <input type="time" id="timer-input" name="timer-input" min="09:00" max="23:00" onChange={setTime} required></input>
          {error !== '' ? <span id="error-message"><i className="fa fa-exclamation-circle"></i> {error}</span> : null}
          <input type="submit" id="set-timer-button" value="set timer" onClick={() => setAlarm(index)}></input>
        </div>
      </span>
    </div>
  );
};

export default Todo;