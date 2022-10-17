import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const QUALIFICATION_GETALL = "QUALIFICATION_GETALL";

// Posts action
export const qualificationCreate =
  (qualificationData, onSuccess, onFailure) => async (dispatch) => {
    axios
      .post("/qualifications", qualificationData)
      .then(function ({ data }) {
        onSuccess && onSuccess();
        toast.success("Qualification created successfully");
      })
      .catch(function (err) {
        showErrorMessageFromApi(err);
        onFailure && onFailure();
      });
  };

export const qualificationGetAll =
  (_, onSuccess, onFailure) => async (dispatch) => {
    axios
      .get("/qualifications?action=withtrashed", {})
      .then(function ({ data }) {
        dispatch({
          type: QUALIFICATION_GETALL,
          payload: data.data,
        });
        onSuccess && onSuccess();
      })
      .catch(function (err) {
        toast.error(err.response.data.message);
        onFailure && onFailure();
      });
  };

export const qualificationUpdate =
  (qualificationUpdateData, onSuccess, onFailure) => async (dispatch) => {
    axios
      .put(
        `/qualifications/${qualificationUpdateData.id}`,
        qualificationUpdateData
      )
      .then(function ({ data }) {
        onSuccess && onSuccess();

        toast.success("Qualification updated successfully");
      })
      .catch(function (err) {
        showErrorMessageFromApi(err);
        onFailure && onFailure();
      });
  };

export const qualificationDelete =
  ({ id, action }, onSuccess, onFailure) =>
    async (dispatch) => {
      axios
        .delete(`/qualifications/${id}`, {
          data: {
            action
          }
        })
        .then(function ({ data }) {
          toast.success("Qualification deleted successfully");
          onSuccess && onSuccess();
        })
        .catch(function (err) {
          showErrorMessageFromApi(err);
          onFailure && onFailure();
        });
    };
