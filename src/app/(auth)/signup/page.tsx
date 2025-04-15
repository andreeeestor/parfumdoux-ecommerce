"use client";
import Image from "next/image";
import signUpImg from "../../../../public/images/signup.png";
import { z } from "zod";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function SignUpPage() {
  const SignUpSchema = z
    .object({
      name: z.string().min(1, { message: "Nome Obrigatório!" }),
      email: z.string().email({ message: "Email inválido!" }),
      password: z
        .string()
        .min(6, { message: "A senha deve ter pelo menos 6 caracteres!" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "Senhas não se coincidem",
      path: ["confirmPassword"],
    });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  type SignUpSchema = z.infer<typeof SignUpSchema>;

  const onSubmit = () => {};

  if (errors.email) {
    toast.error(errors.email.message);
  }
  if (errors.name) {
    toast.error(errors.name.message);
  }
  if (errors.password) {
    toast.error(errors.password?.message);
  }
  if (errors.confirmPassword) {
    toast.error(errors.confirmPassword?.message);
  }

  return (
    <main className="flex min-h-screen">
      <div className="w-1/2 relative shadow-2xl m-6 rounded-2xl">
        <Image
          src={signUpImg}
          fill
          className="object-cover rounded-2xl"
          alt="signup img"
        />
      </div>
      <div className="w-1/2 border border-l-slate-700 border-y-0 border-r-0 shadow-2xl rounded-l-4xl flex flex-col items-center justify-center">
        <div className="max-w-md w-full text-white space-y-5 mb-5">
          <div className="bg-gradient-to-tr from-orange-600 to-orange-500 p-3 rounded-2xl size-24">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <g clipPath="url(#clip0_231_648)">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M100 33.6449C92.7738 33.6449 86.9159 39.5028 86.9159 46.729H53.271C53.271 20.9213 74.1923 0 100 0C125.808 0 146.729 20.9213 146.729 46.729C146.729 72.5367 125.808 93.4579 100 93.4579V59.8131C107.226 59.8131 113.084 53.9551 113.084 46.729C113.084 39.5028 107.226 33.6449 100 33.6449ZM166.355 100C166.355 92.7738 160.497 86.9159 153.271 86.9159L153.271 53.271C179.079 53.271 200 74.1923 200 100C200 125.808 179.079 146.729 153.271 146.729C127.463 146.729 106.542 125.808 106.542 100H140.187C140.187 107.226 146.045 113.084 153.271 113.084C160.497 113.084 166.355 107.226 166.355 100ZM46.729 113.084C39.5028 113.084 33.6449 107.226 33.6449 100C33.6449 92.7738 39.5028 86.9159 46.729 86.9159C53.9551 86.9159 59.8131 92.7738 59.8131 100H93.4579C93.4579 74.1923 72.5367 53.271 46.729 53.271C20.9213 53.271 0 74.1923 0 100C0 125.808 20.9213 146.729 46.729 146.729V113.084ZM100 166.355C107.226 166.355 113.084 160.497 113.084 153.271H146.729C146.729 179.079 125.808 200 100 200C74.1923 200 53.271 179.079 53.271 153.271C53.271 127.463 74.1923 106.542 100 106.542L100 140.187C92.7738 140.187 86.9159 146.045 86.9159 153.271C86.9159 160.497 92.7738 166.355 100 166.355Z"
                  fill="url(#paint0_linear_231_648)"
                />{" "}
              </g>{" "}
              <defs>
                {" "}
                <linearGradient
                  id="paint0_linear_231_648"
                  x1="100"
                  y1="0"
                  x2="100"
                  y2="200"
                  gradientUnits="userSpaceOnUse"
                >
                  {" "}
                  <stop stopColor="#011627" />{" "}
                  <stop offset="1" stopColor="#011627" />{" "}
                </linearGradient>{" "}
                <clipPath id="clip0_231_648">
                  {" "}
                  <rect width="200" height="200" fill="white" />{" "}
                </clipPath>{" "}
              </defs>{" "}
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-3xl">Cadastre-se</h1>
            <h4 className="text-gray-300">
              Bem-Vindo ao Parfum Doux | Vamos criar sua conta
            </h4>
          </div>
          <hr className="border border-white/60 w-full" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md w-full space-y-6"
        >
          <div className="">
            <Label className="mb-2 text-white">Nome:</Label>
            <Input className="bg-white" {...register("name")}></Input>
          </div>
          <div className="">
            <Label className="mb-2 text-white">Email:</Label>
            <Input
              type="email"
              className="bg-white"
              {...register("email")}
            ></Input>
          </div>
          <div className="">
            <Label className="mb-2 text-white">Senha:</Label>
            <Input
              type="password"
              className="bg-white"
              {...register("password")}
            ></Input>
          </div>
          <div className="">
            <Label className="mb-2 text-white">Confirmar Senha:</Label>
            <Input type="password" className="bg-white"></Input>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Cadastrar
          </Button>
        </form>
        <p className="text-white font font-medium text-sm pt-6">
          Já tem uma conta?
          <Link href={"/login"} className="underline font-semibold pl-1">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
