import { Dog } from "../types";

export interface FavoritesList {
    favoriteDogs: Dog[],
    removeFavorite: Function
}