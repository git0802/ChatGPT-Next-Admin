import { clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";
import dbConnect from "@/lib/dbconnect";

export async function GET() {
  try {
    await dbConnect();

    const userData = await User.find({});

    const response = await clerkClient.users.getUserList();

    const data = {
      response,
      userData,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Errors: ", error);

    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { userId, firstName, lastName, amount, statusOne } = data;

  const params = {
    firstName,
    lastName,
  };

  const newData = {
    userId,
    amount,
    statusOne,
  };

  try {
    await dbConnect();

    const checkAvailable = await User.findOne({ userId });

    if (checkAvailable) {
      const response = await User.updateOne(
        { userId: newData.userId },
        { $set: { amount: newData.amount, status: newData.statusOne } }
      );

      console.log(response.matchedCount + " document(s) matched");
      console.log(response.modifiedCount + " document(s) updated");
    }

    const response = await clerkClient.users.updateUser(userId, params);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Errors: ", error);

    return NextResponse.json(error);
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  try {
    await dbConnect();

    const checkAvailable = await User.findOne({ userId: id });

    if (checkAvailable) {
      const response = await User.deleteOne({ userId: id });

      console.log("Deleted:", response.deletedCount);
    }

    const response = await clerkClient.users.deleteUser(id);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Errors: ", error);

    return NextResponse.json(error);
  }
}
