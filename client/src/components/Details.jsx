import React from "react";

const Detail = ({ album, artists, name }) => {
  return (
    <div className="offset-md-1 col-sm-4">
      <div className="row col-sm-12 px-0 flex flex-col items-center justify-center">
        <img
          src={album.images[0].url}
          alt={name}
          className="w-48 h-48 md:w-64 md:h-64 track border border-gray-300"
        />
        <label htmlFor={name} className="form-label mt-2">
          {name}
        </label>
        <label htmlFor={artists[0].name} className="form-label">
          {artists[0].name}
        </label>
      </div>
    </div>
  );
};

export default Detail;
