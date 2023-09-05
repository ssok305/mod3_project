import React from "react";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="loading">
      <ReactLoading type="bubbles" color="#000000" height="100" width="100" />
    </div>
  );
}

export default Loading;
