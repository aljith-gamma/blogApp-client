"use client"
import { PrivateRouter } from "@/components/PrivateRouter/PrivateRouter"

export default function RootLayout({ children, }: { children: React.ReactNode }) {
    return (
          <PrivateRouter>
            {children}
          </PrivateRouter>
    )
}