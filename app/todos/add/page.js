"use client";

import React from "react";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function AddTodo() {
  const handleAddTodo = async (formData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) {
      console.log("Error adding todo");
      return;
    }
  };
  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto justify-center w-full h-screen  ">
      <h1 className="text-2xl font-medium">Create Todo</h1>

      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8 ">
        <Label htmlFor="title">Title</Label>
        <Input name="title" placeholder="enter todo title" required />
        <Label htmlFor="description">Description</Label>
        <Input
          name="description"
          placeholder="enter todo description"
          minLength={6}
          required
        />
        <SubmitButton formAction={handleAddTodo} pendingText="Adding...">
          Add Todo
        </SubmitButton>
      </div>
    </form>
  );
}
