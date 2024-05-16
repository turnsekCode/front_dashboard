/* eslint-disable */
import axios from './axios';

export const getTasksRequest = () => axios.get('/projects/');

export const getTaskRequest = (id) => axios.get(`/projects/${id}`);

//export const getTaskRequestSlug = (slug) => axios.get(`/project/${slug}`);

//export const createTaskRequest = (task) => axios.post("/tasks", task);
export const createTaskRequest = async (task) => {
  return await axios.post('/projects', task, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateTaskRequest = async (id, task) => {
  return await axios.put('/projects/' + id, task, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getDeleteTaskRequest = (id) => axios.delete(`/projects/${id}`);
