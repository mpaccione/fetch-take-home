import { get, post } from "../../api";

const getBreeds = async () => {
  try {
    const res = await get("/dogs/breeds");
    console.log(res);
    return res;
  } catch (err) {
    alert(err?.toString());
    return false;
  }
};

interface searchParams {
  breeds: [];
  ageMax: Number;
  ageMin: Number;
}

const getDogs = async (searchParams: searchParams) => {
  try {
    console.log(searchParams);
    const query = new URLSearchParams(searchParams);
    console.log(query);
    const res = await get(`/dogs/search?${query.toString()}`);

    if (res.status === 200) {
      const res2 = await post("/dogs", res.data?.resultIds);
      return res2;
    }

    throw Error("Failure to fetch");
  } catch (err) {
    alert(err?.toString());
    return false;
  }
};

export { getBreeds, getDogs };
