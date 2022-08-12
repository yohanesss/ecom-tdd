import React from "react";
import { Link } from "react-router-dom";

type LayoutContainerProps = {
  children: React.ReactNode;
};

export const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/category">Category</Link>
          </li>
          <input name="searchbar" placeholder="search by name" />
          <Link to="/login">Login / Register</Link>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};
