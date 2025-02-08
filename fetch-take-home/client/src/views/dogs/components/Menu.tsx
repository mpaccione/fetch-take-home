import { memo, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Input,
  Segment as BaseSegment,
} from "semantic-ui-react";
import styled from "styled-components";

import { getBreeds } from "../actions";

const Segment = styled(BaseSegment)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 500px;

  button {
    border-radius: 0px !important;
  }

  .row {
    display: flex;

    .input {
      width: 100%;
    }
  }
`;

const Menu = ({ submit }: { submit: Function }) => {
  const [breeds, setBreeds] = useState([]);
  const [maxAge, setMaxAge] = useState();
  const [minAge, setMinAge] = useState();
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getBreeds();
      res?.data && setBreeds(res.data);
    })();
  }, []);

  return (
    <div>
      <Segment>
        <Dropdown
          onChange={(_, { value }) => {
            setSelectedBreed(value);
          }}
          options={breeds.map((b, idx) => {
            return { key: idx, text: b, value: b };
          })}
          placeholder="Select Breed"
          search
          selection
        />
        <br />
        <div className="row">
          <Input
            onChange={({ target: { value } }) => setMinAge(value)}
            placeholder="Min Age"
            type="number"
          />
          <Input
            onChange={({ target: { value } }) => setMaxAge(value)}
            placeholder="Max Age"
            type="number"
          />
        </div>
        <br />
        <Button
          primary
          onClick={() => submit({ breeds: [selectedBreed], maxAge, minAge })}
        >
          Search
        </Button>
      </Segment>
    </div>
  );
};

const MemoizedMenu = memo(Menu);

export { MemoizedMenu };
