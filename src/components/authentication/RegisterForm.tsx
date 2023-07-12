import React, { useState } from "react";

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onFormSwitch: () => void;
  onSubmit: (formData: RegisterForm) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onFormSwitch,
  onSubmit,
}) => {
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    fullName: "",
    email: "",
    password: "",
  });

  const handleRegisterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(registerForm);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  return (
    <form onSubmit={handleRegisterSubmit}>
      <div className="flex flex-col">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={registerForm.fullName}
          onChange={handleChange}
          required
          className="border-2 border-gray-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={registerForm.email}
          onChange={handleChange}
          required
          className="border-2 border-gray-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={registerForm.password}
          onChange={handleChange}
          required
          className="border-2 border-gray-500"
        />
      </div>
      <button type="submit">Register</button>
      <button type="button" onClick={onFormSwitch} className="m-4">
        Switch to Login
      </button>
    </form>
  );
};

export default RegisterForm;
