import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";

const CustomDropDown = (props) => {
  const {
    value,
    onChange,
    NoData,
    menuList,
    title,
    sx = {},
    titlesx = {},
  } = props;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Typography sx={{ fontWeight: "500", ...titlesx }}>{title}</Typography>
        <Select
          sx={{
            width: "100%",
            height: "50px",
            border: "none",
            background: "#ffffff",
            borderRadius: "12px",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:hover": {
              outline: "none",
            },
            ".MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            ...sx,
          }}
          MenuProps={{
            PaperProps: {
              style: {
                marginTop: "0.5rem",
                borderRadius: "12px",
              },
            },
          }}
          value={value}
          onChange={onChange}
          displayEmpty
        >
          {menuList ? (
            menuList.map((elem, index) => (
              <MenuItem key={index} value={elem.id}>
                {elem.name || elem.category_name}
              </MenuItem>
            ))
          ) : (
            <Typography>{NoData}</Typography>
          )}
        </Select>
      </Box>
    </>
  );
};

export default CustomDropDown;
