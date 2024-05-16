/* eslint-disable */
import { useState, useContext, createContext } from 'react';
import {
  getProfileRequest,
  createProfileRequest,
  deleteProfileRequest,
  updateProfileRequest,
} from '../api/profile';

const profileContext = createContext();

export const useProfile = () => {
  const context = useContext(profileContext);
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    const res = await getProfileRequest();
    setProfile(res.data);
    console.log(res);
  };

  const createProfile = async (profile) => {
    try {
      const res = await createProfileRequest(profile);
      setProfile([...profile, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = async (id) => {
    const res = await deleteProfileRequest(id);
    if (res.status === 204) {
      setProfile(profile.filter((profile) => profile._id !== id));
    }
  };

  const updateProfile = async (id, profile) => {
    try {
      const res = await updateProfileRequest(id, profile);
      setProfile(profile.map((profile) => (profile._id === id ? res.data : profile)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <profileContext.Provider
      value={{
        profile,
        getProfile,
        createProfile,
        deleteProfile,
        updateProfile,
      }}
    >
      {children}
    </profileContext.Provider>
  );
};
