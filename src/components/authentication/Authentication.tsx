import { FormEvent, useRef, useState } from "react";
import { userRegistrationAndLogin } from "../../utils";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../../interface";

export const Authentication = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [isLostPasswordForm, setIsLostPasswordForm] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data: UserForm = {
        emailorusername: formData.get("email-or-username"),
        email: formData.get("email"),
        lostemail: formData.get("lost-email"),
        password: formData.get("password"),
        fullname: formData.get("full-name"),
      };
      const result: string | number = await userRegistrationAndLogin(data);
      if (typeof result === "string") {
        localStorage.setItem("jwt", result);
        window.location.reload();
      } else if (result === 409) {
        console.log("Email Alread Exists");
      } else if (result === 404) {
        console.log("User does not exists");
      }
    }
  };

  const handleFormSwitch = () => {
    setIsRegisterForm(!isRegisterForm);
  };

  const handleLostPassword = () => {
    setIsLostPasswordForm(!isLostPasswordForm);
  };

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 scale-125">
        <form className="space-y-6" ref={formRef} onSubmit={handleSubmit}>
          {isRegisterForm ? (
            <>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Create an account
              </h5>
              <div>
                <label
                  htmlFor="full-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleFormSwitch}
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Login here
                </button>
              </div>
            </>
          ) : isLostPasswordForm ? (
            <div>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Lost Password
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                Please enter your email or username to receive a link to reset
                your password.
              </p>
              <div>
                <label
                  htmlFor="lost-email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email or Username
                </label>
                <input
                  type="text"
                  name="lost-email"
                  id="lost-email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Email or Username"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
              >
                Submit
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                The link to reset your password will be sent to your email.
              </p>
              <button
                type="button"
                onClick={handleLostPassword}
                className="text-blue-700 hover:underline dark:text-blue-500 mt-2"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign in to xplat
              </h5>
              <div>
                <label
                  htmlFor="email-or-username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email or Username
                </label>
                <input
                  type="text"
                  name="email-or-username"
                  id="email-or-username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Email or Username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  onClick={handleLostPassword}
                  className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <button
                  type="button"
                  onClick={handleFormSwitch}
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
