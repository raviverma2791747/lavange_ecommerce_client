'use client';
import Protected from "@/components/Protected";

export default function CheckoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (<Protected>{children}</Protected>)
}