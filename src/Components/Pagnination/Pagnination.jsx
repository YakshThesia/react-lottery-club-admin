import React from "react";
import { Box, Pagination } from "@mui/material";

const CustomPagination = ({ page, pageSize, handlePageChange, totalCount }) => {
  const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages

  const handleChange = (event, value) => {
    handlePageChange(value - 1); // Adjust for zero-based page indexing
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        sx={{
          "& .MuiPaginationItem-root": {
            "&.Mui-selected": {
              backgroundColor: "#EBA834",
              color: "white",
              border: "1px solid #EBA834",
              "&:hover": {
                backgroundColor: "#EBA834",
                color: "white",
              },
            },
          },
          "& .MuiPaginationItem-page": {
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          },
          "& .MuiPaginationItem-previousNext": {
            color: "#000E72",
            "&.Mui-disabled": {
              color: "#C3D5E5",
            },
          },
        }}
      />
    </Box>
  );
};

export default CustomPagination;
