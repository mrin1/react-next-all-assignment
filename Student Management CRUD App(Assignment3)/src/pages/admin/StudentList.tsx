import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account, tablesDB } from "../../lib/appwrite.config";
import { toast } from "sonner";
import ViewStudent from "../../components/ViewStudent";
import type { Student } from "../../typescript/interface/studentList";

const StudentList = () => {
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClose = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tablesDB.listRows(
          import.meta.env.VITE_APPWRITE_DATABASE as string,
          "students"
        );
        console.log("response", response?.rows);
        setStudentList(response?.rows as any);
        toast.success("Student data fetched successfully!!");
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      toast.success("Logout Sucessfully!!");
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await tablesDB.deleteRow(
        import.meta.env.VITE_APPWRITE_DATABASE as string,
        "students",
        id
      );
      const response = await tablesDB.listRows(
        import.meta.env.VITE_APPWRITE_DATABASE as string,
        "students"
      );
      console.log("response", response?.rows);
      setStudentList(response?.rows as any);
      toast.success("deleted successfully!!");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        padding: 0,
        margin: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" onClick={handleLogout} color="error">
          Logout
        </Button>
        <Typography variant="h6" gutterBottom>
          Student Data
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/student/add")}
        >
          Add Student
        </Button>
      </Box>
      <Box>
        <TableContainer>
          <Table sx={{ minWidth: 900 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mail</TableCell>
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentList?.map((student) => (
                <TableRow
                  key={student.$id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    p: "2px",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {student.$id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={student.image}
                      alt={student.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.email}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: "4px" }}>
                      <Button
                        variant="contained"
                        onClick={() =>
                          navigate(`/admin/student/edit/${student.$id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDelete(student?.$id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setOpenDialog(true)}
                      >
                        View
                      </Button>
                      <ViewStudent
                        open={openDialog}
                        handleClose={handleClose}
                        students={student}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default StudentList;
