import { createContext, useContext, useState } from "react";

const FavoriteDogsContext = createContext();

export const FavoriteDogsProvider = ({ children }) => {
  const [favoriteDogs, setFavoriteDogs] = useState({});

  const addFavorite = (d) => {
    setFavoriteDogs((prev) => ({ ...prev, [d.id]: d }));
  };

  const removeFavorite = (d) => {
    setFavoriteDogs((prev) => {
      const newFavorites = { ...prev };
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

export const useFavoriteDogs = () => {
  return useContext(FavoriteDogsContext);
};
