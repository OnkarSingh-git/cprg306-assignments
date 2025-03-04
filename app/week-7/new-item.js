"use client";
import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((prevQuantity) => (prevQuantity < 20 ? prevQuantity + 1 : prevQuantity));
  };

  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      category,
      quantity,
    };

    onAddItem(newItem);

    setName("");
    setCategory("produce");
    setQuantity(1);
  };

  return (
    <div className="max-w-xs ml-4 p-4 bg-gray-800 rounded shadow text-white">
      <h2 className="text-lg font-bold mb-2">Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Item Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Item Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Quantity</label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={decrement}
              disabled={quantity === 1}
              className={`px-3 py-1 font-bold ${quantity === 1 ? "text-gray-400" : "text-blue-500"}`}
            >
              –
            </button>
            <span className="mx-4">{quantity}</span>
            <button
              type="button"
              onClick={increment}
              disabled={quantity === 20}
              className={`px-3 py-1 font-bold ${quantity === 20 ? "text-gray-400" : "text-blue-500"}`}
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block mb-1">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen">Frozen Foods</option>
            <option value="canned">Canned Goods</option>
            <option value="dry">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
