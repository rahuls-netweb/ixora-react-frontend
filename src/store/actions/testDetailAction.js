import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const TEST_DETAIL_GETALL = "TEST_DETAIL_GETALL";



export const testDetailGetAll =
    ({ id }, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get(`/enquiry/${id}/exams`, {})
            .then(function ({ data }) {
                dispatch({
                    type: TEST_DETAIL_GETALL,
                    payload: data.data,
                });
                // console.log(data.data, "Admisssion dataa");
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response?.data?.message || err?.message);
                onFailure && onFailure();
            });
    };

