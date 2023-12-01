import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import AoC_2023_Routes from "./pages/aoc-2023/Routes";
import NotFound from "./pages/error/NotFound";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/2023/*" element={<AoC_2023_Routes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
