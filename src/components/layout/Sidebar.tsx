"use client";
import {
  Home,
  LogIn,
  LogOut,
  Package,
  PhoneCall,
  SidebarIcon,
  SquarePen,
  UserCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import LogoIcon from "../icons/Logo";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useAuthStore } from "@/store/auth-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Toggle } from "../ui/toggle";

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex flex-col bg-muted/5">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-15 bg-muted/5 rounded-r-sm sm:flex justify-center">
        <nav className="flex flex-col items-center gap-7 py-5">
          <TooltipProvider>
            <header className="shrink-0 bg-gradient-to-tr from-orange-600 to-orange-500 p-2 rounded-2xl size-10">
              <LogoIcon />
            </header>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex items-center justify-center gap-4 px-2.5 shrink-0 text-muted-foreground hover:text-white"
                  href="/"
                >
                  <Home className="size-6 transition-all" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="font-semibold" side="right">
                Início
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex items-center justify-center gap-4 px-2.5 shrink-0 text-muted-foreground hover:text-white"
                  href="/"
                >
                  <Package className="size-6 transition-all" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="font-semibold" side="right">
                Produtos
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex items-center justify-center gap-4 px-2.5 shrink-0 text-muted-foreground hover:text-white"
                  href="/contato"
                >
                  <PhoneCall className="size-6 transition-all" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="font-semibold" side="right">
                Contato
              </TooltipContent>
            </Tooltip>

            <hr className="w-full border-muted-foreground" />

            {!user ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className="flex items-center justify-center gap-4 px-2.5 shrink-0 text-muted-foreground hover:text-white"
                    href="/login"
                  >
                    <LogIn className="size-6 transition-all" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="font-semibold" side="right">
                  Autenticar
                </TooltipContent>
              </Tooltip>
            ) : (
              <>
                <Dialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <span className="cursor-pointer flex items-center justify-center gap-4 px-2.5 shrink-0 text-muted-foreground hover:text-white">
                          <UserCircle className="size-6 transition-all" />
                        </span>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent className="font-semibold" side="right">
                      Perfil
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        onClick={logout}
                        className="flex items-center justify-center gap-4 px-2.5 shrink-0 text-muted-foreground hover:text-white"
                        href="/login"
                      >
                        <LogOut className="size-6 transition-all" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="font-semibold" side="right">
                      Sair
                    </TooltipContent>
                    <DialogContent className="sm:max-w-[425px] text-white">
                      <DialogHeader>
                        <DialogTitle>Perfil</DialogTitle>
                        <DialogDescription>
                          VEJA ou EDITE o seu perfil aqui. Clique em salvar quando terminar.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Nome
                          </Label>
                          <Input
                            id="name"
                            value={user.name}
                            className="col-span-3"
                            disabled
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="username"
                            value={user.email}
                            className="col-span-3"
                            disabled
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Toggle className="cursor-pointer border-2">
                          <SquarePen />
                        </Toggle>
                        <Button type="submit" 
                        disabled={true}
                        >Salvar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Tooltip>
                </Dialog>
              </>
            )}
          </TooltipProvider>
        </nav>
      </aside>

      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-50 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="sm:hidden cursor-pointer group border-2"
              >
                <SidebarIcon className={"group-hover:text-black text-white"} />
              </Button>
            </SheetTrigger>
            <SheetContent
              className="text-white border-0 shadow-2xl sm:max-w-xs"
              side="left"
            >
              <nav className="grid gap-6 text-lg font-medium">
                <SheetTitle className="bg-gradient-to-tr from-orange-600 to-orange-500 p-3 rounded-2xl size-14">
                  <LogoIcon />
                </SheetTitle>
                <Link className="flex items-center gap-4 px-2.5 " href="/">
                  <Home className="size-5 transition-all" />
                  Início
                </Link>
                <Link
                  className="flex items-center gap-4 px-2.5 "
                  href="/produtos"
                >
                  <Package className="size-5 transition-all" />
                  Produtos
                </Link>
                <Link className="flex items-center gap-4 px-2.5 " href="/">
                  <PhoneCall className="size-5 transition-all" />
                  Contato
                </Link>
                <hr />
              </nav>
            </SheetContent>
          </Sheet>
          <h2 className="font-medium text-white">Menu</h2>
        </header>
      </div>
    </div>
  );
}
