import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupYupValidation } from "../services/validation/auth.validation";
import { account, bucket, tablesDB } from "../lib/appwrite.config";
import { ID } from "appwrite";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupYupValidation),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      profileImage: undefined,
    },
  });

  const onSubmit = async (data: any) => {
    console.log("Signup Data:", data);
    setLoading(true);
    try {
      const accountResponse = await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.fullName
      );
      console.log("accountResponse:", accountResponse);
      let imageUrl = "";
      if (data.profileImage) {
        const file = await bucket.createFile(
          import.meta.env.VITE_APPWRITE_BUCKET as string,
          ID.unique(),
          data?.profileImage?.[0]
        );
        console.log("file", file);
        imageUrl = bucket.getFileView(
          import.meta.env.VITE_APPWRITE_BUCKET as string,
          file.$id
        );
        console.log("imageurl", imageUrl);
      }
      const response = await tablesDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
        tableId: "signup",
        rowId: ID.unique(),
        data: {
          name: data.fullName,
          email: data.email,
          password: data.password,
          image: imageUrl,
          role: "user",
          phone: "7365007291",
        },
      });
      console.log("response", response);
      toast.success("Account created successfully!!");
      navigate("/");
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f3f4f6",
        px: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 420,
          bgcolor: "#100f0f",
          borderRadius: 4,
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="primary"
          mb={3}
        >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl error={!!errors.profileImage}>
              <FormLabel>Profile Image</FormLabel>
              {preview && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={preview}
                    alt="Preview"
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #e5e7eb",
                    }}
                  />
                </Box>
              )}

              <Controller
                name="profileImage"
                control={control}
                render={({ field }) => (
                  <Button variant="contained" component="label">
                    Upload Image
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        field.onChange(files);

                        if (files && files.length > 0) {
                          setPreview(URL.createObjectURL(files[0]));
                        }
                      }}
                    />
                  </Button>
                )}
              />
              {errors.profileImage && (
                <FormHelperText>{errors.profileImage.message}</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Full Name"
              variant="filled"
              {...register("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
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
              label="Email Address"
              variant="filled"
              {...register("email")}
              error={!!errors.email}
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
              {...register("password")}
              error={!!errors.password}
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
                mt: 2,
                py: 1.4,
                fontWeight: "bold",
                color: "white",
                background: "linear-gradient(to right, #3b82f6, #6366f1)",
                "&:hover": { opacity: 0.9 },
              }}
            >
              {loading ? "loading..." : "Sign Up"}
            </Button>
          </Box>
        </form>

        <Typography variant="body2" align="center" color="gray" mt={3}>
          Already have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignUp;
