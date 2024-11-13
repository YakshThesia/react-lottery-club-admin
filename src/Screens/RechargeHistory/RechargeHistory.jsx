import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopTitle from "../../Components/TopTitle";
import TableContainer from "../../Components/TableContainer";
import { toast } from "react-toastify";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import moment from "moment/moment";

const RechargeHistory = () => {
  const pageSize = 30;
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handlePageChange = (newValue) => {
    setPage(newValue);
  };

  const columns = [
    {
      field: "rowid",
      headerName: "Sr.No",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200,
      headerClassName: "leftAlignHeader",
      headerAlign: "center",
      cellClassName: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      headerClassName: "leftAlignHeader",
      headerAlign: "center",
      cellClassName: "center",
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      minWidth: 200,
      headerClassName: "leftAlignHeader",
      headerAlign: "center",
      cellClassName: "center",
      renderCell: (cell) => {
        return (
          <Box>
            {cell?.value && moment(cell?.value.toDate()).isValid()
              ? moment(cell?.value.toDate()).format("DD-MM-YYYY")
              : "Invalid Date"}
          </Box>
        );
      },
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      minWidth: 200,
      headerClassName: "leftAlignHeader",
      headerAlign: "center",
      cellClassName: "center",
      renderCell: (cell) => {
        return (
          <Box>
            {cell?.row?.createdAt &&
            moment(cell?.row?.createdAt.toDate()).isValid()
              ? moment(cell?.row?.createdAt.toDate()).format("h:mm A")
              : "Invalid Time"}
          </Box>
        );
      },
    },
    {
      field: "amount",
      headerName: "Account Balance",
      flex: 1,
      minWidth: 200,
      headerClassName: "leftAlignHeader",
      headerAlign: "center",
      cellClassName: "center",
      renderCell: (cell) => `₹ ${cell?.value}` ?? "-",
    },
  ];

  useEffect(() => {
    getUserList();
  }, [page, startDate, endDate]);

  const getUserList = async () => {
    try {
      let q = query(collection(db, "recharge"));

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        q = query(
          collection(db, "recharge"),
          where("createdAt", ">=", start),
          where("createdAt", "<=", end)
        );
      }

      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const formattedUsers = usersData
        .filter((user) => user?.role !== 2)
        .map((user, index) => ({
          rowid: index + 1 + page * pageSize,
          ...user,
        }));

      setUserList(formattedUsers);
      setTotalCount(usersData.length);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching recharge history");
      setLoading(false);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        px: 2,
        height: "100vh",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <TopTitle title={"Recharge History"} />
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <input
            type="date"
            required
            id="startdate"
            name="startdate"
            inputMode="numeric"
            placeholder="Start Date"
            // pattern="/d{2}-/d{2}-/d{4}"
            value={startDate}
            onChange={(value) => setStartDate(value?.target?.value)}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "12px",
              border: "1px solid #1A130C3D",
              backgroundColor: "transparent",
              color: "#000",
              margin: "0",
              outline: "none",
            }}
          />
          <input
            type="date"
            required
            id="enddate"
            name="enddate"
            inputMode="numeric"
            placeholder="End Date"
            // pattern="/d{2}-/d{2}-/d{4}"
            value={endDate}
            onChange={(value) => setEndDate(value?.target?.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "12px",
              border: "1px solid #1A130C3D",
              backgroundColor: "transparent",
              color: "#000",
              margin: "0",
              outline: "none",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ py: 2.4 }}>
        <Box sx={{ mt: 3 }}>
          <TableContainer
            sx={{ height: { xs: "300px", md: "350px", xl: "550px" } }}
            rows={userList}
            columns={columns}
            pageSize={pageSize}
            loading={isLoading}
            hideFooter={true}
            page={page}
            totalCount={totalCount}
            handlePageChange={handlePageChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RechargeHistory;
