import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/Breadcrumb"
import { PUBLIC_BRAND_NAME, PUBLIC_COMPANY_NAME, PUBLIC_COMPAY_ADDRESS, PUBLIC_SOCIAL_EMAIL, PUBLIC_SOCIAL_MOBILE } from '@/secrets'
import React from 'react'

const AboutPage = () => {
    return (
        <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 mb-4 mt-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>About</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-2xl font-bold mb-4">About Us</h1>
            <h2 className="mb-4 font-semibold">Welcome to {PUBLIC_BRAND_NAME}!</h2>
            <p className="mb-4">
                At {PUBLIC_BRAND_NAME}, we believe in the power of personalization. As an
                e-commerce platform and a proud brand of {PUBLIC_COMPANY_NAME}, we
                specialize in offering high-quality, customized products that let you
                express your unique style and creativity. From T-shirts and mugs to
                keychains and mousepads, we have something special for everyone.
            </p>
            <h2 className="mb-4 font-semibold">Who We Are:</h2>
            <p className="mb-4">
                {PUBLIC_COMPANY_NAME} is a young, dynamic startup specializing in on-demand printing
                and designing solutions. Our technology-first approach drives us to continuously
                innovate, ensuring that we stay ahead in the ever-evolving market. We are passionate
                about what we do and are committed to delivering exceptional products and services
                to our customers.
            </p>
            <h2 className="mb-4 font-semibold">Our Mission:</h2>
            <p className="mb-4">
                Our mission is to provide a seamless and enjoyable shopping experience,
                offering a wide range of personalized products that cater to individual
                tastes and preferences. We aim to empower our customers to express
                themselves through our high-quality, custom-made items.
            </p>
            <h2 className="mb-4 font-semibold">Our Vision:</h2>
            <p className="mb-4">
                We envision a world where everyone has the opportunity to create and own
                personalized products that reflect their personality and style. Our goal is
                to become the go-to platform for all your customization needs, known for our
                quality, innovation, and exceptional customer service.
            </p>
            <h2 className="mb-4 font-semibold">What We Offer:</h2>
            <ul className="mb-4 marker:text-primary-600 list-disc ms-4">
                <li>
                    <strong>Customized T-Shirts:</strong> Whether you want to showcase your favorite
                    design, a memorable quote, or a special photo, our custom T-shirts are perfect
                    for any occasion.
                </li>
                <li>
                    <strong>Personalized Mugs:</strong> Start your day with a smile by sipping
                    your favorite beverage from a mug that’s uniquely yours.
                </li>
                <li>
                    <strong>Unique Keychains:</strong> Keep your keys organized with a personalized
                    keychain that stands out.
                </li>
                <li>
                    <strong>Custom Mousepads:</strong> Enhance your workspace with a mousepad that
                    reflects your style and personality.
                </li>
            </ul>
            <h2 className="mb-4 font-semibold">Why Choose {PUBLIC_BRAND_NAME}?</h2>
            <ul className="mb-4 marker:text-primary-600 list-disc ms-4">
                <li>
                    <strong>Quality Products:</strong> We use the best materials and printing techniques
                    to ensure that our products are of the highest quality.
                </li>
                <li>
                    <strong>Innovative Solutions:</strong> Our AI-integrated designing tool makes
                    it easy for you to create and customize your products, providing a user-friendly
                    and intuitive experience.
                </li>
                <li>
                    <strong>Customer Satisfaction:</strong> We are dedicated to providing excellent
                    customer service and ensuring that our customers are happy with their purchases.
                </li>
                <li>
                    <strong>Fast and Reliable:</strong> We strive to deliver your customized products
                    quickly and efficiently, without compromising on quality.
                </li>
            </ul>
            <h2 className="mb-4 font-semibold">Our Technology:</h2>
            <p className="mb-4">
                We are currently developing an AI-integrated designing tool that will
                revolutionize the way you create and customize products. This innovative
                tool will provide you with a seamless and intuitive design experience,
                making it easier than ever to bring your ideas to life.
            </p>
            <h2 className="mb-4 font-semibold">Get in Touch:</h2>
            <p className="mb-4">
                We would love to hear from you! If you have any questions, suggestions, or
                feedback, please don&apos;t hesitate to reach out to us.
            </p>
            <h2 className="mb-4 font-semibold">Contact Us:</h2>
            <p className="mb-4">{PUBLIC_BRAND_NAME} An {PUBLIC_COMPANY_NAME} Brand</p>
            <p>{PUBLIC_SOCIAL_EMAIL}</p>
            <p>{PUBLIC_SOCIAL_MOBILE}</p>
            <p>{PUBLIC_COMPAY_ADDRESS}</p>
        </div>

    )
}

export default AboutPage