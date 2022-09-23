import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

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
                showErrorMessageFromApi(err);
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
                showErrorMessageFromApi(err);
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
