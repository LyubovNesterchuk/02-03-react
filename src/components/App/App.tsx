
import myCats from "../../cats.json";
import css from "./App.module.css";


import { useState } from "react";

import AppBar from "../AppBar";
import CatList from "../CatList";
import CountDisplay from "../CountDisplay";
import ClickCounter from "../ClickCounter";
import ToggleExample from "../ToggleExample";
import TagWidget from "../TagWidget";
import Dates from "../Dates";

const availableCats = myCats.filter((cat) => cat.available);

const takenCats = myCats.filter((cat) => !cat.available);

export default function App() {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  return (
    <>
      {/* M2L4 */}

      <CountDisplay count={clicks} />
      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />
      <hr />
      <ToggleExample />
      <hr />
      <TagWidget />
      <hr />
      <Dates />
      <hr />
      
      {/* M2L3 */}

      <div className={css.container}>
      <AppBar />
      <hr />
      <CatList items={availableCats} />
      <hr />
      <CatList items={takenCats} />
    </div>
    </>
  );
}