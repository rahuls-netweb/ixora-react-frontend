import axios from "../../utils/api";
import { toast } from "react-toastify";

export const COLLEGE_GETALL = "COLLEGE_GETALL";

export const collegeCreate =
    (collegeData, onSuccess, onFailure) => async (dispatch) => {
        console.log(collegeData, "collegeData");
        axios
            .post("/collages", collegeData)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("college created successfully");
                console.log(data, "data");
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


export const collegeGetAll =
    (_, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get("/collages", {})
            .then(function ({ data }) {
                dispatch({
                    type: COLLEGE_GETALL,
                    payload: data.data,
                });
                onSuccess && onSuccess();

            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const collegeUpdate =
    (collegeUpdateData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .put(`/collages/${collegeUpdateData.id}`, collegeUpdateData)
            .then(function ({ data }) {
                onSuccess && onSuccess();

                toast.success("College Updated successfully");
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const collegeDelete =
    ({ id }, onSuccess, onFailure) =>
        async (dispatch) => {
            axios
                .delete(`/collages/${id}`)
                .then(function ({ data }) {
                    toast.success("College deleted successfully");
                    onSuccess && onSuccess();
                })
                .catch(function (err) {
                    toast.error(err.response.data.message);
                    onFailure && onFailure();
                });
        };
