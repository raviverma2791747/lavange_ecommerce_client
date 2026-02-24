'use client';
import React, { useEffect } from 'react'
import EmailLoginForm, { IEmailLoginForm } from './EmailLoginForm';
import EmailSignupForm, { IEmailSignupForm } from './EmailSignupForm';
import ForgotPasswordForm, { IForgotPasswordForm } from './ForgotPasswordForm';
import EmailSignupSuccess from './EmailSignupSuccess';
import useStore from '@/helper/store';
import { userService } from '@/services';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/use-auth';

const AUTH_STATE = {
    SIGNUP: "SIGNUP",
    SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
    LOGIN: "LOGIN",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
};

interface IEmailAuthProps {
    onLoginSuccess?: () => void;
}

const EmailAuth: React.FC<IEmailAuthProps> = ({ onLoginSuccess }) => {
    const [origin, setOrigin] = React.useState<string>("");
    const { setAuthModal } = useStore();
    const { hydrateSession } = useAuth();
    const [selectedAuthState, setSelectedAuthState] = React.useState<string>(AUTH_STATE.LOGIN);

    const handleLogin = async (data: IEmailLoginForm) => {
        const response = await userService.login({ username: data.email, password: data.password });
        if (response) {
            toast.success("Login successful");
            await hydrateSession();
            setAuthModal(false);
            onLoginSuccess?.();
        } else {
            toast.error("Failed to login");
        }
    }

    const handleSignup = async (data: IEmailSignupForm) => {
        const response = await userService.signup({
            username: data.email,
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob

        });
        if (response && response.status === 200) {
            toast.success("Signup successful");
            setSelectedAuthState(AUTH_STATE.SIGNUP_SUCCESS);
        } else {
            toast.error(response?.message ?? "Failed to signup");
        }
    }

    const handleForgotPassword = async (data: IForgotPasswordForm) => {
        const response = await userService.resetPassword({
            email: data.email,
            url: `${origin}/account/password/reset`
        });
        if (response && response.status === 200) {
            toast.success("Password reset link sent");
            setSelectedAuthState(AUTH_STATE.LOGIN);
        } else {
            toast.error(response?.message ?? "Failed to reset password");
        }
    }

    useEffect(() => {
        setOrigin(window.location.origin);
    },[])

    return (
        <>
            {AUTH_STATE.LOGIN === selectedAuthState && <EmailLoginForm onSubmit={handleLogin} onSignup={() => setSelectedAuthState(AUTH_STATE.SIGNUP)} onForgotPassword={() => setSelectedAuthState(AUTH_STATE.FORGOT_PASSWORD)} />}
            {AUTH_STATE.SIGNUP === selectedAuthState && <EmailSignupForm onSubmit={handleSignup} onLogin={() => setSelectedAuthState(AUTH_STATE.LOGIN)} />}
            {AUTH_STATE.SIGNUP_SUCCESS === selectedAuthState && <EmailSignupSuccess onLogin={() => setSelectedAuthState(AUTH_STATE.LOGIN)} />}
            {AUTH_STATE.FORGOT_PASSWORD === selectedAuthState && <ForgotPasswordForm onSubmit={handleForgotPassword} onLogin={() => setSelectedAuthState(AUTH_STATE.LOGIN)} />}
            {/* {AUTH_STATE.LOGIN_SUCCESS === selectedAuthState && <SignupSuccess />} */}
        </>
    )
}

export default EmailAuth
