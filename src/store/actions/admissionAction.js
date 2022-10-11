import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const ADMISSION_GETALL = "ADMISSION_GETALL";



export const admissionGetAll =
    ({ id }, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get(`/enquiry/${id}/admissions`, {})
            .then(function ({ data }) {
                dispatch({
                    type: ADMISSION_GETALL,
                    payload: data.data,
                });
                console.log(data.data, "Admisssion dataa");
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response?.data?.message || err?.message);
                onFailure && onFailure();
            });
    };

