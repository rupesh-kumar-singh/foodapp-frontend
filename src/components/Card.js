import React, { useState, useRef, useEffect } from "react";
import { Usecart, Usedispatchcart } from "./Contextreducer";
const Card = (props) => {
  const priceref = useRef();
  let data = Usecart();

  let dispatch = Usedispatchcart();
  const priceoption = Object.keys(props.options);
  const foodItem = props.fooditem;
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");

  const handlebar = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });

        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  useEffect(() => {
    setsize(priceref.current.value);
  }, []);
  let finalPrice = qty * parseInt(props.options[size]);

  return (
    <div className="d-flex justify-content-evenly">
      <div className="card mt-3" style={{ width: "18rem", Height: "20rem" }}>
        <img
          src={props.fooditem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "140px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.fooditem.name}</h5>
          <p className="card-text">{props.fooditem.description}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success"
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              ref={priceref}
              className="m-2 h-100  bg-success rounded"
              onChange={(e) => setsize(e.target.value)}
            >
              {priceoption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">{finalPrice}&#8377;</div>
            <hr />
            <button className="btn btn-success fs-6" onClick={handlebar}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
