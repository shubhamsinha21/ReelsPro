// In backend, we have 2 things - request and response from Next Js
// This are next js server options
import { NextRequest, NextResponse } from "next/server";

// we need user for knowing abt model
import User from "@/models/User";
import { error } from "console";
import { connectToDatabase } from "@/lib/db";

// function to handle post request, name should be POST
// we already have the path
// we also defined the method

// here we have request of type  NextRequest
export async function POST(request: NextRequest) {
  // try catch to get data from another continent 😅
  try {
    // first take email and pwd
    // always use await in next js
    // destructure
    const { email, password } = await request.json();

    if (!email || !password) {
      // give response
      // send 2 objects
      return NextResponse.json(
        { error: "Email and password are required !" },
        { status: 400 }
      );
    }

    // sinice values not came, we've to ask user already registered or not
    //  connecct to database

    // if it gets run -> we will have database connection
    await connectToDatabase();

    // check user
    const existingUser = await User.findOne({ email }); //finding by email

    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 400 } // means error
      );
    }

    // if not registered
    await User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "User regitered succesfully !" },
      { status: 201 } // means success
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user !" },
      { status: 500 } // means failed
    );
  }
}
