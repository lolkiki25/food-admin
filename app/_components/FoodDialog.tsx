"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState, } from "react";

export const FoodDialog = () => {
  const [image, setImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const addFoodHandler = async () => {
    if (!name || !price || !image || !ingredients || !category) {
      alert("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("foodName", name);
    form.append("price", String(price));
    form.append("asd", image); // File object
    form.append("ingredients", ingredients);
    form.append("category", category);

    try {
      const response = await fetch("http://localhost:4000/api/food", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Food created successfully!");
        setName("");
        setPrice(0);
        setImage(undefined);
        setIngredients("");
        setCategory("");
      } else {
        alert(data.error || "Failed to create food");
      }
    } catch (error) {
      alert("Failed to create food");
    }
  };
  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };
  const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  return (
    <Dialog>
      <div className="mt-6 bg-white rounded-lg p-6 mb-6 mr-10">
        <DialogTrigger asChild >
          <div className="w-[270px] h-[241px] border border-dashed flex flex-col justify-center items-center border-red-500 rounded-lg gap-6 text-center p-15">
            <p className="w-10 h-10 bg-red-500 flex justify-center items-center rounded-full text-white">+</p>
            <h1 className="text-[14px]">Add new Dish to Appetizers</h1>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[472px]">
          <DialogHeader>
            <DialogTitle>Dishes info</DialogTitle>
          </DialogHeader>
          <div className="gap-4">
            <div className=" gap-3 flex">
              <Label htmlFor="name" className="text-gray-400 text-sm w-[200px]">Dish name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={name}
                value={name}
                onChange={nameChangeHandler}
              />
            </div>
            <div className="gap-3 flex mt-6">
              <Label htmlFor="category" className="text-gray-400 text-sm w-[200px]">Dish category</Label>
              <Input
                id="category"
                name="category"
                value={category}
                onChange={categoryChangeHandler}
              />
            </div>
            <div className="flex mt-6 gap-3">
              <Label htmlFor="ingredients" className="text-gray-400 text-sm w-[200px]">Ingredients</Label>
              <Input
                className="h-15"
                id="ingredients"
                name="ingredients"
                value={ingredients}
                onChange={ingredientsChangeHandler}
              />
            </div>
            <div className="flex mt-6 gap-3">
              <Label htmlFor="price" className="text-gray-400 text-sm w-[200px]">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue="0"
                value={price}
                onChange={priceChangeHandler}
              />
            </div>
            <div className="flex mt-6 items-center gap-3">
              <Label htmlFor="picture" className="text-gray-400 text-sm w-[200px]">Image</Label>
              <Input className="h-30" id="picture" type="file" onChange={fileChangeHandler} />
            </div>
            <Button
              type="submit"
              size={"sm"}
              className="w-fit px-4 py-[10px] mt-10"
              onClick={addFoodHandler}
            >
              <p className="leading-5"> Save changes</p>
            </Button>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
};