import { NextRequest, NextResponse } from "next/server";

import User from "src/models/userModel";
import dbConnect from "src/utils/dbconnect";

async function getData() {
    // Fetch all data from the collection
    await dbConnect();
    const result = await User.find({});

    return result;
}

async function createData(newData) {
    // Create a new instance of the Data model and save it to the database
    await dbConnect();
    const data = new User(newData);
    if (await User.findOne({ userId: data.userId })) {
    } else {
        await data.save();
    }

    return data;
}

async function updateData(newData) {
    await dbConnect();
    const data = new User(newData);
    await User.updateOne(
        { userId: data.userId },
        { $set: { query: data.query } },
    );
}

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
