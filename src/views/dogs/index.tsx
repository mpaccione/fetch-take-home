import { useEffect, useState } from "react";
import {
  Button,
  Icon,
  Image,
  Pagination,
  PaginationProps,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

import { Dog, FavoriteDogsContextType } from "./types";
import { FavoritesList } from "./components/FavoritesList";
import { getDogs, postMatch } from "./actions";
import { MatchModal } from "./components/MatchModal";
import { MemoizedMenu } from "./components/Menu";
import { useFavoriteDogs } from "./context";

const Dogs = () => {
  const { addFavorite, favoriteDogs, removeFavorite } =
    useFavoriteDogs() as FavoriteDogsContextType;

  const [activePage, setActivePage] = useState(0);
  const [match, setMatch] = useState();
  const [results, setResults] = useState({ dogs: [], total: 0 });
  const [searchParams, setSearchParams] = useState({
    from: 10,
    size: 10,
    sort: "breed:asc",
  });

  // pagination
  useEffect(() => {
    (async () => {
      //@ts-ignore
      const res = await getDogs(searchParams);
      res && setResults(res);
    })();
  }, [activePage]);

  const submit = async () => {
    //@ts-ignore
    const res = await getDogs(searchParams);
    res && setResults(res);
  };

  const submitMatch = async () => {
    const res = await postMatch(
      (Object.values(favoriteDogs) as Dog[]).map((d) => d.id)
    );
    if (res && res?.data?.match) {
      const matchingDog = results.dogs.find((d: Dog) => {
        return d.id === res.data.match;
      });
      setMatch(matchingDog);
    }
  };

  return (
    <>
      <div style={{ margin: "auto", width: "50%" }}>
        <MemoizedMenu {...{ setSearchParams, submit }} />
        <div style={{ maxHeight: "600px", overflow: "auto" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Woof</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Age</TableHeaderCell>
                <TableHeaderCell>Breed</TableHeaderCell>
                <TableHeaderCell>Zipcode</TableHeaderCell>
                <TableHeaderCell>Favorite</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.dogs.length > 1 &&
                results.dogs.map((d: Dog, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Image src={d.img} style={{ maxWidth: "180px" }} />
                    </TableCell>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.age}</TableCell>
                    <TableCell>{d.breed}</TableCell>
                    <TableCell>{d.zip_code}</TableCell>
                    <TableCell>
                      <Icon
                        name={d.id in favoriteDogs ? "heart" : "heart outline"}
                        onClick={() => {
                          d.id in favoriteDogs
                            ? removeFavorite(d)
                            : addFavorite(d);
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          activePage={activePage}
          onPageChange={(_, { activePage }: PaginationProps) => {
            const page = typeof activePage === "number" ? activePage : 1;
            setSearchParams({ ...searchParams, from: page * 10 - 10 });
            setActivePage(page);
          }}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
          totalPages={Math.ceil(results.total / 10)}
        />
        {Object.keys(favoriteDogs).length > 1 && (
          <Button
            color="green"
            onClick={() => submitMatch()}
            style={{ width: "100%" }}
          >
            Get Match Based on Favorites
          </Button>
        )}

        {match && <MatchModal {...{ match, setMatch }} />}
      </div>
      {Object.keys(favoriteDogs).length > 0 && (
        <FavoritesList
          {...{ favoriteDogs: Object.values(favoriteDogs), removeFavorite }}
        />
      )}
    </>
  );
};

export default Dogs;
