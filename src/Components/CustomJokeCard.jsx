import { Box, Typography } from "@mui/material";
import React from "react";
import Profile from "../Assets/profile1.jpg";
const CustomJokeCard = ({
  userName,
  caption,
  reported_count,
  profile_picture,
  location,
}) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: 1.5,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: {xs:"40px",md:"60px"},
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={profile_picture}
              alt=""
              style={{ width: "100%", borderRadius: "50%" }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontSize:  {xs:"18px",md:"22px"}, fontWeight: "500", lineHeight: "20px" }}
            >
              {userName}
            </Typography>
            <Typography sx={{ fontSize:{xs:"16px",md:"18px"}, fontWeight: "300" }}>
              {location}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", px: 1 }}>
          <Typography sx={{ fontSize: {xs:"14px",md:"16px"} }}>{caption}</Typography>
        </Box>
        <Box sx={{ width: "100%", px: 1, pb: 2 }}>
          <Typography sx={{ fontSize:{xs:"18px",md:"22px"}, fontWeight: "500" }}>
            Reported Count :{reported_count}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CustomJokeCard;
