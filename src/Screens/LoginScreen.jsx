import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PathList from "../Common/PathList";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../firebase/firebase";
const auth = getAuth(firebaseApp);

const LoginScreen = () => {
  const [signup, setSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setError("");
  }, [signup]);
  useEffect(() => {
    let userinfo;
    try {
      userinfo = JSON.parse(localStorage.getItem("Lottery"));
    } catch (error) {
      userinfo = null;
    }
    if (userinfo) {
      return navigate(PathList.Dashboard);
    }
  }, []);
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email address"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = (email, password, resetForm) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        try {
          // Get the user's document from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const userRole = userData.role; // Get the user's role from Firestore

            // Check if the user has the role: 2
            if (userRole === 2) {
              console.log("User has role 2, login successful");
              setLoading(false);
              setError("");
              localStorage.setItem(
                "Lottery",
                JSON.stringify({ email, password })
              );
              toast.success("Login successful!");
              resetForm();
              navigate("/dashboard");
            } else {
              // User does not have the correct role
              console.log("User does not have the required role");
              setLoading(false);
              toast.error("You are not authorized to access this area.");
              auth.signOut(); // Optionally sign the user out
            }
          } else {
            console.log("No such user document!");
            setLoading(false);
            toast.error("No user data found.");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setLoading(false);
          toast.error("Failed to verify role.");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Login error: ", error);
        toast.error("Invalid Credentials");
        resetForm();
      });
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex" }}>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#eba834",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ color: "white", fontWeight: "600", fontSize: "48px" }}
        >
          Lottery Club
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "80%",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            p: 5,
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Typography sx={{ fontWeight: "600", fontSize: "30px" }}>
            Welcome Back, Admin
          </Typography>

          {/* Form for Login */}
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleLogin(values.email, values.password, resetForm); // Call login function
            }}
          >
            {({
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              resetForm,
            }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                  }}
                >
                  <Field
                    as={TextField}
                    label="Enter Your Email Address"
                    name="email"
                    variant="standard"
                    type="email"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <Field
                    as={TextField}
                    label="Enter Your Password"
                    name="password"
                    variant="standard"
                    type="password"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    type="submit"
                    sx={{
                      width: "150px",
                      bgcolor: "#eba834",
                      color: "white",
                      "&:hover": { bgcolor: "#eba834", color: "white" },
                    }}
                  >
                    {loading ? "Logging In..." : "Login"}
                  </Button>
                </Box>
                {error && <Typography color="error">{error}</Typography>}
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
