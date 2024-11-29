import customInstance from "../src/axiosInstance";

const AuthenticationAPI = () => {
  const login = async (values) => {
    const response = await customInstance.post("/api/v1/auth/login", values);
    return response;
  };
  return {
    login,
  };
};

export default AuthenticationAPI;
