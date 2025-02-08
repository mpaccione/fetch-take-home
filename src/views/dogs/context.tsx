import { createContext, ReactNode, useContext, useState } from "react";

import { Dog, FavoriteDogsContextType } from "./types";

interface FavoriteDogsProviderType {
  children: ReactNode
}


const FavoriteDogsContext = createContext<FavoriteDogsContextType | undefined>(undefined);

export const FavoriteDogsProvider = ({ children }: FavoriteDogsProviderType) => {
  const [favoriteDogs, setFavoriteDogs] = useState({});

  const addFavorite = (d: Dog) => {
    setFavoriteDogs((prev) => ({ ...prev, [d.id]: d }));
  };

  const removeFavorite = (d: Dog) => {
    setFavoriteDogs((prev) => {
      const newFavorites: { [key: string]: Dog } = { ...prev };
      delete newFavorites[d.id];
      return newFavorites;
    });
  };

  return (
    <FavoriteDogsContext.Provider
      value={{ favoriteDogs, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteDogsContext.Provider>
  );
};

export const useFavoriteDogs = (): FavoriteDogsContextType => {
  const context = useContext(FavoriteDogsContext);

  if (!context) {
    throw new Error("useFavoriteDogs must be used within a FavoriteDogsProvider");
  }

  return context;
};
