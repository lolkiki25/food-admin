"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Page = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onCreateUser = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    const result = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log("User created:", result);
  };

  return (
    <div className="flex justify-end pr-5 gap-10 py-5 items-center">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {step == 1 && (
          <div className="w-90">
            <Button variant="outline" onClick={() => setStep(0)} className="mb-6 max-w-[30px]">
              /
            </Button>
            <h1 className="text-2xl font-bold mb-1">Create your account</h1>
            <p className="text-[16px] text-gray-500 mb-6">Sign up to explore your favorite dishes.</p>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="outline" onClick={() => setStep(2)} className="bg-gray-200 w-[360px] mt-6">
              Let's Go
            </Button>
            <div className="flex gap-3 text-center justify-center mt-6 text-sm">
              <p className="text-gray-500">Already have an account?</p>
              <p className="text-blue-500 cursor-pointer" onClick={(onLogin) => setStep(1)}>Log in</p>
            </div>
          </div>
        )}
        {step == 2 && (
          <div className="w-90">
            <Button variant="outline" onClick={() => setStep(1)}  className="mb-6 max-w-[30px]">
              /
            </Button>
            <h1 className="text-2xl font-bold mb-1">Create a strong password</h1>
            <p className="text-[16px] text-gray-500 mb-6">Create a strong password with letters, numbers.</p>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="ConfirmPassword"
              value={confirmPassword}
              className="mt-4 mb-4"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button variant="outline" onClick={onCreateUser} className="bg-gray-200 w-[360px]">
              Lets Go
            </Button>
            <div className="flex gap-3 text-center justify-center mt-6 text-sm">
              <p className="text-gray-500">Already have an account?</p>
              <p className="text-blue-500 cursor-pointer" onClick={(onLogin) => setStep(1)}>Log in</p>
            </div>
          </div>
        )}
      </div>
      <div className="border w-200 rounded-lg"></div>
    </div>
  );
};
export default Page;
