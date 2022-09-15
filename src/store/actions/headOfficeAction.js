import axios from "../../utils/api";
import { toast } from "react-toastify";

export const HEADOFFICE_GETALL = "HEADOFFICE_GETALL";

// Posts action
export const headOfficeCreate =
  (headOfficeData, onSuccess, onFailure) => async (dispatch) => {
    axios
      .post("/headoffices", headOfficeData)
      .then(function ({ data }) {
        onSuccess && onSuccess();
        toast.success("Head Office created successfully");
      })
      .catch(function (err) {
        let errorMessage =
          err?.response?.data?.message || "Something went wrong";
        const [values] = Object.entries(err?.response?.data?.errors);
        const [_, value] = values;
        errorMessage = Array.isArray(value) ? value[0] : value;
        toast.error(errorMessage);
        onFailure && onFailure();
      });
  };

export const headOfficeGetAll =
  (_, onSuccess, onFailure) => async (dispatch) => {
    axios
      .get("/headoffices", {})
      .then(function ({ data }) {
        dispatch({
          type: HEADOFFICE_GETALL,
          payload: data.data,
        });
        onSuccess && onSuccess();
      })
      .catch(function (err) {
        toast.error(err.response.data.message);
        onFailure && onFailure();
      });
  };

export const headOfficeUpdate =
  (headOfficeUpdateData, onSuccess, onFailure) => async (dispatch) => {
    axios
      .put(`/headoffices/${headOfficeUpdateData.id}`, headOfficeUpdateData)
      .then(function ({ data }) {
        onSuccess && onSuccess();

        toast.success("Head Office Updated successfully");
      })
      .catch(function (err) {
        toast.error(err.response.data.message);
        onFailure && onFailure();
      });
  };

export const headOfficeDelete =
  ({ id }, onSuccess, onFailure) =>
    async (dispatch) => {
      axios
        .delete(`/headoffices/${id}`)
        .then(function ({ data }) {
          toast.success("Head Office deleted successfully");
          onSuccess && onSuccess();
        })
        .catch(function (err) {
          toast.error(err.response.data.message);
          onFailure && onFailure();
        });
    };
