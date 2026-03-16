export interface Student {
  $id: string;
  $createdAt?: string;
  $updatedAt?: string;

  name: string;
  email: string;
  title: string;
  image: string;
}
export interface ViewStudentProps {
  open: boolean;
  handleClose: () => void;
  students: Student;
}
//  export interface Students extends Models.Row {
//   name: string;
//   email: string;
//   title: string;
//   image: string;
// }
