import { Link } from "react-router-dom";
import React, { useState } from "react";

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
    </div>
  );
};

export default MainPage;
