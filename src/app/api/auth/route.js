import { NextResponse } from "next/server";

import { getData, createData } from "./handlers";

export async function GET() {
  const data = await getData();

  const json_response = {
    data,
    status: "success",
  };
  return NextResponse.json(json_response);
}

export async function POST(request) {
  const inputData = await request.json();

  const { email, password, firstName, lastName } = inputData;

  // const newData = {
  //   email: String(email),
  //   password: String(password),
  //   firstName: String(firstName),
  //   lastName: String(lastName),
  // };

  const newData = {
    email, // Property shorthand used here
    password, // Property shorthand used here
    firstName, // Property shorthand used here
    lastName, // Property shorthand used here
  };

  await createData(newData);
  const json_response = {
    status: "success",
  };
  return NextResponse.json(json_response);
}
