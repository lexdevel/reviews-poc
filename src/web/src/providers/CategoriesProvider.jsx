import { createContext, useContext, useEffect, useState } from 'react';

import { apolloClient } from '../lib/apollo-client';
import { fetchCategoriesQuery } from '../requests'

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

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

export const useCategoriesContext = () => useContext(CategoriesContext);
