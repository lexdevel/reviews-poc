import React, { createContext, useContext, useEffect, useState } from 'react';

import { apolloClient } from '../lib/apollo-client';
import { fetchTagsQuery } from '../requests'
import { Tag } from '../models';

type TagsContextType = {
  tags: Tag[],
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>,
};

const TagsContext = createContext<TagsContextType>({ tags: [], setTags: () => {} });

export const TagsProvider = ({ children }: { children: React.JSX.Element[] }) => {
  const [tags, setTags] = useState<any[]>([]);

  const fetchTags = async () => {
    const response = await apolloClient.query({ query: fetchTagsQuery });
    setTags(response.data.tags);
  };

  useEffect(() => { fetchTags().catch(console.error); }, []);

  return (
    <TagsContext.Provider value={{ tags, setTags }}>
      {children}
    </TagsContext.Provider>
  )
};

export const useTagsContext = () => useContext<TagsContextType>(TagsContext);
