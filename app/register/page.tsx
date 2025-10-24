"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const Page = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const onCreateUser = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to register user");
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center gap-10 pr-5 py-5">
      <div className="flex flex-col items-center justify-center h-screen pl-25">
        {step === 1 && (
          <div className="w-[360px]">
            <Button variant="outline" onClick={() => setStep(0)} className="mb-6 max-w-[30px]">
              /
            </Button>
            <h1 className="text-2xl font-bold mb-1">Create your account</h1>
            <p className="text-[16px] text-gray-500 mb-6">
              Sign up to explore your favorite dishes.
            </p>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() => setStep(2)}
              className="bg-gray-300 w-full mt-6 hover:bg-black hover:text-white"
            >
              Let's Go
            </Button>
            <div className="flex gap-2 justify-center mt-6 text-sm">
              <p className="text-gray-500">Already have an account?</p>
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Log in
              </p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-[360px]">
            <Button variant="outline" onClick={() => setStep(1)} className="mb-6 max-w-[30px]">
              /
            </Button>
            <h1 className="text-2xl font-bold mb-1">Create a strong password</h1>
            <p className="text-[16px] text-gray-500 mb-6">
              Create a strong password with letters and numbers.
            </p>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              className="mt-4 mb-4"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Button
              variant="outline"
              onClick={onCreateUser}
              className="bg-gray-300 w-full mt-6 hover:bg-black hover:text-white"
            >
              Let's Go
            </Button>
            <div className="flex gap-2 justify-center mt-6 text-sm">
              <p className="text-gray-500">Already have an account?</p>
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Log in
              </p>
            </div>
          </div>
        )}
      </div>
      <Image
        src="/frame.png" // зураг public фолдерт байх ёстой
        alt="Food Image"
        width={856}
        height={904}
        className="rounded-lg object-cover"
      />
    </div>
  );
};

export default Page;
