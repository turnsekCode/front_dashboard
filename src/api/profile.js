/* eslint-disable */
import axios from './axios';

export const getProfileRequest = () => axios.get('/profile');

export const createProfileRequest = async (profile) => {
  const form = new FormData();

  for (let key in profile) {
    form.append(key, profile[key]);
  }

  return await axios.post('/profile', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteProfileRequest = async (id) => await axios.delete('/profile/' + id);

export const updateProfileRequest = async (id, newProfileFields) => {
  const form = new FormData();
  for (let key in newProfileFields) {
    form.append(key, newProfileFields[key]);
  }
  return axios.put('/profile/' + id, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

//export const updatePostRequest = async (id, newFields) =>
//  await axios.put("/posts/" + id, newFields);
