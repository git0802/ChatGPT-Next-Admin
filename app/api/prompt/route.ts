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

        if (await Prompt.findOne({ id: data.id })) {
            result = await Prompt.updateOne(
                { id: data.id },
                { $set: { userEmail: data.userEmail, title: data.title, content: data.content, isUser: data.isUser }},
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