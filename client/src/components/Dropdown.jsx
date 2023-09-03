import React from "react";

const Dropdown = (props) => {
  const dropdownChanged = (e) => {
    props.changed(e.target.value);
  };

  return (
    <div className="col-sm-6 form-group row px-0">
      <label className="form-label col-sm-2 text-white mr-2">
        {props.label}
      </label>
      <select
        value={props.selectedValue}
        onChange={dropdownChanged}
        className="form-control form-control-sm col-sm-10 bg-blue-600 text-white rounded-md shadow-md py-1 px-2"
      >
        <option key={0} className="bg-blue-600 text-white">
          Select...
        </option>
        {props.options.map((item, idx) => (
          <option
            key={idx + 1}
            value={item.id}
            className="bg-blue-600 text-white"
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
