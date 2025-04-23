import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRequireAuth(){
    const user = useAuthStore((state) => state.user)
    const router = useRouter()

    useEffect(() => {
        if(!user) {
            router.push("/login")
        }
    }, [user, router])

    return user
}   