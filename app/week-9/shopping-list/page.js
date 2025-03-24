"use client";

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

const Page = () => {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/week-9");
    }
  }, [user, router]);

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      router.push("/week-9");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };
  
  const handleItemSelect = (item) => {
    let cleanName = item.name.split(",")[0].trim();
    const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
    const ingredient = cleanName.replace(emojiRegex, "").trim();
    setSelectedItemName(ingredient);
  };

  return (
    <main className="p-2 bg-slate-950">
      <div className="flex justify-between items-center ml-4 mr-4">
        <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>
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