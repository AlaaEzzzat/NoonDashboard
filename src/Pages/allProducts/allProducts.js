import React from "react";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../myFirebase/productFirebase";
import { deleteProduct } from "./../../myFirebase/productFirebase";
import "./allProducts.css";
export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((p) => {
      setProducts(p);
    });
  }, []);

  const deletePrpd = (pId, pT) => {
    alert(`${pT} wil be deleted !`);
    deleteProduct(pId).then(() => {
      getAllProducts().then((p) => {
        setProducts(p);
      });
    });
  };

  return (
    <>
      <div className="row m-auto mt-3 mb-2 gy-3 ">
        {products.map((product) => {
          return (
            <div
              className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
              hidden={product.stock <= 0}
            >
              <div
                className="card rounded-3 mb-2 border-0 position-relative"
                style={{
                  width: "100%",
                  overflow: "hidden",
                  boxShadow: "0 0 5px yellow",
                }}
              >
                <img
                  src={product.thumbnail}
                  style={{
                    width: "fit-content",
                    maxWidth: "100%",
                    margin: "auto",
                    height: "200px",
                    objectFit: "fill",
                  }}
                  alt="..."
                />

                <div className="card-body text-center">
                  <p className="card-title my-3 ">{product.title}</p>
                  <h5 className="card-text ">
                    {" "}
                    <span>EGP</span> {product.price}.00
                  </h5>

                  <div className="d-flex justify-content-between ">
                    <p className="yellow-badge ps-1">express</p>
                    <p
                      style={{ fontSize: "12px" }}
                      class="text-warning  fw-bold"
                    >
                      {" "}
                      <i class="bi bi-star-fill text-warning "></i>
                      {product.rating}
                    </p>
                  </div>

                  <div className="d-flex justify-content-center pb-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePrpd(product.id, product.title)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
