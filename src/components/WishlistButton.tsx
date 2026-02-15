'use client';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import { Button } from "@/components/ui/Button";

const WishlistButton = () => {
    return (
        <>
            <Button variant="ghost" size="icon" className="hover:text-primary-500 rounded-full h-10 w-10"><Heart size={24} /></Button>
            <Button variant="ghost" size="icon" className="text-primary-500 rounded-full h-10 w-10"><Heart size={24} weight='duotone' /></Button>
        </>
    )
}

export default WishlistButton