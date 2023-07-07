import React, { useState } from "react";

interface LoginForm {
  username: string;
  password: string;
}

interface LoginFormProps {
  onFormSwitch: () => void;
  onSubmit: (formData: LoginForm) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onFormSwitch, onSubmit }) => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(loginForm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={loginForm.username}
          onChange={handleChange}
          required
          className="border-2 border-gray-500"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginForm.password}
          onChange={handleChange}
          required
          className="border-2 border-gray-500"
        />
      </div>
      <button type="submit">Login</button>
      <button type="button" onClick={onFormSwitch}>
        Switch to Register
      </button>
    </form>
  );
};

export default LoginForm;
