import React from "react";

const Listbox = (props) => {
  const clicked = (e) => {
    e.preventDefault();
    props.clicked(e.target.id);
  };

  return (
    <div className="col-span-6 px-0">
      <ul className="list-group">
        {props.items.map((item, idx) => (
          <li key={idx} className="hover:bg-gray-100">
            <button
              onClick={clicked}
              className="list-group-item list-group-item-action list-group-item-light"
              id={item.track.id}
            >
              {item.track.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listbox;
