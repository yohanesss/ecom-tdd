import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";

type LayoutContainerProps = {
  children: React.ReactNode;
};

export const LayoutContainer = ({ children }: LayoutContainerProps) => {
  const [user, setUser] = useContext(AuthContext);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/category">Category</Link>
          </li>
          <input name="searchbar" placeholder="search by name" />
          {user ? (
            `Welcome, ${user.user.email}`
          ) : (
            <Link to="/login">Login / Register</Link>
          )}
          {user && <button onClick={() => setUser(undefined)}>Logout</button>}
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};
