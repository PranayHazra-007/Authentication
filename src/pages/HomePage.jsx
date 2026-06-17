import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import ProductCard from "../components/ProductCard";
import {getProducts,getProductsByCategory,searchProducts} from "../services/api"

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getProducts().then((res) => {
      setProducts(res.data.products);
    })
      .catch((err) => console.log(err));
  };

  const handleCategoryChange = (category) => {
    if (category === "") {
      fetchProducts();
    } else {
      getProductsByCategory(category).then((res) => {
        setProducts(res.data.products);
      })
        .catch((err) => console.log(err));
    }
  };

  const handleSearch = (searchText) => {
    if (searchText.trim() === "") {
      fetchProducts();
    } else {
      searchProducts(searchText).then((res) => {
        setProducts(res.data.products);
      })
        .catch((err) => console.log(err));
    }
  };

  // return (
  //   <>
  //     <Navbar />

  //     <div className="container mt-4">
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <Search onSearch={handleSearch} />

        <CategoryFilter
          onCategoryChange={handleCategoryChange}
        />

        <div className="row mt-4">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
            />
          ))}
        </div>

      </div>
    </>
  );
};

export default HomePage;