import { NextRequest, NextResponse } from "next/server";
import Prompt from "@/models/promptModel";
import dbConnect from "@/lib/dbconnect";

export async function GET() {
  try {
    await dbConnect();

    const response = await Prompt.find({});

    return NextResponse.json(response);
  } catch (error) {
    console.error("Errors: ", error);

    return NextResponse.json(error);
  }
}

export async function POST(request: NextRequest) {
  const { id, userEmail, title, content, isUser } = await request.json();

  const newData = {
    id,
    userEmail,
    title,
    content,
    isUser,
  };

  try {
    await dbConnect();

    const data = new Prompt(newData);

    let result;

    if (await Prompt.findOne({ id: newData.id })) {
      result = await Prompt.updateOne(
        { id: newData.id },
        {
          $set: {
            title: newData.title,
            content: newData.content,
          },
        }
      );
    } else {
      result = await data.save();
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Errors: ", error);

    return NextResponse.json(error);
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  try {
    await dbConnect();

    const checkable = await Prompt.findOne({ id });

    if (checkable) {
      const response = await Prompt.deleteOne({ id });

      console.log("Deleted: ", response.deletedCount);
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("Errors: ", error);

    return NextResponse.json(error);
  }
}
