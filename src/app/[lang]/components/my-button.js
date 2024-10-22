"use client";
import React from "react";

export default function MyButton({ name }) {
  return <button onClick={() => console.log("click")}>{name}</button>;
}
