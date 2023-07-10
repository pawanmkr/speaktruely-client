import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

enum FormType {
  Login,
  Register,
}

type FormData = {
  fullName?: string;
  email?: string;
  username?: string;
  password: string;
};

interface User {
  email: string;
  fullName: string;
  token: string;
  username: string;
}

const AuthenticationForm: React.FC = () => {
  // state Variable to keep track of which form the user is filling
  const [formType, setFormType] = useState(FormType.Register);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>();

  const handleFormSwitch = () => {
    setFormType(
      formType === FormType.Login ? FormType.Register : FormType.Login
    );
  };

  /*
   * Login and Register function
   */
  const handleSubmit = async (formData: FormData) => {
    if (!formData.fullName && !formData.email) {
      // Login
      await axios
        .post(`${import.meta.env.VITE_API_V1_URL as string}/user/login`, {
          username: formData.username,
          password: formData.password,
        })
        .then((res: AxiosResponse<User, any>) => {
          setUser(res.data);
        })
        .catch((err: AxiosError) => {
          if (err.response && err.response.status === 404) {
            console.log("User does not exists");
          }
        });
    } else {
      // Register
      if (formData.fullName && formData.email && formData.password) {
        await axios
          .post(`${import.meta.env.VITE_API_V1_URL as string}/user/register`, {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          })
          .then((res: AxiosResponse<User, any>) => {
            setUser(res.data);
          })
          .catch((err: AxiosError) => {
            if (err.response && err.response.status === 409) {
              console.log("Email Already Exists");
            }
          });
      }
    }
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("jwt", user.token);
      navigate("/home", { state: { user } });
    }
  }, [user, navigate]);

  return (
    <div>
      <h2>{formType === FormType.Login ? "Log in" : "Register"}</h2>
      {formType === FormType.Login ? (
        <LoginForm onFormSwitch={handleFormSwitch} onSubmit={handleSubmit} />
      ) : (
        <RegisterForm onFormSwitch={handleFormSwitch} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default AuthenticationForm;
