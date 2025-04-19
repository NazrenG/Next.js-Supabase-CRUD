"use client";

import React, { useEffect, useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditTodo({ params }) {
  const [todo, setTodo] = useState(null);

  const fetchTodo = async () => {
    const res = await fetch(`http://localhost:3000/api/todos/${params.id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!res.ok) {
      console.log("Error fetching todo");
      return;
    }
    const data = await res.json();
    setTodo(data);
  };

  async function handleEditTodo(formData) {
    const title = formData.get("title");
    const description = formData.get("description");

    const res = await fetch(`http://localhost:3000/api/todos/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!res.ok) {
      console.log("Error editing todo");
      return;
    }

    console.log("Todo updated successfully!");
  }

  useEffect(() => {
    fetchTodo();
  }, [params.id]);

  if (!todo) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto justify-center w-full h-screen p-4">
      <h1 className="text-2xl font-medium text-black mb-4">Update Todo</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="title" className="text-black">
          Title
        </Label>
        <Input
          defaultValue={todo.title}
          name="title"
          placeholder="enter todo title"
          required
        />
        <Label htmlFor="description" className="text-black">
          Description
        </Label>
        <Input
          defaultValue={todo.description}
          name="description"
          placeholder="enter todo description"
          required
        />
        <SubmitButton formAction={handleEditTodo} pendingText="Editing...">
          Edit Todo
        </SubmitButton>
      </div>
    </form>
  );
}
