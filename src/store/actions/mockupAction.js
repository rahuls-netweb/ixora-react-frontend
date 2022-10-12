import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const MOCKUP_GETALL = "MOCKUP_GETALL";

export const mockupGetAll =
  ({ id }, onSuccess, onFailure) =>
  async (dispatch) => {
    axios
      .get(`/enquiries/${id}/show`, {})
      .then(function ({ data }) {
        dispatch({
          type: MOCKUP_GETALL,
          payload: data.data,
        });
        // console.log(data.data, "Mockup data");
        onSuccess && onSuccess();
      })
      .catch(function (err) {
        toast.error(err.response?.data?.message || err?.message);
        onFailure && onFailure();
      });
  };
