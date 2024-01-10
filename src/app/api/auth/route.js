import { NextRequest, NextResponse } from "next/server";

import { createData, getData } from "./handlers";
export async function GET() {
  const data = await getData();

  let json_response = {
    data: data,
    status: "success",
  };
  return NextResponse.json(json_response);
}

export async function POST(request) {
  const { userId, query, userEmail, role } = await request.json();

  const newData = {
    userId: String(userId),
    userEmail: String(userEmail),
    query: Number(query),
    role: String(role)
  };

  await createData(newData);
  let json_response = {
    status: "success",
  };
  return NextResponse.json(json_response);
}
