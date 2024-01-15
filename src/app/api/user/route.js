import { NextResponse } from "next/server";

import { getClientData, createClientData, deleteClientData } from "./handler";
export async function GET() {
  const data = await getClientData();

  let json_response = {
    data: data,
    status: true,
  };

  return NextResponse.json(json_response);
}

export async function POST(request) {
  const { userEmail, amount, status } = await request.json();

  const newData = {
    userEmail,
    amount,
    status,
  };

  await createClientData(newData);
  let json_response = {
    status: true,
  };
  return NextResponse.json(json_response);
}

export async function DELETE(req) {
  const {id} = await req.json();

  await deleteClientData(id);

  let json_response = {
    status: true,
  };

  return NextResponse.json(json_response);
}
