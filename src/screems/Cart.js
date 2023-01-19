import React from "react";
import { Usecart, Usedispatchcart } from "../components/Contextreducer";
import trash from "../components/trash.svg";
const Cart = () => {
  let data = Usecart();

  let dispatch = Usedispatchcart();
  if (data.length === 0) {
    return (
      <div className="">
        <div className="m-5 w-100 text-center text-white fs-3">
          cart is empty !!
        </div>
      </div>
    );
  }

  const handlecheakout = async () => {
    let useremail = localStorage.getItem("useremail");
    let responce = await fetch(
      "https://food-server-api.onrender.com/orderdata",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_data: data,
          email: useremail,
          order_date: new Date().toDateString(),
        }),
      }
    );

    if (responce.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  let totalprice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover table-responsive">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quality</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody className="fw-bold">
            {data.map((food, index) => (
              <tr className="text-white" key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>

                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <th>
                  <button type="button" className="btn p-0">
                    {" "}
                    <img
                      className="btn btn-success"
                      src={trash}
                      alt="delete"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {" "}
          <h1 className="fs-2  text-primary"> Total Price :{totalprice}/-</h1>
        </div>
        <button
          className="btn bg-success mt-5 fw-bold fs-4"
          onClick={handlecheakout}
        >
          {" "}
          Check out
        </button>
      </div>
    </div>
  );
};

export default Cart;
