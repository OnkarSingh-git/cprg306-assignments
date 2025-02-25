import React from "react";

const Item = ({ name, quantity, category }) => {
  return (
    <div className="p-2 bg-slate-900 max-w-sm">
      <li className="flex flex-col">
        <span className="font-bold text-white text-xl">{name}</span>
        <p className="text-white text-sm">
          Buy {quantity} in {category}
        </p>
      </li>
    </div>
  );
};

export default Item;
