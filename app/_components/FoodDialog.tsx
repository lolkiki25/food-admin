"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, ChangeEventHandler, ReactHTMLElement, useState } from "react";


export function FoodDialog() {

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const addFoodHandler = () =>{
    fetch('http://localhost:3300/food-dialog',{
      method: "Post",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        price,
      })
    })
  };
const nameChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
console.log()
setName(e.target.value)
}

const priceChangeHandler =(e:ChangeEvent<HTMLInputElement>) =>{
setPrice(Number(e.target.value));
}
  return (
    <Dialog>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border border-dashed border-red-500 rounded-lg w-[270px] h-[240px] flex flex-col items-center justify-center gap-6 hover:bg-red-50"
        >
          <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center">
            <p className="text-xl text-white">+</p>
          </div>
          <p className="text-[14px] text-gray-700 ">
            Add new Dish to Appetizers
          </p>
        </Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="w-[460px]">
        <DialogHeader>
          <DialogTitle>Add New Dish to Appetizers</DialogTitle>
        </DialogHeader>
          {/* Food name + price */}
          <div className="flex gap-6">
            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="name">Food name</Label>
              <Input
                id="name"
                name="name"
                type="text"
               defaultValue={name}
                value={name}
                onChange={nameChangeHandler}
              />
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <Label htmlFor="price">Food price</Label>
              <Input
                id="price"
                type="number"
                defaultValue="0"
                value={price}
                onChange={priceChangeHandler}
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="flex flex-col gap-2 mt-6">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              placeholder="List ingredients..."
              className="resize-none"
              required
            />
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <Label htmlFor="picture">Food image</Label>

            <label
              htmlFor="picture"
              className=" h-[138px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Input
                id="picture"
                type="file"
                className="hidden"
              />
              <p className="text-gray-500 text-sm">Choose a file or drag & drop it here</p>
            </label>
          </div>
          {/* Submit button */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-black text-white text-[14px]" onClick={addFoodHandler}>
              Add Dish
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
}
