"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Page = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      const loggedInEmail = localStorage.getItem("userEmail");
      if (loggedInEmail) {
        router.push("/");
      }
    }
  }, [localStorage]);

  const onLogin = async () => {
    const result = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await result.json();
    if (response.success) {
      localStorage.setItem("userEmail", email);
      router.push("/");
    } else {
      alert("Login failed");
    }
  };
  return (
    <div className="flex justify-center items-center gap-10 pr-5 py-5">
      <div className="flex flex-col items-center justify-center h-screen pl-25">
        <div className="w-90">
          <Button variant="outline" onClick={onLogin} className="mb-6 max-w-[36px]">
            /
          </Button>
          <h1 className="text-2xl font-bold mb-1">Log in</h1>
          <p className="text-gray-500 text-[16px] mb-6">Log in to enjoy your favorite dishes.</p>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 mb-4"
          />

          <Button variant="outline" onClick={onLogin} className="bg-gray-300 w-full mt-6 hover:bg-black hover:text-white">
            Let's Go
          </Button>
        </div>
        <div className="flex gap-3 text-center justify-center mt-6 text-sm">
          <p className="text-gray-500">Already have an account?</p>
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/register")}
          >
            Sign up
          </p>
        </div>
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