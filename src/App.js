import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './Todo';
import TodoForm from './TodoForm';

const App = () => {

  //Define State
  const [todos, setTodos] = useState([{
    text: 'make coffee',
    completed: false,
    timer: 0,
    deleted: false
  }, {
    text: 'HR meeting',
    completed: false,
    timer: 0,
    deleted: false
  }, {
    text: 'administration',
    completed: false,
    timer: 0,
    deleted: false
  }]);

  const [error, setError] = useState('');
  const [bell, setBell] = useState(false);

  //Define Variables
  const completedSound = new Audio('/completed.wav');
  const deleteSound = new Audio('/delete.wav');
  const timerSound = new Audio('/submit.wav');

  //Todo Functions
  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    completedSound.play();

    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos[index].deleted = true);
    deleteSound.play();

    const newTodos = [...todos];
    newTodos[index].timer = 0;
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setBell(false);
  };

  //Define Timer Constants
  let timerValue;
  let delay;
  let alarmTime;

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

  const setTime = (e) => {
    const inputTime = e.target.value.split(":");
    const inputHours = parseInt(inputTime[0], 10) * 3600;
    const inputMinutes = parseInt(inputTime[1], 10) * 60;
    delay = (inputHours + inputMinutes);
    alarmTime = inputTime;
  };

  const setAlarm = (index) => {
    //Time till alarm needs to go off
    const now = new Date();
    const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    timerValue = ((currentTime - delay) * -1) * 1000;

    //Set timer state for todo
    if (timerValue > 0) {
      const newTodos = [...todos];
      newTodos[index].timer = timerValue;
      setTodos(newTodos);
      setError('');
      setBell(!bell);

      const todoLine = document.querySelectorAll('.todo');
      todoLine[index].style.color = 'rgba(0, 75, 75, .7)';

      todoLine[index].prepend('*');

    } else {
      setError('Please enter a valid time');
      return;
    };

    //Close window
    const timerWindow = document.querySelectorAll('.timer-input');

    timerWindow[index].style.opacity = '0';
    timerWindow[index].style.pointerEvents = 'none';

    console.log(timerValue);

    setTimeout(() => {
      ringAlarm(index);
    }, timerValue);
  };

  //Ring Alarm function
  const ringAlarm = (index) => {
    if (todos[index].deleted === false) {
      const now = new Date();
      timerSound.play();

      setTimeout(() => {
        let minutes = now.getMinutes();
        if (minutes < 10) {
          minutes = '0' + minutes.toString();
        };
        alert('Time is up! Did you complete ' + todos[index].text + ' by ' + now.getHours() + ':' + minutes + '?');

        const todoLine = document.querySelectorAll('.todo');
        const bellIcon = document.querySelectorAll('.timer-button');
        const expiredBellIcon = document.querySelectorAll('.timer-button-2');
        const deleteButton = document.querySelectorAll('.delete-button');
        const expiredDeleteButton = document.querySelectorAll('.delete-button-2');

        todoLine[index].style.color = 'rgba(255, 0, 0, 0.8)';

        bellIcon[index].classList.remove('active');
        expiredBellIcon[index].classList.add('active');
        deleteButton[index].style.display = 'none';
        expiredDeleteButton[index].style.display = 'inline';
      }, 1000);
    } else return;
  };

  useEffect(() => {
    console.log('something deleted!')
  }, [todos.deleted]);

  return (
    <div className="App">
      <div className="overlay"></div>
      <div className="container">
        <h1 className="title">
          React Task Planner
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
        <p className="extra-text">
          * On every change of the timer for your item an additional asterix symbol <span style={{ color: 'rgba(150, 150, 225, 1)' }}>(*)</span> will appear on your task to keep track of 'postponing'.
        <br></br><br></br>
          * Once the alarm rang for your task,
          there is no possibility to delete or amend the item. In this way you will be able to see what you achieved throughout, and by the end of the day.
      </p>
      </div>
    </div>
  );
};

export default App;
