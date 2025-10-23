"use client";
import React, { useState, ChangeEvent } from "react";
import { CategoryType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export const Categories = ({
  categories,
  getCategories,
}: {
  categories: CategoryType[];
  getCategories: () => Promise<void>;
}) => {
  const [newCategory, setNewCategory] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
    <div className="flex gap-2">
      {categories.map((category) => (
        <div
          className="flex items-center border-2 rounded-full p-2 py-0"
          key={category._id}
        >
          {category.name}
          <X
            className="hover:bg-gray-400/20 w-4"
            onClick={() => deleteCategoryHandler(category._id)}
          />
        </div>
      ))}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Badge
            onClick={() => setModalOpen(true)}
            variant={"outline"}
            className="cursor-pointer hover:bg-gray-500/20"
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
  );
};