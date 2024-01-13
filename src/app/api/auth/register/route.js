import { NextResponse } from "next/server";

import {sign} from 'jsonwebtoken';

import dbConnect from "src/utils/dbconnect";
import User from "src/models/userModel";

export async function POST(request) {

  const JWT_SECRET = 'minimal-secret-key';
  
  const JWT_EXPIRES_IN = '3 days';

  const inputData = await request.json();

  const { email, password, firstName, lastName } = inputData;

  await dbConnect();

  const existUser = await User.findOne({ email: email });

  const user = {
    email, // Property shorthand used here
    password, // Property shorthand used here
    firstName, // Property shorthand used here
    lastName, // Property shorthand used here
  };

  const userData = new User(user);

  if (existUser) {
    return NextResponse.json({
      message: 'There already exists an account with the given email address.',
    });
  } else {
    await userData.save();
  }

  const accessToken = sign({ userId: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return NextResponse.json({
    accessToken,
    user,
  });
}
