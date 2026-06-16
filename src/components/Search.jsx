import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchItem, setSearchItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (searchItem.trim() === "") {
      setItems([]);
      return;
    }

    axios
      .get(`https://dummyjson.com/products/search?q=${searchItem}`)
      .then((response) => {
        setItems(response.data.products);
      })
      .catch((error) =>
        console.error("Error fetching data:", error)
      );
  }, [searchItem]);

  return (
    <div className="container mt-3">

      <input
        type="text"
        className="form-control"
        placeholder="Search Products..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />

      {items.length > 0 && (
        <div className="row mt-4">
          {items.map((item) => (
            <div
              className="col-md-4 col-lg-3 mb-4"
              key={item.id}
            >
              <div className="card h-100">

                <Link to={`/home/details/${item.id}`}>
                  <img
                    src={item.thumbnail}
                    className="card-img-top"
                    alt={item.title}
                  />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">
                    {item.title}
                  </h5>

                  <p className="text-success">
                    ₹{item.price}
                  </p>

                  {/* <Link
                    to={`/home/details/${item.id}`}
                    className="btn btn-primary w-100"
                  >
                    View Details
                  </Link> */}

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Search;