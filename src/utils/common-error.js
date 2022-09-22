import { toast } from "react-toastify";

export const showErrorMessageFromApi = (err) => {
  let errorMessage = err?.response?.data?.message || "Something went wrong";
  const [values] = Object.entries(err?.response?.data?.errors);
  const [_, value] = values;
  errorMessage = Array.isArray(value) ? value[0] : value;
  toast.error(errorMessage);
};
