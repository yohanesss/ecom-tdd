import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { useLocalStorage } from "../../hooks/useStorage";

const INITIAL_FORM = { email: "", password: "" };

export const LoginRegisterContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formError, setFormError] = useState<null | string>(null);

  const [user, setUser] = useLocalStorage("user", null);

  const renderLoginNav = isLogin ? (
    <p>
      Not have account? Click{" "}
      <button name="register-link" onClick={() => setIsLogin(false)}>
        Here
      </button>{" "}
      to register!
    </p>
  ) : (
    <p>
      Already have account? Click{" "}
      <button name="login-link" onClick={() => setIsLogin(true)}>
        Here
      </button>{" "}
      to SignIn!
    </p>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePeekPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((showPassword) => !showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postForm = await fetch(
      `http://localhost:3001/${isLogin ? "login" : "register"}`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (postForm.ok) {
      setFormError(null);

      if (isLogin) {
        setUser(await postForm.json());
        <Navigate to="/" />;
      } else {
        setFormData(INITIAL_FORM);
        setIsLogin(true);
        toast("You have successfully register, please login");
      }
    } else {
      setFormError(await postForm.json());
    }
  };

  const renderForm = (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type={"text"}
          placeholder="email"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="password"
          onChange={handleChange}
        />
        <button name="toggle-password-visibility" onClick={handlePeekPassword}>
          Peek Password
        </button>
      </div>
      <button type={"submit"}>Submit</button>
    </form>
  );

  return (
    <>
      <div>
        <h1>{isLogin ? "Login" : "Register"}</h1>
        {renderForm}
        {formError && <p style={{ color: "red" }}>{formError}</p>}
        {renderLoginNav}
      </div>
      <Toaster />
    </>
  );
};
