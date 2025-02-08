import { Routes, Route } from "react-router";

import Dogs from "./views/dogs";
import Login from "./views/login";

function App() {
  return (
    <Routes>
      <Route element={<Login />} path="/" />
      <Route
        path="/dogs"
        element={<Dogs />}
      />
    </Routes>
  );
}

export default App;
