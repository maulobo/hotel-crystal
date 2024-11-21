import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={`md:py-8 md:px-20 p-8 min-h-screen  ${className}`}>
      {children}
    </div>
  );
}
