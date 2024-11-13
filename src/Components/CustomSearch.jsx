import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from "@mui/material";

const CustomSearchBox = (props) => {
  const { placeholder, onChange, onClear, value } = props;
  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
    }}>
      <input
        autoComplete="off"
        type="text"
        name="focus"
        maxLength="200"
        style={{
          padding: '15px 45px 15px 45px',
          border:'none',
          background:
            "#F6F6F6",
          borderRadius: '15px',
          width: '100%',
          fontSize: '16px',
          fontWeight: '400',
          color: '#000',
          outline: 'none',
        }}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {value && value !== "" && (
        <CloseIcon
          sx={{
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '100%',
            fontSize: '22px',
            position: 'absolute',
          }}
          onClick={() => {
            onClear && onClear();
          }}
        />
      )}
      <SearchIcon
        sx={{
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '100%',
          fontSize: '28px',
          color: '#737373',
          position: 'absolute',
        }}
      />
      {props.children}
    </Box>
  );
};

export default CustomSearchBox;
