"use client";
import React, { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

const Page = () => {
  const [items, setItems] = useState(itemsData);
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <main className="p-2 bg-slate-950">
      <h1 className="text-3xl font-bold mb-4 ml-4">Shopping List</h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} />
    </main>
  );
};

export default Page;