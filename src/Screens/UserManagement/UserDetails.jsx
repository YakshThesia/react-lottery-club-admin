import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { db } from "../../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
const UserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rechargeData, setRechargeData] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "recharge"));
      const querySnapshot = await getDocs(q);
      const rechargeItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const selectedUser = location?.state?.id;
      const userRechargeItems = rechargeItems.filter(
        (item) => item.userId === selectedUser
      );
      setRechargeData(userRechargeItems);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching recharge data: ", error);
    }
  };

  const getWithdrawHistory = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "withdrawals"));
      const querySnapshot = await getDocs(q);
      const rechargeItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const selectedUser = location?.state?.id;
      const userRechargeItems = rechargeItems.filter(
        (item) => item.userId === selectedUser
      );
      setWithdrawData(userRechargeItems);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching recharge data: ", error);
    }
  };
  useEffect(() => {
    getData();
    getWithdrawHistory();
  }, []);
  return (
    <>
      <Box sx={{ width: "100%", height: "100vh" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "20px",
            bgcolor: "#EBA834",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon sx={{ color: "white", fontSize: "30px" }} />
          </IconButton>
          <Typography sx={{ color: "white", fontSize: "22px" }}>
            User Details
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            p: 2,
            height: "calc(100vh - 50px)",
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            justifyContent: "space-evenly",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "15px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "500",color:"#EBA834" }}>
                Recharge History
              </Typography>
            </Box>
            {loading ? (
              <Box
                sx={{
                  width: "100%",
                  height: "calc(100vh - 150px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress sx={{ color: "#EBA834" }} />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  p: 1,
                  height: "calc(100vh - 147px)",
                  overflow: "scroll",
                }}
              >
                {rechargeData
                  ?.sort((x, y) => {
                    return y?.createdAt?.seconds - x?.createdAt?.seconds;
                  })
                  ?.map((item, index) => {
                    const formattedDate =
                      item?.createdAt &&
                      moment(item?.createdAt.toDate()).isValid()
                        ? moment(item?.createdAt.toDate()).format(
                            "DD-MM-YYYY, h:mm A"
                          )
                        : "Invalid Date"; // fallback text for invalid date

                    return (
                      <Box
                        key={index}
                        sx={{
                          width: "100%",
                          p: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          borderRadius: "12px",
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography sx={{ color: "black", fontWeight: "600" }}>
                            {item?.name}
                          </Typography>
                          <Typography sx={{ color: "green" }}>
                            + ₹ {item?.amount}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ color: "black", fontSize: "14px", fontWeight: "600" }}>
                            {formattedDate}
                          </Typography>
                          <Typography sx={{ color: "black", fontSize: "14px", fontWeight: "600" }}>
                            {item?.status}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "15px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "500",color:"#EBA834" }}>
                Withdraw History
              </Typography>
            </Box>
            {loading ? (
              <Box
                sx={{
                  width: "100%",
                  height: "calc(100vh - 150px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress sx={{ color: "#EBA834" }} />
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  p: 1,
                  height: "calc(100vh - 147px)",
                  overflow: "scroll",
                }}
              >
                {withdrawData
                  ?.sort((x, y) => {
                    return y?.createdAt?.seconds - x?.createdAt?.seconds;
                  })
                  ?.map((item, index) => {
                    const formattedDate =
                      item?.createdAt &&
                      moment(item?.createdAt.toDate()).isValid()
                        ? moment(item?.createdAt.toDate()).format(
                            "DD-MM-YYYY, h:mm A"
                          )
                        : "Invalid Date"; // fallback text for invalid date

                    return (
                      <Box
                        key={index}
                        sx={{
                          width: "100%",
                          p: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                          borderRadius: "12px",
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            sx={{ color: "black", fontWeight: "600" }}
                          >
                            {item?.bankDetails?.accountHolderName}
                          </Typography>
                          <Typography sx={{ color: "red" }}>
                            - ₹ {item?.amount}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography>To :</Typography>
                          <Box sx={{ width: "100%" }}>
                            <Typography sx={{ fontWeight: "600" }}>
                              Bank Name : {item?.bankDetails?.bankName}
                            </Typography>
                            <Typography sx={{ fontWeight: "600" }}>
                              Acc. No : {item?.bankDetails?.accountNumber}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            {formattedDate}
                          </Typography>
                          <Typography
                            sx={{
                              color: "black",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            {item?.status}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              borderRadius: "15px",
            }}
          ></Box>
        </Box>
      </Box>
    </>
  );
};

export default UserDetails;
