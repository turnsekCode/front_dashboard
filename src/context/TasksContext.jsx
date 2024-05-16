/* eslint-disable */
import { createContext, useContext, useState } from 'react';
import {
  createTaskRequest,
  getTasksRequest,
  getDeleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
  //getTaskRequestSlug,
} from '../api/tasks';
import { toast, Toaster } from 'sonner';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState('');
  //console.log(error);
  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      //toast.error(error.response.data.message);
      toast.error(error.response.data.message, {
        style: {
          background: '#FFF0F1',
          color: '#560108',
        },
      });
    }
  };
  const deleteTask = async (id) => {
    try {
      setLoadingId(id);
      const res = await getDeleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      //console.log(res);
      setLoadingId(null);
      toast.error(error.response.data.message, {
        style: {
          background: '#FFF0F1',
          color: '#560108',
        },
      });
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // const getTaskSlug = async (slug) => {
  //   //console.log('slug', slug);
  //   try {
  //     const res = await getTaskRequestSlug(slug);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      //console.log(error);
      toast.error(error.response.data.message, {
        style: {
          background: '#FFF0F1',
          color: '#560108',
        },
      });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
        //getTaskSlug,
        loadingId,
        error,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
