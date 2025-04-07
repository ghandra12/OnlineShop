import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

const Dashboard = () => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="space-between"
      gap={2} // Optional spacing between cards
    >
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Box>
  );
};

export default Dashboard;
