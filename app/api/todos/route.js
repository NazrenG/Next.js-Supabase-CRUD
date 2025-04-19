import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const supabase = await createClient();
  const body = await request.json();
  const { title ,description} = body;
  if (!title || !description) {
    return new Response(
      JSON.stringify({ error: "Title and description are required" }),
      { status: 400 }
    );
  }
  const { data, error } = await supabase
    .from("todos")
    .insert({ title, description })
    .single();
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
