"use client";

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";

const Page = () => {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/week-10");
    }
  }, [user, router]);

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  const loadItems = async () => {
    try {
      const itemsFromFirestore = await getItems(user.uid);
      setItems(itemsFromFirestore);
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const handleAddItem = async (item) => {
    try {
      const newItemId = await addItem(user.uid, item);
      setItems((prevItems) => [...prevItems, { id: newItemId, ...item }]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleItemSelect = (item) => {
    let cleanName = item.name.split(",")[0].trim();
    const emojiRegex =
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|[\uD83D][\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    const ingredient = cleanName.replace(emojiRegex, "").trim();
    setSelectedItemName(ingredient);
  };

  return (
    <main className="p-2 bg-slate-950">
      <div className="flex justify-between items-center ml-4 mr-4">
        <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
      </div>
      <div className="flex gap-4 justify-start items-start ml-4 mr-4">
        <div className="w-full md:w-1/2">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="w-full md:w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
};

export default Page;
