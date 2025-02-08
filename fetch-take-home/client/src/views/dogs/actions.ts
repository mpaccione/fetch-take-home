import { get, post } from "../../api";

const getBreeds = async () => {
  try {
    const res = await get("/dogs/breeds");
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
    const query = new URLSearchParams(searchParams);
    const res = await get(`/dogs/search?${query.toString()}`);

    if (res.status === 200) {
      const res2 = await post("/dogs", res.data?.resultIds);
      return { dogs: res2?.data || [], total: res?.data?.total || 0 };
    }

    throw Error("Failure to fetch");
  } catch (err) {
    alert(err?.toString());
    return false;
  }
};

const postMatch = async (match: []) => {
  try { 
    const res = await post ('/dogs/match', match)
    return res;
  } catch (err) {
    alert(err?.toString())
    return false;
  }
}

export { getBreeds, getDogs, postMatch };
