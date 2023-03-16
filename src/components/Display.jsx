import React from "react";

const Display = (props) => {
  return (
    <div>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleCloseDis}>
            x
          </span>
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default Display;
