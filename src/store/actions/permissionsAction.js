import axios from "../../utils/api";
import { toast } from "react-toastify";

export const PERMISSIONS_GETALL = "PERMISSIONS_GETALL";

// Posts action
export const permissionsCreate =
    (permissionsData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .post("/permissions", permissionsData)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("Permission created successfully");
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

export const permissionsGetAll =
    (_, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get("/permissions", {})
            .then(function ({ data }) {
                dispatch({
                    type: PERMISSIONS_GETALL,
                    payload: data.data,
                });
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const permissionsUpdate =
    (permissionsUpdateData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .put(`/permissions/${permissionsUpdateData.id}`, permissionsUpdateData)
            .then(function ({ data }) {
                onSuccess && onSuccess();

                toast.success("Permission Updated successfully");
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const permissionsDelete =
    ({ id }, onSuccess, onFailure) =>
        async (dispatch) => {
            axios
                .delete(`/permissions/${id}`)
                .then(function ({ data }) {
                    toast.success("Permission deleted successfully");
                    onSuccess && onSuccess();
                })
                .catch(function (err) {
                    toast.error(err.response.data.message);
                    onFailure && onFailure();
                });
        };

export const addPermissionsToRole =
    ({ roleId, permissionIds = [] }, onSuccess, onFailure) =>
        async (dispatch) => {
            const params = new URLSearchParams();
            permissionIds.forEach((id, index) => params.append(`permission_ids[${index + 1}]`, id));
            axios
                .put(`/roles/${roleId}/permissions`, params)
                .then(function ({ data }) {
                    toast.success("Permission added to role successfully");
                    onSuccess && onSuccess();
                })
                .catch(function (err) {
                    toast.error(err.response.data.message);
                    onFailure && onFailure();
                });
        };
