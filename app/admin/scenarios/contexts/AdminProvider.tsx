'use client'

import { NextUIProvider } from '@nextui-org/react'

export function AdminProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
        { children }
        </NextUIProvider>
    )
}