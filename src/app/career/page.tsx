import Breadcrumb from '@/components/ui/Breadcrumb'
import { PUBLIC_BRAND_NAME, PUBLIC_COMPANY_CAREER_EMAIL, PUBLIC_COMPANY_CAREER_FORM, PUBLIC_COMPANY_NAME } from '@/secrets'
import React from 'react'

const CareerPage = () => {
  return (
    <div className="bg-white max-w-7xl mx-auto px-4 7xl:px-0 mb-4 mt-4">
      {/* {#if loading}
      <BreadcrumbShimmer count={1} />
      <div className="flex gap-4 flex-col">
        {#each { length: 5 } as item}
          <OrderCardShimmer />
        {/each}
      </div>
    {:else}  */}
      <Breadcrumb
        routes={[
          {
            name: "Career",
            path: "/career",
          },
        ]}
      />

      <h1 className="text-2xl font-bold mb-4">Careers at {PUBLIC_BRAND_NAME}</h1>
      <h2 className="text-xl font-bold mb-4">Join Our Team at {PUBLIC_BRAND_NAME}!</h2>

      <p className="mb-4">
        {PUBLIC_BRAND_NAME}, a proud brand of {PUBLIC_COMPANY_NAME}, is a vibrant
        and innovative startup specializing in on-demand printing and designing
        solutions. As an e-commerce platform, {PUBLIC_BRAND_NAME} offers a diverse range
        of customized products including T-shirts, mugs, keychains, and mousepads. Our
        commitment to a technology-first approach drives us to continuously innovate
        and enhance our customers' experience.
      </p>

      <h2 className="text-xl font-bold mb-4">Why Work with Us?</h2>
      <p className="mb-4">
        At {PUBLIC_BRAND_NAME}, we believe in fostering a dynamic and inclusive
        workplace where creativity and collaboration thrive. We are passionate about
        our mission to deliver top-quality, personalized products to our customers,
        and we are always on the lookout for talented individuals who share our
        vision.
      </p>

      <h2 className="text-xl font-bold mb-4">Our Culture:</h2>

      <ul className="mb-4 marker:text-primary-600 list-disc ms-4">
        <li>
          Innovation: We are dedicated to staying at the forefront of technology.
          Our current projects include the development of an AI-integrated designing
          tool to revolutionize our customers' creative process.
        </li>
        <li>
          Collaboration: We value teamwork and believe that great ideas come from a
          diverse and inclusive environment.
        </li>
        <li>
          Growth: As a rapidly growing startup, we offer ample opportunities for
          career advancement and personal development.
        </li>
        <li>
          Customer-Centric: Our customers are at the heart of everything we do. We
          strive to exceed their expectations with every product we create.
        </li>
      </ul>

      <h2 className="text-xl font-bold mb-4">Career Opportunities:</h2>

      <p className="mb-4">
        We are looking for enthusiastic and driven individuals to join our team in
        various roles, including:
      </p>

      <ul className="marker:text-primary-600 list-disc ms-4 mb-4">
        <li>
          Graphic Designers: If you have a passion for design and a keen eye for
          detail, join our creative team to help bring our customers' ideas to life.
        </li>
        <li>
          Software Developers: Be a part of our tech team and contribute to the
          development of cutting-edge solutions, including our AI-integrated
          designing tool.
        </li>
        <li>
          Marketing Specialists: Help us spread the word about {PUBLIC_BRAND_NAME}'s
          amazing products and engage with our growing customer base through
          innovative marketing strategies.
        </li>
        <li>
          Customer Service Representatives: Ensure our customers have a seamless and
          delightful experience by providing exceptional support and assistance.
        </li>
      </ul>

      <h2 className="text-xl font-bold mb-4">How to Apply:</h2>
      <p className="mb-4">
        If you are excited about the opportunity to work with a forward-thinking
        company and make a real impact, we would love to hear from you! Send your
        resume and a cover letter detailing your experience and why you want to join {PUBLIC_BRAND_NAME}
        to {PUBLIC_COMPANY_CAREER_EMAIL}.
      </p>

      <h2 className="text-xl font-bold mb-4">
        Join us and be a part of something extraordinary. Together, let's create
        something amazing!
      </h2>

      <a
        className="hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
        href={PUBLIC_COMPANY_CAREER_FORM}
        target="_blank">Apply Now</a>
    </div>
  )
}

export default CareerPage