import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import "./App.scss";

function App() {
  const [textarea, setTextArea] = useState("");

  return (
    <div className="App">
      <h1>GroupMania Team Connect</h1>
      <div className="searchbar">
        <form action="">
          <CiCirclePlus size={24} className="searchIcon" type="submit" />
          <div className="inputs">
            <input type="file" name="" id="" accept="image/*" />
            <textarea
              name=""
              id=""
              placeholder="Share Today"
              onChange={(e) => setTextArea(e.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
