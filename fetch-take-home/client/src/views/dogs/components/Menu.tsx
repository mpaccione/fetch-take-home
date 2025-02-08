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
    align-items: center;
    display: flex;
    justify-content: space-between;

    .input {
      width: 100%;
    }
  }
`;

const Menu = ({
  setSearchParams,
  submit,
}: {
  setSearchParams: Function;
  submit: Function;
}) => {
  const [breeds, setBreeds] = useState([]);
  const [ageMax, setAgeMax] = useState();
  const [ageMin, setAgeMin] = useState();
  const [selectedBreed, setSelectedBreed] = useState("");
  const [sort, setSort] = useState("breed:asc")

  useEffect(() => {
    (async () => {
      const res = await getBreeds();
      res?.data && setBreeds(res.data);
    })();
  }, []);

  useEffect(() => {
    const params = {
      from: 0,
      size: 10
    }

    if (ageMax) {
      params.ageMax = ageMax
    }

    if (ageMin) {
      params.ageMin = ageMin
    }

    if (selectedBreed) {
      params.breeds = [selectedBreed]
    }

    if (sort) {
      params.sort = sort;
    }

    setSearchParams(params);
  }, [breeds, ageMax, ageMin, selectedBreed, sort]);

  const validate = (cb) => {
    if (ageMin > ageMax) {
      return alert("Min Age cannot exceed Max Age");
    }

    if (ageMax < ageMin) {
      return alert("Max Age cannot be below Min Age");
    }

    cb()
  } 

  return (
    <div>
      <Segment>
        <div className="row" style={{ justifyContent: "space-between" }}>
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
            style={{ width: "50%" }}
          />
          <Dropdown
            options={[
              {
                text: "Breed Ascending",
                value: "breed:asc",
              },
              {
                text: "Breed Descending",
                value: "breed:desc",
              },
            ].map(({ text, value }, idx) => {
              return { key: idx, text, value };
            })}
            onChange={(_, { value }) => {
              console.log(value)
              setSort(value)
            }}
            placeholder={"Sort by Breed"}
            value={sort}
          />
        </div>
        <br />
        <div className="row">
          <Input
            onChange={({ target: { value } }) => {
              value ? setAgeMin(parseInt(value)) : setAgeMin();
            }}
            placeholder="Min Age"
            type="number"
            value={ageMin}
          />
          <Input
            onChange={({ target: { value } }) => {
              value ? setAgeMax(parseInt(value)) : setAgeMax();
            }}
            placeholder="Max Age"
            type="number"
            value={ageMax}
          />
        </div>
        <br />
        <Button primary onClick={() => validate(submit)}>
          Search
        </Button>
      </Segment>
    </div>
  );
};

const MemoizedMenu = memo(Menu);

export { MemoizedMenu };
