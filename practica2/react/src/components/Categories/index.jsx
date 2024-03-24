import React from "react";
import { useDataStore } from "../../store/data";
import { Category } from "./Category";

export const Categories = () => {
  const categories = useDataStore((state) => state.categories);

  return (
    <>
      <div className="flex flex-row w-full justify-center content-center">
        {categories.map((category) => (
          <React.Fragment key={category.id}>
            <Category category={category} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
