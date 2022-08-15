import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useStorage";

export const LoginRegisterContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postForm = await fetch("http://localhost:3001/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (postForm.ok) {
      setFormError(null);
      setUser(await postForm.json());
    } else {
      setFormError(await postForm.json());
    }
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
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {renderLoginNav}
    </div>
  );
};
