import { useState } from "react";
import axios from "axios";
import "./App.css";
import Swipe from "./Swipe.jsx";
import GameUnlockGate from "./GameUnlockGate.jsx";



export default function App() {
  const [q, setQ] = useState("");
  const [r, setR] = useState([]);

  const search = async () => {   
  const res = await axios.get(
  `https://imdb.iamidiotareyoutoo.com/search?q=${q}&tt=&lsn=1&v=1`
  );
   setR(res.data.description);  
   };

  return (
    <div className="min-h-screen w-[100%] flex flex-col items-center justify-center bg-[url('https://res.cloudinary.com/dunwz8exc/image/upload/v1773606337/d0w2pbdgcbclu40uxm6n.jpg')] bg-cover">

<input
  value={q}
  onChange={(e) => setQ(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      search();
    }
  }}
  placeholder=""
  className="input input-neutral"
  className="h-13 w-[90vw] border-3 border-white bg-black rounded-[50px] px-3 py-1 mb-5 text-white focus:border-3 focus:outline-none focus:border-white"
/>




<div className="w-full overflow-x-auto">
  <div className="flex flex-nowrap gap-4 px-4">
    {r.map((item, index) => (
      <GameUnlockGate
        key={index}
        url={`https://streamimdb.me/embed/${item["#IMDB_ID"]}`}
        requiredSeconds={60}
      >
        <div
          className="w-[160px] h-[240px] bg-cover bg-center rounded-xl border-2 border-black flex-shrink-0"
          style={{
            backgroundImage: `url(${item["#IMG_POSTER"]})`,
          }}
        />
      </GameUnlockGate>
    ))}
  </div>
</div>
    </div>

  );
}
