import React from "react";

import "src/components/FullPageLoader/FullPageLoader.css";

const FullPageLoader = () => {
  return (
    <div>
      <div className="loader-container">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="loader-text">Loading</div>
      </div>
    </div>
  );
};

export default FullPageLoader;
