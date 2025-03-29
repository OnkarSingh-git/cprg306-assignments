"use client";
import React, { useState } from "react";
import Item from "./item";

const ItemList = ({ items, onItemSelect }) => {
  const [sortBy, setSortBy] = useState("name");
  const [groupByCategory, setGroupByCategory] = useState(false);

  const sortedItems = !groupByCategory
    ? [...items].sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "category") return a.category.localeCompare(b.category);
        return 0;
      })
    : null;

  const groupedItems = groupByCategory
    ? items.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {})
    : null;

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="mb-2 font-bold text-lg">Sort by</div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setSortBy("name");
              setGroupByCategory(false);
            }}
            className={`px-4 py-2 rounded-md border border-gray-300 transition-colors ${
              sortBy === "name"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Name
          </button>
          <button
            onClick={() => {
              setSortBy("category");
              setGroupByCategory(false);
            }}
            className={`px-4 py-2 rounded-md border border-gray-300 transition-colors ${
              sortBy === "category"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Category
          </button>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={() => setGroupByCategory(!groupByCategory)}
          className={`px-4 py-2 rounded-md border border-gray-300 transition-colors ${
            groupByCategory
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Group by Category
        </button>
      </div>

      {groupByCategory ? (
        Object.keys(groupedItems)
          .sort((a, b) => a.localeCompare(b))
          .map((category) => (
            <div key={category} className="mb-6">
              <h2 className="capitalize text-xl font-semibold mb-2">
                {category}
              </h2>
              <ul className="p-2 space-y-4">
                {groupedItems[category]
                  .sort((a, b) => {
                    if (sortBy === "name") return a.name.localeCompare(b.name);
                    if (sortBy === "category")
                      return a.category.localeCompare(b.category);
                    return 0;
                  })
                  .map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                      onSelect={() => onItemSelect(item)}
                    />
                  ))}
              </ul>
            </div>
          ))
      ) : (
        <ul className="p-2 space-y-4">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemList;
