import { Box, Grid, Modal, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import ProductsFilter from "./ProductsFilter";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useCart } from "./CartProvider";
import ProductsSearch from "./ProductsSearch";
import { debounce } from "lodash";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const url = `https://localhost:7149/Product?filter=${filter}&search=${searchInput}`;
    axios
      .get(url)
      .then((resp) => {
        setProducts(resp.data);
      })
      .catch((error) => {
        console.error("Error fetching filtered products:", error);
      });
  }, [filter, searchInput]);

  // debounce the setSearchInput + fetch suggestions
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchInput(value);

      if (value.trim() === "") {
        setSuggestions([]);
        return;
      }

      axios
        .get(
          `https://localhost:7149/Product/Suggestions?search=${value}&filter=${filter}`
        )
        .then((res) => setSuggestions(res.data))
        .catch((err) => console.error("Error fetching suggestions", err));
    }, 300),
    []
  );

  const onSetSearch = (value) => {
    debouncedSearch(value);
  };

  const onFilterChange = (event, newValue) => {
    if (newValue) {
      setFilter(newValue.value);
    }
  };

  const handleBuy = (product) => {
    addToCart(product);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProductsFilter onFilterChange={onFilterChange} />
        </Grid>
        <Grid item xs={12}>
          <ProductsSearch
            setSearchInput={onSetSearch}
            searchInput={searchInput}
            suggestions={suggestions}
          />
        </Grid>
      </Grid>

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
