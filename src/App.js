import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home";
import ShipmentList from "./components/ShipmentList";
import logo from "./assets/logo.png";
import search from "./assets/search.png";
import closeBtn from "./assets/closeBtn.svg";
import HamburgerMenu from "./assets/HamburgerMenu.svg";

const ShipmentCard = lazy(() => import("./components/ShipmentCard"));

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const searchHandler = (term) => {
    setSearchTerm(term);
    if (term !== "") {
      const newList = data.filter((item) => {
        return Object.values(item)
          .join(" ")
          .toLocaleLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newList);
    } else setSearchResults(data);
  };

  const getData = () => {
    fetch("/shipments.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (ShipmentJsonData) {
        setData(ShipmentJsonData);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const searchInputStyle = {
    background: `url(${search}) no-repeat`,
    backgroundPosition: "10px 10px",
    paddingLeft: "40px",
  };

  return (
    <Router>
      <div className="container-fluid">
        <div className="row px-4 py-3">
          <div className="col-md-2 d-flex flex-column flex-shrink-0 p-3 text-white">
            <div className="d-flex justify-content-between">
              <Link to={`/`} className="text-white h1">
                <img src={logo} alt="SpaceX logo" width="100%" height="auto" />
              </Link>
              {showMenu ? (
                <img
                  src={closeBtn}
                  alt="close menu"
                  className="d-md-none"
                  onClick={() => setShowMenu(!showMenu)}
                />
              ) : (
                <img
                  src={HamburgerMenu}
                  alt="show menu"
                  className="d-md-none"
                  onClick={() => setShowMenu(!showMenu)}
                />
              )}
            </div>
            {showMenu ? (
              <ShipmentList
                menu={showMenu}
                setMenu={setShowMenu}
                data={searchTerm.length > 1 ? searchResults : data}
              />
            ) : (
              ""
            )}
            <div className="d-none d-md-block">
              <ShipmentList
                data={searchTerm.length > 1 ? searchResults : data}
              />
            </div>
          </div>
          <div
            className={showMenu ? `d-none d-md-block ` : `d-md-block col-md-10`}
          >
            <div className="input_wrapper mt-4">
              <input
                type="text"
                placeholder="Search"
                className="search_input bg-white py-2"
                style={searchInputStyle}
                value={searchTerm}
                onChange={(e) => searchHandler(e.target.value)}
              />
            </div>
            <div className="bg-grey radius-30 mt-4 p-4">
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route
                  path="/:id"
                  element={
                    <Suspense fallback={<>Loading...</>}>
                      <ShipmentCard />
                    </Suspense>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
