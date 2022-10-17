import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const COUNTRY_GETALL = "COUNTRY_GETALL";

// Posts action
export const countryCreate =
  (countryData, onSuccess, onFailure) => async (dispatch) => {
    const formData = new FormData();
    Object.entries(countryData).forEach((entry) => {
      const [key, value] = entry;
      formData.append(key, value);
    });
    axios
      .post("/countries", formData)
      .then(function ({ data }) {
        onSuccess && onSuccess();
        toast.success("Country created successfully");
      })
      .catch(function (err) {
        showErrorMessageFromApi(err);
        onFailure && onFailure();
      });
  };

export const countryGetAll = (_, onSuccess, onFailure) => async (dispatch) => {
  axios
    .get("/countries?action=withtrashed", {})
    .then(function ({ data }) {
      dispatch({
        type: COUNTRY_GETALL,
        payload: data.data,
      });
      onSuccess && onSuccess();
    })
    .catch(function (err) {
      toast.error(err.response.data.message);
      onFailure && onFailure();
    });
};

export const countryUpdate =
  (countryUpdateData, onSuccess, onFailure) => async (dispatch) => {
    axios
      .put(`/countries/${countryUpdateData.id}`, countryUpdateData)
      .then(function ({ data }) {
        onSuccess && onSuccess();
        toast.success("Country Updated successfully");
      })
      .catch(function (err) {
        showErrorMessageFromApi(err);
        onFailure && onFailure();
      });
  };

export const countryDelete =
  ({ id, action }, onSuccess, onFailure) =>
    async (dispatch) => {
      axios
        .delete(`/countries/${id}`, {
          data: {
            action
          }
        })
        .then(function ({ data }) {
          toast.success("Country deleted successfully");
          onSuccess && onSuccess();
        })
        .catch(function (err) {
          toast.error(err.response.data.message);
          onFailure && onFailure();
        });
    };
