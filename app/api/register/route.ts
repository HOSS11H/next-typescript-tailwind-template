import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const {
        email,
        name,
        password,
    } = body;

    const userAlreadyExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (userAlreadyExist) {
        return new NextResponse('User Already Registered !!', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword,
        }
    });

    return NextResponse.json(user);
}