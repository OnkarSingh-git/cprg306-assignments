import React from "react";
import ItemList from "./item-list";

const Page = () => {
  return (
    <main className="p-2 bg-slate-950">
      <h1 className="text-3xl font-bold">Shopping List</h1>
      <ItemList />
    </main>
  );
};

export default Page;