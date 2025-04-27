import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filterOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

export default function ProductsFilter(props) {
  return (
    <Autocomplete
      options={filterElements}
      getOptionLabel={(option) => option.name}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      onChange={props.onFilterChange}
      defaultValue={filterElements[0]}
      renderInput={(params) => (
        <TextField {...params} label="Select category" />
      )}
    />
  );
}

const filterElements = [
  { name: "Clothing", value: 0 },
  { name: "Accessories", value: 1 },
  { name: "Home", value: 2 },
];
