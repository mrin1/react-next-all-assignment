import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { StudentYupValidation } from "../../services/validation/student.validation";
import { bucket, tablesDB } from "../../lib/appwrite.config";
import { ID, Query } from "appwrite";
import { toast } from "sonner";
import type { Students } from "../../typescript/interface/addStudent";

const AddStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  //const [studentDetails, setStudentDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tablesDB.listRows(
          import.meta.env.VITE_APPWRITE_DATABASE as string,
          "students",
          [Query.equal("$id", id as string)]
        );
        console.log("response", response);
        if (response?.rows?.[0]) {
          reset(response?.rows?.[0] as Students);
          setPreview(response?.rows?.[0]?.image);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, []);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(StudentYupValidation),
    defaultValues: {
      fullName: "",
      email: "",
      course: "",
      profileImage: undefined,
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log("Signup Data:", data);
    try {
      if (id) {
        await tablesDB.updateRow({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
          tableId: "students",
          rowId: id,
          data: {
            name: data.fullName,
            email: data.email,
            course: data.course,
          },
        });
        toast.success("Student updated successfully!");
        navigate("/admin/student");
      } else {
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
        await tablesDB.createRow({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE as string,
          tableId: "students",
          rowId: ID.unique(),
          data: {
            name: data.fullName,
            email: data.email,
            course: data.course,
            image: imageUrl,
          },
        });
        toast.success("Student added successfully!");
        navigate("/admin/student");
      }
      reset();
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
          {id ? "Edit" : "Add"} Student
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
              label="course"
              type="course"
              variant="filled"
              {...register("course")}
              error={!!errors.course}
              helperText={errors.course?.message}
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
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : id
                ? "Update Student"
                : "Add Student"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddStudent;
