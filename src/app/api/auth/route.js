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
  const { email, password, firstName, lastName } = await request.json();

  const newData = {
    email: String(email),
    password: String(password),
    firstName: String(firstName),
    lastName: String(lastName),
  };

  await createData(newData);
  let json_response = {
    status: "success",
  };
  return NextResponse.json(json_response);
}
