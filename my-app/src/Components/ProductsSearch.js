import {
  TextField,
  InputAdornment,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const ProductsSearch = ({ searchInput, setSearchInput, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSelectSuggestion = (value) => {
    setSearchInput(value); // trigger debounced search again
    setShowSuggestions(false);
  };

  return (
    <div style={{ position: "relative", maxWidth: 400, marginBottom: 20 }}>
      <TextField
        fullWidth
        label="Search products"
        variant="outlined"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {showSuggestions && suggestions.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          <List>
            {suggestions.map((item, idx) => (
              <ListItem
                button
                key={idx}
                onClick={() => handleSelectSuggestion(item.name)}
              >
                {item.name}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default ProductsSearch;
