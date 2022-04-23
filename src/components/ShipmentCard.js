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
  const selectedDataItem = data.filter((item) => item.id === id);

  return (
    <div id="shipment-card">
      {selectedDataItem.map((item) => {
        const { boxes, name, email } = item;
        const boxesToInt = boxes.split(",").map((n) => Number(n));
        const reducer = (accumulator, curr) => accumulator + curr;
        const numberOfBays = Math.round(boxesToInt.reduce(reducer) / 10);
        return (
          <div key={id} className="details-wrapper">
            <h2 className="text-white title">{name}</h2>
            <p className="text-grey">{email}</p>
            <h3 className="text-grey h6 cargo-boxes mb-2">CARGO BOXES</h3>
            <p className="bg-white rounded d-inline px-4">{boxes}</p>
            <div className="cargo-bays-wrapper">
              <h3 className="text-grey mt-4">Number of required cargo bays</h3>
              <p className="cargo-bays-nr h2 text-white">{numberOfBays}</p>
            </div>
          </div>
        );
      })}
      {!found && (
        <h2 className="text-white">
          No such cargo in data / unable to process.
        </h2>
      )}
    </div>
  );
};

export default ShipmentCard;
