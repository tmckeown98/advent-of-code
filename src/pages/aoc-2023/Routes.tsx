import { Route, Routes } from "react-router-dom";

import Day from "./Day";
import Index from "./Index";

function AoC_2023_Routes() {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path=":day" element={<Day />} />
    </Routes>
  );
}

export default AoC_2023_Routes;
