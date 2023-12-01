import { useParams } from "react-router-dom";

import Day1 from "./day01/Day01";

function Day() {
  const { day } = useParams();

  switch (day) {
    case "1":
      return <Day1 />;
  }

  return (
    <>
      <div></div>
    </>
  );
}

export default Day;
