import { verify } from 'jsonwebtoken';

import { NextResponse } from "next/server";
import User from 'src/models/userModel';
import dbConnect from 'src/utils/dbconnect';

// ----------------------------------------------------------------------

export async function GET(request) {
    const JWT_SECRET = 'minimal-secret-key';

    const { authorization } = request.headers;

    await dbConnect();

    if (!authorization) {
        return NextResponse.json({
          message: 'Authorization token missing',
        });
    }

    const accessToken = `${authorization}`.split(' ')[1];

    const data = verify(accessToken, JWT_SECRET);

    const userEmail = typeof data === 'object' ? data?.userEmail : '';

    const user = await User.findOne({ userEmail: userEmail });

    if (!user) {
        return NextResponse.json({
          message: 'Invalid authorization token',
        });
    }

    return NextResponse.json({ user });
}
