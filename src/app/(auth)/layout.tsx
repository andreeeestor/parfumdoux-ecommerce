import { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode
}
export default function AuthLayout(props : AuthLayoutProps){
    return(
        <>
        {props.children}
        </>
    )
}