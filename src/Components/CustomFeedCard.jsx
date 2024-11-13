import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import Profile from "../Assets/profile1.jpg";
import FeedSwiper from "./FeedSwiper";
import { BounceLoader } from "react-spinners";
const CustomFeedCard = ({
  userName,
  caption,
  reported_count,
  profile_picture,
  location,
  img,
  loading,
  setIsLoading,
  item_details,
  handleCardClick
}) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
          cursor:'pointer'
        }}
        onClick={() => handleCardClick(item_details.id)}
      >
        <Box
          sx={{
            width: "100%",
            p: 1,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
          }}
        >
          <Box
            sx={{
              width: { xs: "40px", md: "60px" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={profile_picture || Profile}
              alt=""
              style={{ width: "100%", borderRadius: "50%" }}
            />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "18px", md: "22px" },
                fontWeight: "500",
                lineHeight: "20px",
              }}
            >
              {userName}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "16px", md: "18px" }, fontWeight: "300" }}
            >
              {location || "Boston, Russia"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <FeedSwiper img={img} loading={loading} setIsLoading={setIsLoading} />
        </Box>
        <Box sx={{ width: "100%", px: 1,pt:1 }}>
          <Typography sx={{ fontSize: { xs: "14px", md: "16px" } }}>
            {caption}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", py: 2, px: 1 }}>
          <Typography
            sx={{ fontSize: { xs: "18px", md: "18px" }, fontWeight: "500" }}
          >
            Reported Count : {reported_count}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CustomFeedCard;
