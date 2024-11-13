import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import CustomFeedCard from "./CustomFeedCard";
import CustomJokeCard from "./CustomJokeCard";
import { useNavigate } from "react-router-dom";
const MasonryLayout = ({ cardUI,loading,setIsLoading }) => {
const navigate = useNavigate()
  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: 1, // Single column for small screens (like mobile)
          600: 2, // Two columns for larger mobiles/tablets
          1200: 3, // Four columns for larger screens
          1400:4,
        }}
      >
        <Masonry gutter={"1rem"}>
          {" "}
          {cardUI?.map((item, index) => {
            return (
              <div key={index}>
                {item?.feed_type === 1 ? (
                  <CustomFeedCard
                    userName={item?.user_details?.full_name}
                    img={item?.feed_media}
                    caption={item?.caption}
                    reported_count={item?.report_count}
                    profile_picture={item?.profile_img}
                    location={item?.location}
                    loading={loading}
                    setIsLoading={setIsLoading}
                    item_details={item}
                    handleCardClick={()=>navigate("/reportfeed/reportedfeeddetails",{
                      state:{
                        id:item.id
                      }
                    })}
                  />
                ) : item.feed_type === 2 ? (
                  <CustomJokeCard
                    userName={item?.user_details?.full_name}
                    caption={item?.caption}
                    reported_count={item?.report_count}
                    profile_picture={item?.profile_img}
                    location={item?.location}
                    loading={loading}
                    item_details={item}
                    handleCardClick={()=>navigate("/reportlist",{
                      state:{
                        id:item.id
                      }
                    })}
                  />
                ) : null}{" "}
              </div>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default MasonryLayout;
