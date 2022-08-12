import React, { useEffect, useState } from "react";

interface Category {
  name: string;
  id: string;
}

export const CategoryContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const getCategory = async () => {
      const _category = await fetch("http://localhost:3001/category");
      setCategory(await _category.json());
      setIsLoading(false);
    };

    getCategory();
  }, []);

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {category.length > 0 && <pre>{JSON.stringify(category, null, 2)}</pre>}
    </div>
  );
};
