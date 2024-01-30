import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/lib/dbconnect";
import Usage from "@/models/usageModel";

export async function GET() {
  try {
    await dbConnect();

    const response = await Usage.find({});

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  const { date, model } = await request.json();

  try {
    await dbConnect();

    const response = await Usage.findOne({ createdAt: date });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json(error);
  }
}
