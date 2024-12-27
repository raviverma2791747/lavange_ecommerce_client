'use client';
import { Heart } from '@phosphor-icons/react/dist/ssr';

const WishlistButton = () => {
    return (
        <>
            <button className="hover:text-primary-500"><Heart size={24} /></button>
            <button className="text-primary-500"><Heart size={24} weight='duotone' /></button>
        </>
    )
}

export default WishlistButton