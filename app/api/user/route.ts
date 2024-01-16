import { clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await clerkClient.users.getUserList();

        return NextResponse.json(response);
    } catch (error) {
        console.error("Errors: ", error);
        
        return NextResponse.json(error);
    }
}

// export async function POST(params:type) {
    
// }

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    
    try {
        const response = await clerkClient.users.deleteUser(id);

        return NextResponse.json(response);
    } catch (error) {
        console.error("Errors: ", error);
        
        return NextResponse.json(error);
    }
}