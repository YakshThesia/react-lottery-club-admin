import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { EffectCreative, Pagination, Navigation } from "swiper/modules";
import Profile from "../Assets/profile1.jpg";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause, ArrowBack, ArrowForward } from "@mui/icons-material";

export default function FeedSwiper({ media }) {
  const videoRef = useRef(null); // Reference for the video element
  const [isPlaying, setIsPlaying] = useState(false); // State to track video play/pause status

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying); // Toggle play/pause state
    }
  };

  return (
    <>
      <Swiper
        grabCursor={true}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        navigation={{
          prevEl: ".custom-prev", // Class for custom previous button
          nextEl: ".custom-next", // Class for custom next button
        }}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            origin: "left center",
            translate: ["-5%", 0, -200],
            rotate: [0, 100, 0],
          },
          next: {
            origin: "right center",
            translate: ["5%", 0, -200],
            rotate: [0, -100, 0],
          },
        }}
        modules={[EffectCreative, Pagination, Navigation]}
        className="mySwiper6"
      >
        {media.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              {item?.media_type === 1 ? (
                <img
                  src={`https://api.superkidz.online${item.thumb}` || Profile}
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    height: "100%",
                  }}
                />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    style={{
                      width: "100%",
                      objectFit: "contain",
                      height: "100%",
                    }}
                    src={
                      `https://api.superkidz.online${item.media}` || Profile
                    }
                  ></video>
                  <IconButton
                    onClick={handlePlayPause}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 99999,
                      background: "rgba(0, 0, 0, 0.5)",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    {isPlaying ? (
                      <Pause fontSize="large" />
                    ) : (
                      <PlayArrow fontSize="large" />
                    )}
                  </IconButton>
                </>
              )}
            </SwiperSlide>
          );
        })}
         {/* <div className="custom-navigation">
        <IconButton className="custom-prev" style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1000 }}>
          <ArrowBack style={{ color: 'black', fontSize: '50px' }} />
        </IconButton>
        <IconButton className="custom-next" style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1000 }}>
          <ArrowForward style={{ color: 'black', fontSize: '50px' }} />
        </IconButton>
      </div> */}
      </Swiper>

      {/* Custom Navigation Buttons */}
     

      {/* Custom Pagination */}
      <div
        className="custom-pagination"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      ></div>
    </>
  );
}
