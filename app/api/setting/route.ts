import { NextRequest, NextResponse } from "next/server";

import Setting from "@/models/settingModel";
import dbConnect from "@/lib/dbconnect";

export async function GET() {
  try {
    await dbConnect();

    const settingData = await Setting.find({});

    return NextResponse.json(settingData);
  } catch (error) {
    console.error("Error: ", error);

    return NextResponse.json(error);
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { id, apikey, limit } = data;

  try {
    await dbConnect();

    const checkable = await Setting.findOne({ id });

    if (checkable) {
      const response = await Setting.updateOne(
        { id },
        { $set: { apikey, limit } }
      );

      console.log(response.matchedCount + " document(s) matched");
      console.log(response.modifiedCount + " document(s) updated");

      return NextResponse.json(response);
    } else {
      const newdata = new Setting(data);

      const response = await newdata.save();

      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("Errors: ", error);

    return NextResponse.json(error);
  }
}
