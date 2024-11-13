import { Button, CircularProgress } from "@mui/material";
import React from "react";

const CustomLoader = (props) => {
    const {type,onSubmit,btnTitle,loading, sx={},disabled} = props
  return (
    <>
      <Button
        sx={{
          width: "100%",
          borderRadius: "15px",
          background: "#668B4B",
          padding: "8px 12px",
          fontWeight: "500",
          fontSize: "18px",
          color: "white",
          textTransform: "capitalize",
          "&:hover": {
            background: "#668B4B",
            color: "white",
          },
          ...sx
        }}
        disabled={disabled}
        type={type}
        onClick={onSubmit}
      >
        {loading ? (
          <CircularProgress
            size={32}
            sx={{
              color: "#fff",
            }}
          />
        ) : (
          btnTitle
        )}
      </Button>
    </>
  );
};

export default CustomLoader;
