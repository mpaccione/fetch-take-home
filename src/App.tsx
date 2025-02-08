import { Routes, Route } from "react-router";

import Dogs from "./views/dogs";
import Login from "./views/login";
import { FavoriteDogsProvider } from "./views/dogs/context";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route
        path="/dogs"
        element={
          <FavoriteDogsProvider>
            <Dogs />
          </FavoriteDogsProvider>
        }
      />
    </Routes>
  );
}

export default App;
