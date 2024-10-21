import api from './api';

// Fetch all tasks
export const fetchTasks = async () => {
    const response = await api.get('/api/tasks');
    return response.data;
};

// Add a new task
export const addTask = async (taskData) => {
    const response = await api.post('/api/tasks', taskData);
    return response.data;
};

// Update a task
export const updateTask = async (task) => {
    const response = await api.put(`/api/tasks/${task._id}`, task);
    return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
    await api.delete(`/api/tasks/${taskId}`);
    return taskId;
};
