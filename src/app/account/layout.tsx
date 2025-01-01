'use client';
import Protected from "@/components/Protected";

export default function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (<Protected>{children}</Protected>)
}
