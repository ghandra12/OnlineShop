"use client";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const ProductInitialsPlaceholder = ({ title }) => {
  const [bgColor, setBgColor] = useState("#1976d2");

  const initials = title
    ? title
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "??";

  // Generate a consistent color based on the product title
  useEffect(() => {
    const generateColor = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      // Use a set of pleasing colors with good contrast for text
      const colors = [
        "#f44336", // red
        "#e91e63", // pink
        "#9c27b0", // purple
        "#673ab7", // deep purple
        "#3f51b5", // indigo
        "#2196f3", // blue
        "#03a9f4", // light blue
        "#00bcd4", // cyan
        "#009688", // teal
        "#4caf50", // green
        "#8bc34a", // light green
        "#ff9800", // orange
      ];

      // Use the hash to pick a color
      const index = Math.abs(hash) % colors.length;
      return colors[index];
    };

    if (title) {
      setBgColor(generateColor(title));
    }
  }, [title]);

  return (
    <Box
      sx={{
        height: 140,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bgColor,
        color: "white",
      }}
    >
      <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
        {initials}
      </Typography>
    </Box>
  );
};

export default function ProductCard(props) {
  const formattedPrice = props.product.price
    ? props.product.price.toFixed(2)
    : "0.00";

  return (
    <Card sx={{ minWidth: 300, position: "relative" }}>
      <Chip
        icon={<AttachMoneyIcon />}
        label={formattedPrice}
        color="secondary"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
          fontWeight: "bold",
          fontSize: "1rem",
          boxShadow: 2,
        }}
      />

      <CardActionArea>
        <ProductInitialsPlaceholder title={props.product.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            {props.product.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
              }}
            >
              ${formattedPrice}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          color="primary"
          variant="contained"
          endIcon={<ShoppingCartIcon />}
          onClick={() => props.onBuy(props.product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
