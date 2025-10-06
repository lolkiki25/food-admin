"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"


export function FoodDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className=" w-[270px] max-h-[240px] border-red-500 border-dashed border rounded-lg flex flex-col justify-center items-center gap-6 hover:shadow-lg transition">
                <Button className="bg-red-500 max-w-[35px] max-h-[40px] rounded-full">+</Button>
                <h1 className="max-w-[154px] font-inter text-[14px] text-center">Add new Dish to Appetizers</h1>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new Dish to Appetizers</DialogTitle>
                </DialogHeader>
                <form className="space-y-3">
                    <Input
                        type="text"
                        placeholder="food name"
                        className="border rounded p-2 w-full"
                    />
                    <Input
                        type="number"
                        placeholder="Price"
                        className=" border rounded p-2 w-full"
                    />
                    <Button type="submit" className="w-fll">Save</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}