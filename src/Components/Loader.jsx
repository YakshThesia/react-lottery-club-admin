import { Box } from "@mui/material";
import React from "react";

const Loader = ({sx={}}) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display:'flex',
          justifyContent:"center",
          alignItems:'center',
          ...sx,
        }}
      >
        <div class="spinner"></div>
      </Box>
    </>
  );
};

export default Loader;
