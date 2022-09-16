import axios from "../../utils/api";
import { toast } from "react-toastify";

export const ROLES_GETALL = "ROLES_GETALL";

// Posts action
export const rolesCreate =
    (rolesData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .post("/roles", rolesData)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("Roles created successfully");
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

export const rolesGetAll =
    (_, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get("/roles", {})
            .then(function ({ data }) {
                dispatch({
                    type: ROLES_GETALL,
                    payload: data.data,
                });
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const rolesUpdate =
    (rolesUpdateData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .put(`/roles/${rolesUpdateData.id}`, rolesUpdateData)
            .then(function ({ data }) {
                onSuccess && onSuccess();

                toast.success("Roles Updated successfully");
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const rolesDelete =
    ({ id }, onSuccess, onFailure) =>
        async (dispatch) => {
            axios
                .delete(`/roles/${id}`)
                .then(function ({ data }) {
                    toast.success("Roles deleted successfully");
                    onSuccess && onSuccess();
                })
                .catch(function (err) {
                    toast.error(err.response.data.message);
                    onFailure && onFailure();
                });
        };
