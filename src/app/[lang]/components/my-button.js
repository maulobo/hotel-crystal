"use client";
import React from "react";

export default function MyButton({ children }) {
  return <button onClick={() => console.log("click")}>{children}</button>;
}
