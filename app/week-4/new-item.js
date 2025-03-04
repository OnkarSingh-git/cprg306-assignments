"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);
  const increment = () => {
    setQuantity((prevQuantity) => {
      return prevQuantity < 20 ? prevQuantity + 1 : prevQuantity;
    });
  };
  const decrement = () => {
    setQuantity((prevQuantity) => {
      return prevQuantity > 1 ? prevQuantity - 1 : prevQuantity;
    });
  };
  return (
    <div className="max-w-xs mx-auto p-4 bg-gray-800 rounded shadow">
      <h2 className="text-lg font-bold mb-2">Add New Item</h2>
      <div className="flex items-center">
        <button
          onClick={decrement}
          disabled={quantity === 1}
          className={`px-3 py-1 text-lg font-bold ${
            quantity === 1 ? "text-gray-400" : "text-blue-500"
          }`}
        >
          –
        </button>
        <span className="mx-4 text-lg">{quantity}</span>
        <button
          onClick={increment}
          disabled={quantity === 20}
          className={`px-3 py-1 text-lg font-bold ${
            quantity === 20 ? "text-gray-400" : "text-blue-500"
          }`}
        >
          +
        </button>
      </div>
    </div>
  );
}
