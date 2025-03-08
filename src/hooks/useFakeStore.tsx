import useSWR from "swr";

export function useFakeStore() {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useSWR(
    `${import.meta.env.VITE_FAKE_STORE_API}/products/categories`,
    async (url) => {
      const res = await fetch(url);
      const categories: string[] = await res.json();

      return categories;
    },
  );

  const {
    data: oneOfEach,
    isLoading: isOneOfEachLoading,
    error: oneOfEachError,
  } = useSWR(categories, async (categories) => {
    const oneOfEach = await Promise.all(
      categories.map(async (category: string) => {
        const res = await fetch(
          `${import.meta.env.VITE_FAKE_STORE_API}/products/category/${category}?limit=1`,
        );
        const products: Product[] = await res.json();

        return products[0];
      }),
    );

    return oneOfEach;
  });

  return {
    categories,
    oneOfEach,
    isLoading: isCategoriesLoading || isOneOfEachLoading,
    error: categoriesError || oneOfEachError,
  };
}
