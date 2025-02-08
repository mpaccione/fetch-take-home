import { Icon, Image, Segment } from "semantic-ui-react";
import styled from "styled-components";

import { Dog } from "../types";
import { FavoritesList as FavoritesType } from "./types";

const List = styled.div`
  position: fixed;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);

  .icon {
    cursor: pointer;
  }

  .image {
    max-width: 100px !important;
  }

  .row {
    display: flex;
    justify-content: space-between;
  }
`;

const FavoritesList = ({ favoriteDogs, removeFavorite }: FavoritesType) => (
  <List>
    <Segment>
      <h4>Favorites</h4>
      {favoriteDogs.length > 0 &&
        favoriteDogs.map((d: Dog) => (
          <div className="row">
            <Image src={d.img} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <p>{d.name}</p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Icon name="delete" onClick={() => removeFavorite(d)} />
          </div>
        ))}
    </Segment>
  </List>
);

export { FavoritesList };
