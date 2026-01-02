import axiosInstance from './axiosInstance';

export const getTodos = async () => {
  try {
    const response = await axiosInstance.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const getTodoById = async (id) => {
  try {
    const response = await axiosInstance.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with id ${id}:`, error);
    throw error;
  }
};