import { Box, Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import ProductsFilter from "./ProductsFilter";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://localhost:7149/Product?category=${filter}`,
    })
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [filter]);

  const onFilterChange = (event, newValue) => {
    if (newValue) {
      setFilter(newValue.value);
    }
  };
  return (
    <Box>
      <ProductsFilter onFilterChange={onFilterChange} />
      <Box marginBottom={4} />
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={4} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
