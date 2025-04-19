import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Email Inválido!"),
  password: z.string().min(6, "Senha muito curta!"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = LoginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const correctPassword = await compare(password, user.password);

    if (!correctPassword) {
      return NextResponse.json({ error: "Senha Incorreta!" }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
