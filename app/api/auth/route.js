import { NextResponse } from "next/server";

const USERNAME = "admin";
const PASSWORD = "Formatpilot.com"; // You can change this

export async function POST(request) {
  const { username, password } = await request.json();

  if (username === USERNAME && password === PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth", "true", { httpOnly: true, path: "/" });
    return response;
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
