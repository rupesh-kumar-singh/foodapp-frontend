import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const [search, setsearch] = useState("");

  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);

  const loadfooditem = async () => {
    let responce = await fetch(
      "https://food-server-api.onrender.com/fooddata",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await responce.json();
    console.log(data);
    setfooditem(data);
  };
  const loadfoodcat = async () => {
    let responce = await fetch(
      "https://food-server-api.onrender.com/foodcart",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await responce.json();
    setfoodcat(data);
    console.log(data);
  };

  useEffect(() => {
    loadfooditem();
  }, []);
  useEffect(() => {
    loadfoodcat();
  }, []);

  console.log(foodcat);
  console.log(fooditem);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <div className="carousel-caption" style={{ zIndex: "100" }}>
            <div className="d-flex justify-content-center">
              <input
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                }}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </div>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" id="caro">
          <div className="carousel-item active">
            <img
              style={{ filter: "brightness(70%)" }}
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              style={{ filter: "brightness(70%)" }}
              src="https://media.istockphoto.com/id/1292635321/photo/veg-steam-momo-nepalese-traditional-dish-momo-stuffed-with-vegetables-and-then-cooked-and.jpg?s=612x612&w=0&k=20&c=NyxQvDnBq7Ki09Zi21JEMxpuZ_uVr45ZBSavqXJ2T1s="
              className="d-block w-100 h-50"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              style={{ filter: "brightness(70%)" }}
              src="https://media.istockphoto.com/id/520490716/photo/seafood-on-ice.jpg?s=612x612&w=0&k=20&c=snyxGY26viNQ6BWqW-ez4U7tAO65Z_tmAFPMobiZ9Q4="
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {foodcat !== []
          ? foodcat.map((data) => {
              return (
                <div className="row mb-3" key={data._id}>
                  <div className="fs-2 m-3">{data.CategoryName}</div>
                  <hr />
                  {fooditem !== [] ? (
                    fooditem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filteritem) => {
                        return (
                          <div
                            key={filteritem._id}
                            className="col-11 col-md-5 col-lg-4 col-xl-3"
                          >
                            <Card
                              fooditem={filteritem}
                              options={filteritem.options[0]}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>no</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
