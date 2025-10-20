"use client";

import { SignUpForm } from "@/components/auth/SignUpForm";
import { SignUpPassword } from "@/components/auth/SignUpPassword";
import { useState } from "react";

export default function Home() {
    const [step, setStep] = useState(0);
    const StepComponents = [SignUpForm, SignUpPassword][step];

    const [email, setEmail] = useState("");

    const handleNextStep = () => {
        setStep((prev) => prev + 1);
    };
    return (
        <main>
            <div className="flex w-screen h-screen items-center justify-center p-[20px] gap-12">
                <StepComponents
                    email={email}
                    setEmail={setEmail}
                    handleNextStep={handleNextStep}
                />
                <div className="bg-gray-600 rounded-lg w-[856px] h-[904px] cover no-repeat "></div>
            </div>
        </main>
    );
}