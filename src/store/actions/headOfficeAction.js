import axios from "../../utils/api";
import { toast } from "react-toastify";

export const HEADOFFICE_GETALL = "HEADOFFICE_GETALL";

// Posts action
export const headOfficeCreate =
  (headOfficeData, onSuccess, onFailure) => async (dispatch) => {
    // console.log(headOfficeData);
    axios
      .post("/headoffices", headOfficeData)
      .then(function ({ data }) {
        console.log(data);
        onSuccess && onSuccess();
        toast.success("Head Office created successfully");
      })
      .catch(function (err) {
        toast.error(err.response.data.message);
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
  ({}, onSuccess, onFailure) =>
  async (dispatch) => {
    axios
      .post("/login", {})
      .then(function ({ data }) {
        dispatch({
          type: "",
          payload: {},
        });
        onSuccess && onSuccess();
      })
      .catch(function (err) {
        toast.error(err.response.data.message);
        onFailure && onFailure();
      });
  };

export const headOfficeDelete =
  ({}, onSuccess, onFailure) =>
  async (dispatch) => {
    axios
      .post("/login", {})
      .then(function ({ data }) {
        dispatch({
          type: "",
          payload: {},
        });
        onSuccess && onSuccess();
      })
      .catch(function (err) {
        toast.error(err.response.data.message);
        onFailure && onFailure();
      });
  };
