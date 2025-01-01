'use client';
import Protected from "@/components/Protected";

export default function CartLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (<Protected>{children}</Protected>)
}
