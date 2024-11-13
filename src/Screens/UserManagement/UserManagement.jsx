import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import TopTitle from "../../Components/TopTitle";
import TableContainer from "../../Components/TableContainer";
import { toast } from "react-toastify";
import CustomSearchBox from "../../Components/CustomSearch";
import useDebounce from "../../Components/useDebounce";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import CustomAction from "../../Components/CustomAction";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate();
  const pageSize = 30;
  const [page, setPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const debouncedSearch = useDebounce(searchUser, 500);

  const handlePageChange = (newPage) => setPage(newPage);

  const columns = [
    {
      field: "rowid",
      headerName: "Sr.No",
      width: 100,
      align: "center",
      align: "center",
      headerAlign: "center",
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
      field: "refCode",
      headerName: "Refer Code",
      flex: 1,
      minWidth: 200,
      headerClassName: "leftAlignHeader",
      headerAlign: "center",
      cellClassName: "center",
    },
    {
      field: "referredBy",
      headerName: "Referred By",
      flex: 1,
      minWidth: 200,
      headerClassName: "leftAlignHeader",
      headerAlign: "center",
      cellClassName: "center",
      renderCell: (cell) => cell?.value ?? "--",
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
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { id } = params?.row;

        return (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {}
            <CustomAction
              showView={true}
              isView={() =>
                navigate("/user-management/user-details", {
                  state: {
                    id: id,
                  },
                })
              }
            />
          </Box>
        );
      },
    },
  ];

  // Effect to fetch users on search or page change
  useEffect(() => {
    if (page > 0 && debouncedSearch) {
      setPage(0); // Reset to first page on new search
    } else {
      getUserList();
    }
  }, [debouncedSearch, page]);

  const getUserList = async () => {
    try {
      setIsLoading(true);
      const userCollection = collection(db, "users");
      let q = query(userCollection, orderBy("email"), limit(pageSize));

      if (debouncedSearch) {
        q = query(
          userCollection,
          orderBy("email"),
          limit(pageSize),
          startAfter(page * pageSize)
        );
      }

      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter based on case-insensitive email match
      const filteredUsers = usersData
        .filter((user) => user?.role !== 2)
        .filter((user) => {
          const searchLower = debouncedSearch.toLowerCase();
          return user?.email?.toLowerCase().includes(searchLower);
        })
        .map((user, index) => ({
          rowid: index + 1 + page * pageSize,
          ...user,
        }));

      setUserList(filteredUsers);
      setTotalCount(usersData.length); // Update total count
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching data");
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", py: 2, px: 2, height: "100vh" }}>
      <TopTitle title="User Management" />
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
      >
        <Grid item xs={8} md={6}>
          <CustomSearchBox
            placeholder="Search by Email"
            value={searchUser}
            onChange={(e) => {
              setSearchUser(e.target.value);
              setPage(0); // Reset page to 0 on each new search term
            }}
            onClear={() => setSearchUser("")}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <TableContainer
          sx={{ height: { xs: "300px", md: "350px", xl: "500px" } }}
          rows={userList}
          columns={columns}
          pageSize={pageSize}
          loading={isLoading}
          page={page}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default UserManagement;
