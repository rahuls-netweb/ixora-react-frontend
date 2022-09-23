import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const CATEGORY_GETALL = "CATEGORY_GETALL";

// Posts action
export const categoryCreate =
  (categoryData, onSuccess, onFailure) => async (dispatch) => {
    axios
      .post("/categories", categoryData)
      .then(function ({ data }) {
        onSuccess && onSuccess();
        toast.success("Category created successfully");
      })
      .catch(function (err) {
        showErrorMessageFromApi(err);
        onFailure && onFailure();
      });
  };

export const categoryGetAll = (_, onSuccess, onFailure) => async (dispatch) => {
  axios
    .get("/categories", {})
    .then(function ({ data }) {
      dispatch({
        type: CATEGORY_GETALL,
        payload: data.data,
      });
      onSuccess && onSuccess();
    })
    .catch(function (err) {
      toast.error(err.response.data.message);
      onFailure && onFailure();
    });
};

export const categoryUpdate =
  (categoryUpdateData, onSuccess, onFailure) => async (dispatch) => {
    axios
      .put(`/categories/${categoryUpdateData.id}`, categoryUpdateData)
      .then(function ({ data }) {
        onSuccess && onSuccess();

        toast.success("Category Updated successfully");
      })
      .catch(function (err) {
        showErrorMessageFromApi(err);
        onFailure && onFailure();
      });
  };

export const categoryDelete =
  ({ id }, onSuccess, onFailure) =>
    async (dispatch) => {
      axios
        .delete(`/categories/${id}`)
        .then(function ({ data }) {
          toast.success("Category deleted successfully");
          onSuccess && onSuccess();
        })
        .catch(function (err) {
          showErrorMessageFromApi(err);
          onFailure && onFailure();
        });
    };
