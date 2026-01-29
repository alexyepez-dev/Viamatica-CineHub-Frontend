import Swal from "sweetalert2";

export const toastSuccess = (message: string) => {
  return Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};