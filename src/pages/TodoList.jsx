import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTodos } from '../api/todoService';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        setError('Failed to fetch todos. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="todos-grid">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-card">
            <div className="todo-status">
              <span className={`status-indicator ${todo.completed ? 'completed' : 'pending'}`}>
                {todo.completed ? '✓' : '○'}
              </span>
              <span className="status-text">
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
            <h3 className="todo-title">{todo.title}</h3>
            <Link to={`/todo/${todo.id}`} className="view-details-link">
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;