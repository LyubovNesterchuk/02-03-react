import { useEffect, useState} from "react";
import { useLocalStorage } from "usehooks-ts";
import axios from "axios";

import myCats from "../../cats.json";
import css from "./App.module.css";
import AppBar from "../AppBar";
import CatList from "../CatList";
import CountDisplay from "../CountDisplay";
import ClickCounter from "../ClickCounter";
import ToggleExample from "../ToggleExample";
import TagWidget from "../TagWidget";
import Dates from "../Dates";
import Timer from "../Timer";
import Sidebar from "../Sidebar/Sidebar";

const availableCats = myCats.filter((cat) => cat.available);
const takenCats = myCats.filter((cat) => !cat.available);

export default function App() {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage(
    "sidebar-state",
    false
  );

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [character, setCharacter] = useState(null);
  const [count, setCount] = useState(1);

   useEffect(() => {
     async function fetchData() {
      const res = await axios.get(`https://swapi.info/api/people/${count}`);
      setCharacter(res.data);
    }

    fetchData();
  }, [count]);

  
// const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
//   const savedState = localStorage.getItem("sidebar-state");
//   if (savedState !== null) {
//     return JSON.parse(savedState);
//   }
//   return false;
// });

// const openSidebar = () => setIsSidebarOpen(true);
// const closeSidebar = () => setIsSidebarOpen(false);

// useEffect(() => {
//   localStorage.setItem("sidebar-state", JSON.stringify(isSidebarOpen));
// }, [isSidebarOpen]


  return (
    <>
     {/* M3L6 */}
     <Timer/>
    
      <button onClick={openSidebar}>Open sidebar</button>
      {isSidebarOpen && <Sidebar onClose={closeSidebar} />}

      <button onClick={() => setIsOpen(true)}>Open second sidebar</button>
      {isOpen && <Sidebar onClose={() => setIsOpen(false)} />}


      <button onClick={() => setCount(count + 1)}>Count {count}</button>
      {character && <pre>{JSON.stringify(character, null, 2)}</pre>}

      <button onClick={() => setIsTimerVisible(!isTimerVisible)}>Toggle</button>
      {isTimerVisible && <Timer />} 
    

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