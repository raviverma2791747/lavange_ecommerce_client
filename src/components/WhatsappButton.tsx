import { PUBLIC_SOCIAL_WHATSAPP } from '@/secrets'
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import React from 'react'

const WhatsappButton = () => {
    return (
        <Link href={`https://wa.me/${PUBLIC_SOCIAL_WHATSAPP}`} target='_blank' className='bg-white block rounded-full animate-bounce'>
            <WhatsappLogo size={64} weight='regular' className='text-green-500 ' />
        </Link>
    )
}

export default WhatsappButton