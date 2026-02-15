'use client';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ADDRESS_TYPE } from '@/helper/constants';
import state_list from '@/helper/state_list';
import { CircleNotch } from '@phosphor-icons/react/dist/ssr';
import { Button } from "@/components/ui/Button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
    country: z.string().min(1, "Country is required"),
    fullName: z.string().min(3, "Full name must be at least 3 characters").max(100, "Full name must be at most 100 characters"),
    mobile: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }).refine((val) => parseInt(val, 10) >= 0 && parseInt(val, 10) <= 9999999999, {
        message: "Mobile number is invalid"
    }),
    type: z.string(),
    addressLine1: z.string().min(3, "Address line 1 must be at least 3 characters").max(100),
    addressLine2: z.string().min(3, "Address line 2 must be at least 3 characters").max(100),
    landmark: z.string().max(100).optional(),
    city: z.string().min(3, "City must be at least 3 characters").max(100),
    state: z.string().min(1, "State is required"),
    pincode: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    }).refine((val) => val.length === 6, {
        message: "Pincode must be exactly 6 digits"
    })
})

interface IAddressFormProps {
    defaultValues?: IAddressForm,
    onSubmit?: (data: IAddressForm) => Promise<void>
}

export interface IAddressForm {
    country: string,
    fullName: string,
    mobile: number,
    type: number,
    addressLine1: string,
    addressLine2: string,
    landmark: string,
    city: string,
    state: string,
    pincode: number
}

const AddressForm: React.FC<IAddressFormProps> = ({ defaultValues, onSubmit }) => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            country: defaultValues?.country ?? "India",
            fullName: defaultValues?.fullName ?? "",
            mobile: defaultValues?.mobile ? String(defaultValues.mobile) : undefined,
            type: String(defaultValues?.type ?? ADDRESS_TYPE.HOME),
            addressLine1: defaultValues?.addressLine1 ?? "",
            addressLine2: defaultValues?.addressLine2 ?? "",
            landmark: defaultValues?.landmark ?? "",
            city: defaultValues?.city ?? "",
            state: defaultValues?.state ?? "",
            pincode: defaultValues?.pincode ? String(defaultValues.pincode) : undefined,
        },
    })

    const onSubmitHandler = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        if (onSubmit) {
            // Convert strings back to numbers for the interface
            const submitData: IAddressForm = {
                ...values,
                mobile: parseInt(values.mobile, 10),
                pincode: parseInt(values.pincode, 10),
                type: parseInt(values.type, 10),
                landmark: values.landmark ?? ""
            };
            await onSubmit(submitData);
        }
        setLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input disabled {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full name (First and Last name)</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Full name (First and Last name)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <div className="flex gap-2">
                                <Select disabled defaultValue="91">
                                    <SelectTrigger className="w-[80px]">
                                        <SelectValue placeholder="+91" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="91">+91</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormControl>
                                    <Input type="number" disabled={loading} placeholder="Mobile Number" {...field} />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={String(field.value)} disabled={loading}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select address type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries(ADDRESS_TYPE).map(([key, value]) => (
                                        <SelectItem key={key} value={String(value)}>
                                            {key}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Pincode</FormLabel>
                            <FormControl>
                                <Input type="number" disabled={loading} placeholder="Pincode" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Flat, House no., Building, Company, Apartment</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Flat, House no., Building, Company, Apartment" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Area, Street, Sector, Village</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Area, Street, Sector, Village" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="landmark"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Landmark</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Landmark" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Town/City</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Town/City" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {state_list.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? <CircleNotch size={24} weight='bold' className='animate-spin' /> : "Save"}
                </Button>
            </form>
        </Form>
    )
}

export default AddressForm