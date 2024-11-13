import React, { useState } from "react";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const CustomTextField = ({
  label,
  type,
  placeholder,
  name,
  value,
  onBlur,
  onKeyUp,
  errors,
  onChange,
  isLoading,
  rows,
  multiline,
  min,
  inputMode,
  pattern,
  onKeyDown,
  max,
  sx={}
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          color: "black",
          fontWeight: "400",
          textAlign: "left",
          fontSize: { xs: "14px", sm: "16px" },
          fontFamily: "Sarabun",
        }}
      >
        {label}
      </Typography>
      {isLoading ? (
        <Skeleton height={60} />
      ) : (
        <TextField
          sx={{
            width: "100%",
            mt: "10px",
            "& .MuiOutlinedInput-notchedOutline ": {
              outline: "none",
              border: "none",
            },
            "& .MuiInputBase-root": {
              borderRadius: "12px",
              border: "2.5px solid #E6EBF2",
              background: "transparent",
              height: "60px",
              fontSize: "18px",
            },
            ...sx,
          }}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          onKeyUp={onKeyUp}
          multiline={multiline}
          rows={rows}
          onKeyDown={onKeyDown}
          inputMode={inputMode}
          min={min}
          pattern={pattern}
          InputProps={{
            maxLength: max,
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#E6EBF2" }} />
                    ) : (
                      <Visibility sx={{ color: "#E6EBF2" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      )}
      {errors ? (
        <Typography
          sx={{
            color: "red",
            fontWeight: "400",
            fontSize: { xs: "14px", sm: "14px" },
            marginTop: "5px",
          }}
        >
          {errors}
        </Typography>
      ) : null}
    </Box>
  );
};

export default CustomTextField;
