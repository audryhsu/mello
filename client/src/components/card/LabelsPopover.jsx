import React from "react";
import LabelsPopoverLabel from "./LabelsPopoverLabel";

const colors = ["green", "yellow", "orange", "blue", "purple", "red"]

const LabelsPopover = ({setPopover, labels}) => {

  const handleClose = (e) => {
    e.preventDefault();
    setPopover({type: "labels", attachedTo: e.target, visible: false });
  }

  return (
      <div id="add-options-labels-dropdown">
        <header>
          <span>Labels</span>
          <a href="#" className="icon-sm icon-close" onClick={handleClose}></a>
        </header>
        <div className="content">
          <input
            className="dropdown-input"
            placeholder="Search labels..."
            type="text"
          />
          <div className="labels-search-results">
            <ul className="label-list">
              {colors.map((color, ind) => <LabelsPopoverLabel key={ind} index={ind} color={color} labels={labels}/>)}
            </ul>
            <ul className="light-list">
              <li className="not-implemented">Create a new label</li>
              <hr />
              <li className="toggleColorblind">
                Enable color blind friendly mode.
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default LabelsPopover;
