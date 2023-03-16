import { Link } from "react-router-dom";
import React, { useState } from "react";
import Note from "./Note";

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const handleclick = () => {
    setOpen(true);
  };
  return (
    <div>
      <Link to="/home">
        <button className="btn-save" onClick={() => handleclick()}>
          New Note
        </button>
      </Link>
      {/* {open ? <Note /> : ""} */}
    </div>
  );
};

export default MainPage;
