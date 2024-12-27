import React from 'react'

const ForgotPassword = () => {
    return (
        <>
            <div className="mb-4">
                <input
                    type="email"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Email"
                    name="email"
                    // bind:value={user.email}
                    // disabled={loading}
                />
            </div>

            <button
                className="mb-4 w-full hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                // disabled={loading}
                // on:click={resetPassword}
            >
                Send Password Reset Link
            </button>

            <div className="mb-4">
                <button
                    className="text-sm text-primary-500 underline cursor-pointer"
                    // on:click={() => {
                    //     state = STATE.LOGIN;
                    // }}
                >Remember password?</button
                >
            </div>
        </>
    )
}

export default ForgotPassword