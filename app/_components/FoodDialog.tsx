"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function FoodDialog() {
  return (
    <Dialog>
      <DialogTrigger className="border border-dashed border-red-500 rounded-lg w-[270px] h-[240px] flex flex-col items-center justify-center gap-6">
        <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center">
          <p className="text-xl text-white">+</p>
        </div>
        <p className="text-[14px] text-inter max-w-[154px]">
          Add new Dish to Appetizers
        </p>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-semibold mb-4">
          Add New Dish to Appetizers
        </h2>
        {/* энд форм нэмнэ */}
        <div className="flex gap-6">
          <div>
            Food name
            <input
              type="text"
              placeholder="Type food name"
              className="w-full border p-2 rounded mb-2 mt-2"
            />
          </div>
          <div>
            Food price
            <input
              type="number"
              placeholder="Enter price..."
              className="w-full border p-2 rounded mb-2 mt-2"
            />
          </div>
        </div>
        <div>
          Ingredients
          <textarea
            placeholder="List ingredients..."
            className="w-full border p-2 rounded mb-2 mt-2"
          />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-black text-white text-[14px] py-2 rounded px-4">
            Add Dish
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
