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
import LogoIcon from "@/components/icons/Logo";
import axios from "axios";

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

  const onSubmit = async (data: SignUpSchema) => {
    try {
      await axios.post("/api/register", data);
      toast.success(`Sua conta foi criada com sucesso, ${data.name}`);
    } catch {
      toast.error(`Erro ao criar a conta. Tente novamente mais tarde`);
    }
  };

  if (errors.email) {
    toast.error(errors.email.message);
  } else if (errors.name) {
    toast.error(errors.name.message);
  } else if (errors.password) {
    toast.error(errors.password?.message);
  } else if (errors.confirmPassword) {
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
            <LogoIcon />
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
            <Input
              type="password"
              className="bg-white"
              {...register("confirmPassword")}
            ></Input>
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
