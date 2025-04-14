"use client";

import { useCart } from "./CartProvider";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Divider,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useState } from "react";

const Cart = () => {
  const { cart, clearCart } = useCart();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    const itemPrice = item.price || 0;
    const quantity = item.quantity || 1;
    return sum + itemPrice * quantity;
  }, 0);

  const handleClearCart = () => {
    setOpenConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setOpenConfirm(false);
    setShowOrderDetails(false);
  };

  const handleOrderDetails = () => {
    setShowOrderDetails(true);
    setShowCheckout(true);
  };
  const handleCheckout = () => {
    clearCart();
  };

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 500, mx: "auto", p: 2, borderRadius: 2 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
          Your Cart
        </Typography>
        {cart.length > 0 && (
          <Chip
            label={`${cart.length} ${cart.length === 1 ? "item" : "items"}`}
            color="primary"
            size="small"
          />
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {cart.length === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Empty Cart</AlertTitle>
          No items in your cart.
        </Alert>
      ) : (
        <Box>
          <List
            sx={{
              maxHeight: 300,
              overflow: "auto",
              mb: 2,
              "& .MuiListItem-root": {
                bgcolor: "background.paper",
                mb: 1,
                borderRadius: 1,
                boxShadow: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                p: 2,
              },
            }}
          >
            {cart.map((item, index) => (
              <ListItem key={index}>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      {item.name}
                    </Typography>
                    {item.quantity && (
                      <Chip
                        label={`Qty: ${item.quantity}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  {item.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {item.description}
                    </Typography>
                  )}

                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ fontWeight: "medium" }}
                  >
                    ${item.price ? item.price.toFixed(2) : "0.00"}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ mb: 2 }} />

          {/* Checkout Section */}
          <Collapse in={showOrderDetails}>
            <Paper
              variant="outlined"
              sx={{ p: 2, mb: 2, bgcolor: "background.paper" }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                Order Summary
              </Typography>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2">
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Total:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Collapse>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
            {!showOrderDetails && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleOrderDetails}
              >
                See order details
              </Button>
            )}
            {showCheckout && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            )}
          </Box>
        </Box>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Clear Cart</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove all items from your cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button onClick={confirmClearCart} color="error" autoFocus>
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Cart;
