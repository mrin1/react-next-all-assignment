import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { LoginYupValidation } from "../services/validation/auth.validation";
import { account, tablesDB } from "../lib/appwrite.config";
import { Query } from "appwrite";
import { toast } from "sonner";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginYupValidation),
  });

  const submitHandler = async (formData: any) => {
    console.log("Login Data:", formData);
    setLoading(true);
    try {
      const userList = await tablesDB.listRows(
        import.meta.env.VITE_APPWRITE_DATABASE as string,
        "signup",
        [Query.equal("email", formData.email)]
      );
      if (userList?.rows?.length > 0) {
        const response = await account.createEmailPasswordSession(
          formData.email,
          formData.password
        );
        reset();
        navigate("/admin/student");
        console.log("response", response);
      } else {
        toast.error("User not found. Please sign up first.");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f4f6",
        paddingX: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 420,
          padding: 4,
          borderRadius: 4,
          backgroundColor: "#100f0f",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          color="primary"
          marginBottom={4}
        >
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email Address"
            variant="filled"
            fullWidth
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            InputProps={{
              disableUnderline: true,
              style: {
                backgroundColor: "#1f1f1f",
                borderRadius: 6,
              },
            }}
            inputProps={{
              style: {
                color: "#ffffff",
              },
            }}
            InputLabelProps={{
              style: {
                color: "#9ca3af",
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputProps={{
              disableUnderline: true,
              style: {
                backgroundColor: "#1f1f1f",
                borderRadius: 6,
              },
            }}
            inputProps={{
              style: {
                color: "#ffffff",
              },
            }}
            InputLabelProps={{
              style: {
                color: "#9ca3af",
              },
            }}
          />

          <Button
            type="submit"
            size="large"
            sx={{
              marginTop: 2,
              paddingY: 1.4,
              fontWeight: "bold",
              color: "#ffffff",
              background: "linear-gradient(to right, #3b82f6, #6366f1)",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            {loading ? "loading..." : "Login"}
          </Button>
        </Box>

        <Typography
          variant="body2"
          textAlign="center"
          color="gray"
          marginTop={3}
        >
          Don&apos;t have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
