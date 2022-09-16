import axios from "../../utils/api";
import { toast } from "react-toastify";

export const BRANCHMASTER_GETALL = "BRANCHMASTER_GETALL";

// Posts action
export const branchMasterCreate =
    (branchMasterData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .post("/branches", branchMasterData)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("Branch Master created successfully");
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

export const branchMasterGetAll =
    (_, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get("/branches", {})
            .then(function ({ data }) {
                dispatch({
                    type: BRANCHMASTER_GETALL,
                    payload: data.data,
                });
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const branchMasterUpdate =
    (branchMasterUpdateData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .put(`/branches/${branchMasterUpdateData.id}`, branchMasterUpdateData)
            .then(function ({ data }) {
                onSuccess && onSuccess();

                toast.success("Branch Master Updated successfully");
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const branchMasterDelete =
    ({ id }, onSuccess, onFailure) =>
        async (dispatch) => {
            axios
                .delete(`/branches/${id}`)
                .then(function ({ data }) {
                    toast.success("Branch Master deleted successfully");
                    onSuccess && onSuccess();
                })
                .catch(function (err) {
                    toast.error(err.response.data.message);
                    onFailure && onFailure();
                });
        };
