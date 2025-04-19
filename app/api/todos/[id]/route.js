import { createClient } from "@/utils/supabase/server";

export async function GET(request, { params }) {
  const supabase = await createClient();
  const { id } = await params;
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request, { params }) {
  const supabase = await createClient();
  const { id } = await params;
  const body = await request.json();
  const { title, description } = body
  if (!title || !description) {
    return new Response(
      JSON.stringify({ error: "Title and description are required" }),
      { status: 400 }
    );
  }
  const { data, error } = await supabase
    .from("todos")
    .update({ title, description })
    .eq("id", id)
    .single();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
export async function DELETE(request, { params }) {
  const supabase = await createClient();
  const { id } = await params;
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .single();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
