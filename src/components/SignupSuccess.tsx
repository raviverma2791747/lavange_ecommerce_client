import { Check, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import React from 'react'

const SignupSuccess = () => {
    return (
        <>
            <div className="flex justify-center mb-4">
                <CheckCircle size={48} weight='fill' className=" text-green-400" />
            </div>

            <div className="mb-4 text-center font-semibold">
                Congratulations! Your account has been created successfully.
            </div>

            <button
                className="mb-4 w-full hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                // disabled={loading}
                // on:click={() => {
                //     state = STATE.LOGIN;
                // }}
            >
                Login
            </button></>
    )
}

export default SignupSuccess