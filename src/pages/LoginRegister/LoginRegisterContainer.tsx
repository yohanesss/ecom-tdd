import React, { useState } from "react";

export const LoginRegisterContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postForm = await fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const response = await postForm.json();
    console.log(response);
  };

  const renderForm = (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="email">Email</label>
      <input
        name="email"
        type={"text"}
        placeholder="email"
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type={"password"}
        placeholder="password"
        onChange={handleChange}
      />
      <button type={"submit"}>Submit</button>
    </form>
  );

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {renderForm}
      {renderLoginNav}
    </div>
  );
};
