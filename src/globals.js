import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", window.$sweetAlert.stopTimer);
    toast.addEventListener("mouseleave", window.$sweetAlert.resumeTimer);
  },
});

const globalData = function () {
  window.$toast = Toast
}

export default globalData