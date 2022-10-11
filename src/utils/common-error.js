import { toast } from "react-toastify";

export const showErrorMessageFromApi = (err) => {
  console.log(err, 'showErrorMessageFromApi');
  let errorMessage = "Something went wrong";
  if (err?.response?.data?.message) {
    errorMessage = err?.response?.data?.message;
  } else if (err?.response?.data?.errors) {
    const [values] = Object.entries(err?.response?.data?.errors);
    const [_, value] = values;
    errorMessage = Array.isArray(value) ? value[0] : value;
  }
  toast.error(errorMessage);
};
