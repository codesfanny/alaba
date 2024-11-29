import customInstance from "../src/axiosInstance";

const AuthenticationAPI = () => {
  const login = async (values) => {
    const response = await customInstance.post("/login", values);
    return response;
  };
  return {
    login,
  };
};

export default AuthenticationAPI;
