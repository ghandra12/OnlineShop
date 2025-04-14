import { Box, Grid, Modal, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import ProductsFilter from "./ProductsFilter";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "./CartProvider"; // 🆕

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(0);
  const [openCart, setOpenCart] = useState(false);
  const { cart, addToCart } = useCart(); // 🆕

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

  const handleBuy = (product) => {
    addToCart(product); // 🆕 use context method
  };

  return (
    <Box>
      <ProductsFilter onFilterChange={onFilterChange} />
      <Box marginBottom={4} />

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={4} md={4} key={product.id}>
            <ProductCard product={product} onBuy={handleBuy} />
          </Grid>
        ))}
      </Grid>

      <Modal open={openCart} onClose={() => setOpenCart(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Your Cart</Typography>
          {cart.length === 0 ? (
            <Typography>No items in cart.</Typography>
          ) : (
            cart.map((item, index) => (
              <Box key={index} my={1}>
                <Typography>{item.name}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Dashboard;
