import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {    

    const [value, setValue] = useState();

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
        </form>
      </div>
    );
  };

  export default TodoForm;