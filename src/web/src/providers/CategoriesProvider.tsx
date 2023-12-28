import React, { createContext, useContext, useEffect, useState } from 'react';

import { apolloClient } from '../lib/apollo-client';
import { fetchCategoriesQuery } from '../requests'
import { Category } from '../models';

type CategoriesContextType = {
  categories: Category[],
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
};

const CategoriesContext = createContext<CategoriesContextType>({ categories: [], setCategories: () => {} });

export const CategoriesProvider = ({ children }: { children: React.JSX.Element[] }) => {
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    const response = await apolloClient.query({ query: fetchCategoriesQuery });
    setCategories(response.data.categories);
  };

  useEffect(() => { fetchCategories().catch(console.error); }, []);

  return (
    <CategoriesContext.Provider value={{categories, setCategories}}>
      {children}
    </CategoriesContext.Provider>
  )
};

export const useCategoriesContext = () => useContext<CategoriesContextType>(CategoriesContext);
