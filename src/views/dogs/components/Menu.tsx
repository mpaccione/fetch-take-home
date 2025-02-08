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
  const [ageMax, setAgeMax] = useState<number | undefined>();
  const [ageMin, setAgeMin] = useState<number | undefined>();
  const [selectedBreed, setSelectedBreed] = useState("");
  const [sort, setSort] = useState("breed:asc");

  useEffect(() => {
    (async () => {
      const res = await getBreeds();
      res && res?.data && setBreeds(res.data);
    })();
  }, []);

  useEffect(() => {
    const params = {
      from: 0,
      size: 10,
    };

    if (ageMax) {
      (params as { from: number; size: number; ageMax: number }).ageMax =
        ageMax;
    }

    if (ageMin) {
      (params as { from: number; size: number; ageMin: number }).ageMin =
        ageMin;
    }

    if (selectedBreed) {
      (params as { from: number; size: number; breeds: string[] }).breeds = [
        selectedBreed,
      ];
    }

    if (sort) {
      (params as { from: number; size: number; sort: string }).sort = sort;
    }

    setSearchParams(params);
  }, [breeds, ageMax, ageMin, selectedBreed, sort]);

  const validate = (cb: Function) => {
    if (ageMin !== undefined && ageMax !== undefined) {
      if (ageMin > ageMax) {
        return alert("Min Age cannot exceed Max Age");
      }

      if (ageMax < ageMin) {
        return alert("Max Age cannot be below Min Age");
      }
    }

    cb();
  };

  return (
    <div>
      <Segment>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <Dropdown
            onChange={(_, { value }) => {
              typeof value === 'string' && setSelectedBreed(value);
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
            onChange={(_, { value }) => setSort(value as string)}
            placeholder={"Sort by Breed"}
            value={sort}
          />
        </div>
        <br />
        <div className="row">
          <Input
            onChange={({ target: { value } }) => {
              value ? setAgeMin(parseInt(value)) : setAgeMin(0);
            }}
            placeholder="Min Age"
            type="number"
            value={ageMin}
          />
          <Input
            onChange={({ target: { value } }) => {
              value ? setAgeMax(parseInt(value)) : setAgeMax(undefined);
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
