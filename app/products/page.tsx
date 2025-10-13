"use client";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "../_components/AdminLayout";
import { FoodDialog } from "../_components/FoodDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function ProductPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const getCategories = async () => {
    const result = await fetch("http://localhost:4000/api/categories");
    const responseData = await result.json();
    console.log({ responseData });
    const { data } = responseData;
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const newCategoryNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };
  const createCategoryHandler = async () => {
    await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newCategory,
      }),
    });
    setModalOpen(false);
    await getCategories();
  };

  const deleteCategoryHandler = async (category: string) => {
    await fetch("http://localhost:4000/api/categories/delete", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(category),
    });
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg p-6 mb-6 mr-10">
        <p className="text-[20px] font-bold mb-6">Dishes category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <div
              className="flex items-center border-2 rounded-full p-2 py-0"
              key={category}
            >
              {category}
              <X
                className="hover:bg-gray-400/20 w-4"
                onClick={() => deleteCategoryHandler(category)}
              />
            </div>
          ))}
          <Dialog open={modalOpen}>
            <DialogTrigger asChild>
              <Badge
                onClick={() => setModalOpen(true)}
                variant={"outline"}
                className="cursor-pointer text-white w-10 h-10 font-inter rounded-full bg-red-500"
              >
                +
              </Badge>
            </DialogTrigger>
            <DialogContent className="w-[463px] p-6">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
              </DialogHeader>
              <Input
                type="text"
                placeholder="new category"
                onChange={newCategoryNameChangeHandler}
              />
              <Button onClick={createCategoryHandler}>Create</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <FoodDialog />
    </AdminLayout>
  );
}
