"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import perfumeImg from "../../../../public/images/visualelectric-1744626735608.png"
import Link from "next/link";
import LogoIcon from "@/components/icons/Logo";

export default function LoginPage() {
  // Aqui é só um Model dos dados do login com o tipo e etc
  const LoginSchema = z.object({
    email: z.string().email({ message: "Email Inválido!" }),
    password: z.string().min(6, { message: "Mínimo 6 caracteres!" }),
  });

  /* 
  Aqui é para pegar a função de submit do form + register
  (register serve para armanezar o valor do input no data)
  e o "resolver" serve para a validação do schema 
  */
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  if (errors.email) {
    toast.error(`${errors.email.message}`);
  }
  if (errors.password) {
    toast.error(`${errors.password?.message}`);
  }

  /* Agora para integrar com o TypeScript
   Aqui basicamente tá falando que sempre que usar esse tipo
   vai tá inferindo o schema, ou seja, falando que ta 'carregando'
   o schema.
   */
  type LoginSchema = z.infer<typeof LoginSchema>;

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };

  return (
    <main className="flex min-h-screen bg-[#011627]">
      <div className="w-1/2 border border-r-slate-700 border-y-0 border-l-0 shadow-2xl rounded-r-4xl flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-white space-y-5 mb-5">
          <div className="bg-gradient-to-tr from-orange-600 to-orange-500 p-3 rounded-2xl size-24">
            <LogoIcon />
          </div>
          <div>
            <h1 className="font-bold text-3xl">Entrar</h1>
            <h4 className="text-gray-300">
              Bem-Vindo ao Parfum Doux | Entre na sua conta
            </h4>
          </div>
          <hr className="border border-white/60 w-full" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md w-full space-y-6"
        >
          <div className="">
            <Label className="mb-2 text-white">Email:</Label>
            <Input {...register("email")} className="bg-white"></Input>
          </div>
          <div className="">
            <Label className="mb-2 text-white">Senha:</Label>
            <Input type="password" {...register("password")} className="bg-white"></Input>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Entrar
          </Button>
        </form>
        <p className="text-white font font-medium text-sm pt-6">
          Não tem uma conta? 
          <Link href={"/signup"} className="underline font-semibold pl-1">Cadastre-se</Link>
        </p>
      </div>
      <div className="w-1/2 relative shadow-2xl m-6 rounded-2xl">
        <Image src={perfumeImg} alt="perfume background" fill className="object-cover rounded-2xl" />
      </div>
    </main>
  );
}
