import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import type React from "react";
import type { ViewStudentProps } from "../typescript/interface/studentList";

// const ViewProduct = ({ open, handleClose, product }) => {
const ViewStudent: React.FC<ViewStudentProps> = ({
  open,
  handleClose,
  students,
}) => {
  console.log("product", students);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">View Student</DialogTitle>
        <IconButton onClick={handleClose} sx={{position:"absolute", right:"9px"}}>X close</IconButton>
        <DialogContent sx={{position:"relative"}}>
          <Typography>Name: {students.name}</Typography>
          <Typography>Course: {students.image}</Typography>
          <Typography>Email: {students.email}</Typography>
          <Typography>
            Image:{" "}
            <img
              src={students.image}
              alt={students.title}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
              }}
            />{" "}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewStudent;
