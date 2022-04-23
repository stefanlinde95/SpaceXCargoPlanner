import React from "react";
import { NavLink } from "react-router-dom";

const ShipmentList = ({ data, menu, setMenu }) => {
  return (
    <header className="shipment_list_nav">
      <h2 className="lato">Shipment list</h2>
      <ul>
        {data.map((item) => {
          const { id, name } = item;
          return (
            <li key={id}>
              <NavLink
                to={`/${id}`}
                state={item}
                activeclassname="active"
                className="d-block py-2"
                onClick={() => setMenu(!menu)}
              >
                {name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

export default ShipmentList;
