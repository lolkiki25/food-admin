"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    email: z.email(),
})

export const SignUpForm = ({email, setEmail, handleNextStep}: any) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setEmail(values.email);
        handleNextStep();
    }

    return <div className="ml-20">
        <Form {...form}>
            <Button className="bg-white border text-black">1</Button>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <h1 className="text-[24px] font-bold mt-6">Create your account</h1>
                            <p className="text-gray-500 text-4 mb-6 font-inter">Sign up to explore your favorite dishes.</p>
                            <FormControl>
                                <Input className="text-gray-400" placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-gray-400 w-full" type="submit">Let's Go</Button>
                <div className="w-full flex items-center justify-center">
                <p className="">Already have an account?</p>
                <Button variant="link" className="ml-2 text-blue-500">Log in</Button>
                </div>
            </form>
        </Form>

    </div>
}