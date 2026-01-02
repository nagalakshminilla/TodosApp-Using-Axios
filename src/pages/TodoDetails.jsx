import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTodoById } from '../api/todoService';

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const data = await getTodoById(id);
        setTodo(data);
      } catch (err) {
        setError('Failed to fetch todo details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTodo();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading todo details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!todo) {
    return <div className="not-found">Todo not found</div>;
  }

  return (
    <div className="todo-details-container">
      <Link to="/" className="back-link">← Back to List</Link>
      
      <div className="todo-details-card">
        <h1>Todo Details</h1>
        
        <div className="detail-item">
          <span className="detail-label">ID:</span>
          <span className="detail-value">{todo.id}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Title:</span>
          <span className="detail-value">{todo.title}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">Status:</span>
          <span className={`status-badge ${todo.completed ? 'completed' : 'pending'}`}>
            {todo.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-label">User ID:</span>
          <span className="detail-value">{todo.userId}</span>
        </div>
      </div>
    </div>
  );
};

export default TodoDetails;