import axios from "../../utils/api";
import { toast } from "react-toastify";

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
                let errorMessage =
                    err?.response?.data?.message || "Something went wrong";
                const [values] = Object.entries(err?.response?.data?.errors);
                const [_, value] = values;
                errorMessage = Array.isArray(value) ? value[0] : value;
                toast.error(errorMessage);
                onFailure && onFailure();
            });
    };

export const qualificationGetAll =
    (_, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get("/qualifications", {})
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
            .put(`/qualifications/${qualificationUpdateData.id}`, qualificationUpdateData)
            .then(function ({ data }) {
                onSuccess && onSuccess();

                toast.success("Qualification updated successfully");
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const qualificationDelete =
    ({ id }, onSuccess, onFailure) =>
        async (dispatch) => {
            axios
                .delete(`/qualifications/${id}`)
                .then(function ({ data }) {
                    toast.success("Qualification deleted successfully");
                    onSuccess && onSuccess();
                })
                .catch(function (err) {
                    toast.error(err.response.data.message);
                    onFailure && onFailure();
                });
        };
