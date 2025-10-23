"use client";
import { AdminLayout } from "./_components/AdminLayout";

import { ChangeEvent, useEffect, useState } from "react";
import { CategoryType, FoodType } from "@/lib/types";
import { CategorizedFoods } from "./_components/CategorizedFoods";
import { Categories } from "./_components/Categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function Page() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  const [foodLoading, setFoodLoading] = useState<boolean>(false);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const route = useRouter();
  const email = localStorage.getItem("userEmail");
  if (!email) {
    route.push("/login");
  }

  const getCategories = async () => {
    setCategoryLoading(true);
    const result = await fetch("http://localhost:4000/api/categories");
    const responseData = await result.json();
    const { data } = responseData;
    setCategories(data);
    setCategoryLoading(false);
  };

  useEffect(() => {
    console.log("hello categoru=>", categories.length);
  }, [categories]);

  const getFoods = async () => {
    setFoodLoading(true);
    const result = await fetch("http://localhost:4000/api/food");
    const responseData = await result.json();
    setFoods(responseData.data);
    setFoodLoading(false);
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  return (
    <AdminLayout>
      <div className="bg-gray-100 h-full">
        {categoryLoading ? (
          <div className="flex gap-2">
            {[1, 2, 3].map((c) => (
              <Skeleton
                key={c}
                className="flex items-center border-2 rounded-full p-2 py-0 h-7 w-25"
              />
            ))}
          </div>
        ) : (
          <Categories categories={categories} getCategories={getCategories} />
        )}
        {categories.map((category) => {
          return (
            <CategorizedFoods
              key={category._id}
              refetchFoods={() => getFoods()}
              foods={foods.filter(
                (food) => food.categoryId._id == category._id
              )}
              category={category}
            />
          );
        })}
      </div>
    </AdminLayout>
  );
}