import axios from "../../utils/api";
import { toast } from "react-toastify";

export const EMPLOYEEMASTER_GETALL = "EMPLOYEEMASTER_GETALL";

// Posts action
export const employeeMasterCreate =
    (employeeMasterData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .post("/users", employeeMasterData)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("Employee Master created successfully");
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

export const employeeMasterGetAll =
    (_, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get("/users", {})
            .then(function ({ data }) {
                dispatch({
                    type: EMPLOYEEMASTER_GETALL,
                    payload: data.data,
                });
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const employeeMasterUpdate =
    (employeeMasterUpdateData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .put(`/users/${employeeMasterUpdateData.id}`, employeeMasterUpdateData)
            .then(function ({ data }) {
                onSuccess && onSuccess();

                toast.success("Employee Master Updated successfully");
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const employeeMasterDelete =
    ({ id }, onSuccess, onFailure) =>
        async (dispatch) => {
            axios
                .delete(`/users/${id}`)
                .then(function ({ data }) {
                    toast.success("Employee Master deleted successfully");
                    onSuccess && onSuccess();
                })
                .catch(function (err) {
                    toast.error(err.response.data.message);
                    onFailure && onFailure();
                });
        };
