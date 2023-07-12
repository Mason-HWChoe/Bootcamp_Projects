import React, { createContext, useContext, useEffect, useState } from 'react';
import { Item } from '../hooks/useFetch';

interface SelectedDataContextValue {
  selectedData: Item | null;
  setSelectedData: (data: Item | null) => void;
}

export const SelectedDataContext = createContext<
  SelectedDataContextValue | undefined
>(undefined);

export function useSelectedDataContext(): SelectedDataContextValue {
  const context = useContext(SelectedDataContext);
  if (!context) {
    throw new Error(
      'useSelectedDataContext은 SelectedDataStore 내에서 사용되어야 합니다.',
    );
  }
  return context;
}

export default function SelectedDataStore(
  props: React.PropsWithChildren<object>,
) {
  const [selectedData, setSelectedData] = useState<Item | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('selectedData');
    if (storedData) {
      setSelectedData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedData', JSON.stringify(selectedData));
  }, [selectedData]);

  return (
    <SelectedDataContext.Provider value={{ selectedData, setSelectedData }}>
      {props.children}
    </SelectedDataContext.Provider>
  );
}
