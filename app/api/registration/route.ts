import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    // Get authenticated Clerk user ID
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse additional user data if needed
    const body = await req.json();
    const { email, firstName, lastName } = body;

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId: userId });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }

    // Create new user
    const newUser = await User.create({
      clerkId: userId,
      email,
      firstName,
      lastName,
    });

    return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
