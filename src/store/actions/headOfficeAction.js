import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

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
        showErrorMessageFromApi(err);
        onFailure && onFailure();
      });
  };

export const headOfficeGetAll =
  ({ action }, _, onSuccess, onFailure) =>
  async (dispatch) => {
    axios
      .get(`/headoffices?action=${action}`)
      .then(function ({ data }) {
        dispatch({
          type: HEADOFFICE_GETALL,
          payload: data.data,
        });
        onSuccess && onSuccess();
      })
      .catch(function (err) {
        toast.error(err.response?.data?.message || err?.message);
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
        toast.error(err.response?.data?.message || err?.message);
        onFailure && onFailure();
      });
  };

export const headOfficeDelete =
  ({ id, action }, onSuccess, onFailure) =>
  async (dispatch) => {
    axios
      .delete(`/headoffices/${id}`, {
        data: {
          action,
        },
      })
      .then(function ({ data }) {
        toast.success(data.message);
        onSuccess && onSuccess();
      })
      .catch(function (err) {
        toast.error(err.response?.data?.message || err?.message);
        onFailure && onFailure();
      });
  };
