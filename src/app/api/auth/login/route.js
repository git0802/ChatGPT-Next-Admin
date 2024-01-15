import { NextResponse } from "next/server";

import { sign } from 'jsonwebtoken';

import dbConnect from "src/utils/dbconnect";
import User from "src/models/userModel";

export async function POST(request) {

  const JWT_SECRET = 'minimal-secret-key';
  
  const JWT_EXPIRES_IN = '3 days';

  await dbConnect();
  
  const inputData = await request.json();

  const { email, password } = inputData;

  const user = await User.findOne({email: email});

  if (!user) {
    return NextResponse.json({
      message: 'There is no user corresponding to the email address.',
    });
  }

  if (user.password !== password) {
    return NextResponse.json({
      message: 'Wrong password',
    });
  }

  const accessToken = sign({ userId: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return NextResponse.json({
    accessToken,
    user,
  });
}