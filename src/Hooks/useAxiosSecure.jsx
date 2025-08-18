import axios from "axios";
import { useContext, useMemo } from "react";
import { AuthContext } from "../Contexts/Authprovider.jsx";

const useAxiosSecure = () => {
  const { saveUser, logOut } = useContext(AuthContext);

  // Memoize axios instance so interceptors are added only once
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://lost-server.onrender.com",
      // withCredentials: true,
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        const token = saveUser?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    instance.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          logOut()
            .then(() => {
              console.log(
                `You are logged out because of an error with ${status} code.`
              );
            })
            .catch((err) => console.log(err));
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, [saveUser, logOut]);

  return axiosInstance;
};

export default useAxiosSecure;
