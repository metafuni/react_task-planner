import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import TodoForm from './TodoForm';

const App = () => {

  //Define State
  const [todos, setTodos] = useState([]);

  //Global State Variables
  const [error, setError] = useState('');
  const [bell, setBell] = useState(false);
  const [sound, setSound] = useState(true);

  //Define Sound Constants
  const completedSound = new Audio('/completed.wav');
  const deleteSound = new Audio('/delete.wav');
  const timerSound = new Audio('/submit.wav');

  //Todo Functions
  const addTodo = (text) => {
    if (todos.length < 15) {
      const newTodos = [...todos, { text }];
      setTodos(newTodos);
    } else {
      const maxItems = document.querySelector(".max-items");
      maxItems.style.display = 'block';
      setTimeout(() => {
        maxItems.style.display = 'none';
      }, 2000);
    };
  };

  const completeTodo = (index) => {
    if (sound === true) {
      completedSound.play();
    };

    const newTodos = [...todos];
    newTodos[index].completed === undefined ? newTodos[index].completed = true : newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos[index].completed = false);
    setTodos(todos[index].timer = undefined);

    if (sound === true) {
      deleteSound.play();
    };

    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setBell(false);
  };

  //Define Timer Variables for Conversion
  let timerValue;
  let delay;

  //Timer Functions

  //Modal Timerwindow
  const timerTodo = (index) => {
    const timerWindow = document.querySelectorAll('.timer-input');
    const closeWindowButton = document.querySelectorAll('.fa-window-close');

    timerWindow[index].style.opacity = '1';
    timerWindow[index].style.pointerEvents = 'auto';

    const closeWindow = () => {
      timerWindow[index].style.opacity = '0';
      timerWindow[index].style.pointerEvents = 'none';
    };

    closeWindowButton[index].addEventListener('click', () => {
      closeWindow();
    });

    window.onclick = (e) => {
      if (e.target === timerWindow[index]) {
        closeWindow();
      }
    };
  };

  //Convert input time and set delay
  const setTime = (e) => {
    const inputTime = e.target.value.split(":");
    const inputHours = parseInt(inputTime[0], 10) * 3600;
    const inputMinutes = parseInt(inputTime[1], 10) * 60;
    delay = (inputHours + inputMinutes);
  };

  //Time till alarm needs to go off
  const setAlarm = (index) => {
    const now = new Date();
    const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    timerValue = ((currentTime - delay) * -1) * 1000;

    //Set timer state for todo
    if (timerValue > 0) {
      const newTodos = [...todos];
      newTodos[index].timer = timerValue;
      setTodos(newTodos);
      setError('');

      todos[index].stars ? todos[index].stars++ : todos[index].stars = 1;

    } else {
      setError('Please enter a valid time');
      return;
    };

    //Close Modal Window
    const timerWindow = document.querySelectorAll('.timer-input');
    timerWindow[index].style.opacity = '0';
    timerWindow[index].style.pointerEvents = 'none';

    setTimeout(() => {
      ringAlarm(index);
    }, timerValue);
  };

  //Ring Alarm Function
  const ringAlarm = (index) => {
    // in case you only want the first submitted alarm to be ringing and cancel every after, do this if statement:
    // if (todos[index].timer !== -10) {

    todos[index].timer = -1;

    setBell(true);

    if (sound === true) {
      timerSound.play()
      const playSound = setInterval(() => {
        timerSound.play()
      }, 1500);

      setTimeout(() => {
        clearInterval(playSound);
      }, 4500);
    };

    const window = document.getElementById('ring-box');
    window.style.opacity = '1';
    window.style.transform = 'translateX(12%)';

    setTimeout(() => {
      window.style.transform = 'translateX(-100%)';
    }, 4500);

    todos[index].timer = -10;
    // };
  };

  //Toggle Sound via Button
  const toggleSound = () => {
    let lineThrough = document.querySelector('.line-through');
    sound === true ? lineThrough.style.display = 'none' : lineThrough.style.display = 'block';
  };

  return (
    <div className="App">
      <div className="overlay"></div>
      <div className="container">
        <div className="top-buttons">
          <img
            id="logo"
            src="./blank.png"
            alt="start a new session"
            onMouseOver={() => { document.getElementById('new-tooltip').style.opacity = '1' }}
            onMouseOut={() => { document.getElementById('new-tooltip').style.opacity = '0' }}
            onClick={() => {
              document.getElementById('new-tooltip').style.opacity = '0';
              setTodos([]);
            }}
          />
          <span id="new-tooltip">start a new page</span>
          <img
            id="sound-off"
            src="./sound-off.png"
            alt="toggle off alarm sounds"
            onMouseOver={() => { document.getElementById('sound-tooltip').style.opacity = '1' }}
            onMouseOut={() => { document.getElementById('sound-tooltip').style.opacity = '0' }}
            onClick={() => {
              setSound(!sound);
              toggleSound();
            }}
          />
          <span id="sound-tooltip">toggle sound</span>
          <span className="line-through"></span>
        </div>
        <h1 className="title">
          Office Task Planner
      </h1>
        <p className="intro-text">
          Add any of your tasks for the day in this task planner and set the reminders with the timer function. <br></br><br></br>The timer function can only
          be set for your tasks during office-hours, e.g. between <span style={{ fontStyle: 'italic' }}>09:00</span> and <span style={{ fontStyle: 'italic' }}>17:00
          </span>.
      </p>
        <div className="todos-list">
          {todos.map((todo, index) =>
            <Todo
              key={index}
              index={index}
              todo={todo}
              error={error}
              timerTodo={timerTodo}
              setTime={setTime}
              setAlarm={setAlarm}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          )}
          <TodoForm addTodo={addTodo} />
        </div>
        {bell ? <span id="ring-box"><p>Time is up! <br></br>Did you complete your task?</p></span> : null}
        <p className="extra-text">
          * On every added timer for your item, an additional asterix symbol <span style={{ color: 'rgba(150, 150, 225, 1)' }}>(*)</span> will appear on your task to keep track of the amount of reminders for the task. Once the timers are set, the alarm will ring for every submitted time.
        <br></br><br></br>
          * Once the alarm rang for your task there is no possibility to delete or amend the item. In this way you will be able to see what you achieved throughout, and by the end of the day.
      </p>
      </div>
    </div>
  );
};

export default App;
