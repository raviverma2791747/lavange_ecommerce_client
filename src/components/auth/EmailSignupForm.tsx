'use client';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface IEmailSignupFormProps {
    onLogin?: () => void,
    onSubmit?: (data: IEmailSignupForm) => Promise<void>
}

export interface IEmailSignupForm {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    dob: string
}

const EmailSignupForm: React.FC<IEmailSignupFormProps> = ({ onLogin , onSubmit }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const { register, handleSubmit, formState: { errors },
        watch, } = useForm({
            defaultValues: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                dob: ''
            }
        });

    const confirmPassword = watch('confirmPassword');

    const onSubmitHandler: SubmitHandler<IEmailSignupForm> = async (data) => {
        setLoading(true);
        if(onSubmit) await onSubmit(data);
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="First name"
                    {...register('firstName', { required: 'First name is required' })}
                    disabled={loading}
                />
                 {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Last name"
                    {...register('lastName', { required: 'Last name is required' })}
                    disabled={loading}
                />
                 {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
            </div>

            <div className="mb-4">
                <input
                    type="email"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Email"
                    {...register('email', { required: 'Email is required' })}
                    disabled={loading}
                />
                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
                <input
                    type="date"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Date of birth"
                    disabled={loading}
                    {...register('dob', { required: 'Date of birth is required' })}
                />
                 {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}

                {/* <DatePicker.Root
                    weekdayFormat="short"
                    bind:value={user.dob}
                    onValueChange={(e) => {
                        console.log(e);
                    }}
                    disabled={loading}
                    fixedWeeks={true}
                >
                    <div className="flex w-full  flex-col gap-1.5">
                        <DatePicker.Label className="block select-none text-sm font-medium"
                        >Date of birth</DatePicker.Label
                        >
                        <DatePicker.Input
                            let:segments
                            className="flex h-input w-full  rounded-lg select-none items-center rounded-input border border-border-input bg-background px-2 py-3 text-sm tracking-[0.01em] text-foreground focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover"
                        >
                            {#each segments as {part, value}}
                            <div className="inline-block select-none">
                                {#if part === "literal"}
                                <DatePicker.Segment {part} className="p-1 text-muted-foreground">
                                    {value}
                                </DatePicker.Segment>
                                {:else}
                                <DatePicker.Segment
                                    {part}
                                    className="rounded-5px px-1 py-1 hover:bg-muted focus:bg-muted focus:text-foreground focus-visible:!ring-0 focus-visible:!ring-offset-0 aria-[valuetext=Empty]:text-muted-foreground"
                                >
                                    {value}
                                </DatePicker.Segment>
                                {/if}
                            </div>
                            {/each}
                            <DatePicker.Trigger
                                className="ml-auto inline-flex size-8 items-center justify-center rounded-[5px] text-foreground/60 transition-all hover:bg-muted active:bg-dark-10"
                            >
                                <CalendarIcon />
                            </DatePicker.Trigger>
                        </DatePicker.Input>
                        <DatePicker.Content
                            sideOffset={6}
                            transitionConfig={{ duration: 150, y: -8 }}
                            className="z-50 "
                        >
                            <DatePicker.Calendar
                                className="rounded-[15px] border border-dark-10  p-[22px] shadow-popover bg-white"
                                let:months
                                let:weekdays
                            >
                                <DatePicker.Header className="flex items-center justify-between">
                                    <DatePicker.PrevButton
                                        className="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98"
                                    >
                                        <ChevronLeft />
                                    </DatePicker.PrevButton>
                                    <DatePicker.Heading className="text-[15px] font-medium" />
                                    <DatePicker.NextButton
                                        className="inline-flex size-10 items-center justify-center rounded-9px bg-background-alt transition-all hover:bg-muted active:scale-98"
                                    >
                                        <ChevronRight />
                                    </DatePicker.NextButton>
                                </DatePicker.Header>
                                <div
                                    className="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                                >
                                    {#each months as month}
                                    <DatePicker.Grid
                                        className="w-full border-collapse select-none space-y-1"
                                    >
                                        <DatePicker.GridHead>
                                            <DatePicker.GridRow
                                                className="mb-1 flex w-full justify-between"
                                            >
                                                {#each weekdays as day}
                                                <DatePicker.HeadCell
                                                    className="w-10 rounded-md text-xs !font-normal text-muted-foreground"
                                                >
                                                    <div>{day.slice(0, 2)}</div>
                                                </DatePicker.HeadCell>
                                                {/each}
                                            </DatePicker.GridRow>
                                        </DatePicker.GridHead>
                                        <DatePicker.GridBody>
                                            {#each month.weeks as weekDates}
                                            <DatePicker.GridRow className="flex w-full">
                                                {#each weekDates as date}
                                                <DatePicker.Cell
                                                    {date}
                                                    className="relative size-10 !p-0 text-center text-sm"
                                                >
                                                    <DatePicker.Day
                                                        {date}
                                                        month={month.value}
                                                        className="group relative inline-flex size-10 items-center justify-center whitespace-nowrap rounded-9px border border-transparent bg-transparent p-0 text-sm font-normal text-foreground transition-all hover:border-foreground data-[disabled]:pointer-events-none data-[outside-month]:pointer-events-none data-[selected]:bg-primary-500 data-[selected]:font-medium data-[disabled]:text-foreground/30 data-[selected]:text-white data-[unavailable]:text-muted-foreground data-[unavailable]:line-through rounded-lg"
                                                    >
                                                        <div
                                                            className="absolute top-[5px] hidden size-1 rounded-full bg-foreground transition-all group-data-[today]:block group-data-[selected]:bg-background"
                                                        />
                                                        {date.day}
                                                    </DatePicker.Day>
                                                </DatePicker.Cell>
                                                {/each}
                                            </DatePicker.GridRow>
                                            {/each}
                                        </DatePicker.GridBody>
                                    </DatePicker.Grid>
                                    {/each}
                                </div>
                            </DatePicker.Calendar>
                        </DatePicker.Content>
                    </div>
                </DatePicker.Root> */}
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Password"
                    // bind:value={user.password}
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                        maxLength: { value: 16, message: 'Password must be at most 16 characters' }
                    })}
                    disabled={loading}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    className="w-full py-3 px-4 block border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Confirm Password"
                    // bind:value={user.password}
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        minLength: { value: 8, message: 'Confirm Password must be at least 8 characters' },
                        maxLength: { value: 16, message: 'ConfirmPassword must be at most 16 characters' },
                        validate: value => value === confirmPassword || 'Passwords do not match'
                    })}
                    disabled={loading}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* <div
                id="h-captcha"
                className="h-captcha mb-4"
                data-sitekey={PUBLIC_HCAPTCHA_SITE_KEY}
            ></div> */}

            <button
                className="mb-4 w-full hover:scale-105 transition duration-100 ease-in-out py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={loading}
                // on:click={signup}
                type='submit'
            >
               { loading ?  <CircleNotch weight='bold' size={24} className="animate-spin" />   : "Sign Up" }
            </button>

            <div className="mb-4">
                <button
                    type='button'
                    className="text-sm text-primary-500 underline cursor-pointer"
                    onClick={() => {
                    if(onLogin) onLogin();
                }}
                >Already have an account?</button>
            </div>
        </form>
    )
}

export default EmailSignupForm