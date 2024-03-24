import React from "react";
import { useDataStore } from "../../store/data";
export const Category = ({ category }) => {
  const { id, value, enabled } = category;
  const toggleCategoryEnabled = useDataStore(
    (state) => state.toggleCategoryEnabled
  );
  const computedClasses = enabled
    ? "bg-blue-500 text-white border border-white"
    : "border border-blue-400 text-blue-500";
  const classes = `px-4 py-2 border hover:bg-blue-600 hover:text-white  mx-4 rounded-lg ${computedClasses}`;

  return (
    <button className={classes} onClick={() => toggleCategoryEnabled(id)}>
      {value}
    </button>
  );
};
