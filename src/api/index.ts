import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || "https://frontend-take-home-service.fetch.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export const del = async (path: string) => {
  try {
    const response = await api.delete(path);
    return response;
  } catch (error: unknown) {
    dispatchError(error);
    throw error;
  }
};

export const get = async (path: string) => {
  try {
    const response = await api.get(path);
    return response;
  } catch (error: unknown) {
    dispatchError(error);
    throw error;
  }
};

export const post = async (path: string, body: any) => {
  try {
    const response = await api.post(path, body);
    return response;
  } catch (error: unknown) {
    dispatchError(error);
    throw error;
  }
};

export const put = async (path: string, obj: object) => {
  try {
    const response = await api.put(path, obj);
    return response;
  } catch (error: unknown) {
    dispatchError(error);
    throw error;
  }
};

export const dispatchError = (err: any) => {
    alert(err.toString())
};