'use client';
import Protected from "@/components/Protected";

export default function OrderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (<Protected>{children}</Protected>)
}
