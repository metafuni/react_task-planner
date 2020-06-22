import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {    
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!value) return;
      addTodo(value);
      setValue('');
    };

    return (
      <div className="todo">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="add task..."
            onChange={e => setValue(e.target.value)}
            value={value}
          ></input>
          <div className="max-items"><i className="fa fa-exclamation"></i>max 15 items</div>
        </form>
      </div>
    );
  };

  export default TodoForm;