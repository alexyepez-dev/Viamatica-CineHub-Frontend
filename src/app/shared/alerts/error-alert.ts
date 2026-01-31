import Swal from "sweetalert2";

export const errorAlert = (message: string) => {
  return Swal.fire({
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
};