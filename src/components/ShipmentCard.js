import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShipmentCard = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("/shipments.json")
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData));
  };

  useEffect(() => {
    getData();
  }, []);

  const { id } = useParams();
  const found = data.some((el) => el.id === id);

  return (
    <div id="shipment-card">
      {data
        .filter((item) => item.id === id)
        .map((validItem) => (
          <div key={id} className="details-wrapper">
            <h2 className="text-white title">{validItem.name}</h2>
            <p className="text-grey">{validItem.email}</p>
            <h3 className="text-grey h6 cargo-boxes mb-2">CARGO BOXES</h3>
            <p className="bg-white rounded d-inline px-4">{validItem.boxes}</p>
            <div className="cargo-bays-wrapper">
              <h3 className="text-grey mt-4">Number of required cargo bays</h3>
              <p className="cargo-bays-nr h2 text-white">
                {validItem.numberOfBays}
              </p>
            </div>
          </div>
        ))}
      {!found && <h2 className="text-white">Unable to process.</h2>}
    </div>
  );
};

export default ShipmentCard;
