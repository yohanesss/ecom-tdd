import React from "react";

type LayoutContainerProps = {
  children: React.ReactNode;
};

export const LayoutContainer = ({ children }: LayoutContainerProps) => {
  return (
    <div>
      <nav>
        <ul>
          <li>Category</li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};
