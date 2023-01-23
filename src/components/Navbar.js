import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import Modal from "../Modal";
import Cart from "../screems/Cart";
import { Usecart } from "./Contextreducer";
const Navbars = () => {
  const [cartview, setcartview] = useState(false);
  let data = Usecart();
  const navigate = useNavigate();

  const handle = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar fs-4 navbar-expand-lg navbar-light bg-success">
        <div className="container-fluid">
          <span className="navbar-brand fs-4">Gofood</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fs-5 text-white m-2 fw-bolder "
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authtoken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link fs-4 text-white m-2 fw-bolder "
                    to="/myorder"
                  >
                    my order
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authtoken") ? (
              <div className="d-flex">
                <Link
                  className="nav-link m-3 fs-4 bg-white text-success rounded"
                  to="/login"
                >
                  login
                </Link>

                <Link
                  className="nav-link m-3 bg-white text-success rounded"
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <div className="nav-link  m-2 text-success rounded  ">
                  <div
                    variant="light"
                    className="fs-4 btn bg-white "
                    onClick={() => {
                      setcartview(true);
                    }}
                  >
                    My Cart <Badge bg="danger">{data.length}</Badge>
                  </div>
                </div>
                {cartview ? (
                  <Modal
                    onClose={() => {
                      setcartview(false);
                    }}
                  >
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="nav-link  m-2   text-danger rounded  "
                  onClick={handle}
                >
                  <Button variant="light" className="fs-4 text-danger">
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbars;
