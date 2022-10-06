import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const BRANCHMASTER_GETALL = "BRANCHMASTER_GETALL";
export const CURRENT_SELECTED_BRANCH = "CURRENT_SELECTED_BRANCH";
// Posts action
export const branchMasterCreate =
    (branchMasterData, onSuccess, onFailure) => async (dispatch) => {
        console.log(branchMasterData);
        axios
            .post("/branches", branchMasterData)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("Branch Master created successfully");
            })
            .catch(function (err) {
                showErrorMessageFromApi(err);
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

export const addBranchesTouser =
    (data, onSuccess, onFailure) => async (dispatch) => {
        const { userId, ...rest } = data;
        const params = new URLSearchParams();
        Object.entries(rest).forEach(([branchId, permissionIds]) => {
            permissionIds.forEach(pId => {
                params.append(`branches[${branchId}][]`, pId)
            });
        });
        axios
            .put(`/users/${userId}/roles`, params)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("Roles added to users successfully");
            })
            .catch(function (err) {
                showErrorMessageFromApi(err);
                onFailure && onFailure();
            });
    };

export const branchMasterSwitch =
    (id, onSuccess, onFailure) => async (dispatch, getState) => {
        console.log('Hitting !!!!')
        const { user } = getState().auth;

        axios
            .put(`/user/${user.user.id}/switch/branch`, { branch_id: id })
            .then(function ({ data }) {
                dispatch(getCurrentSelectedBranch(user.user.id));
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                showErrorMessageFromApi(err);
                onFailure && onFailure();
            });
    };

export const getCurrentSelectedBranch = (userId, onSuccess, onFailure) => (dispatch) => {
    axios
        .get(`/user/${userId}/current/branch`)
        .then(function ({ data }) {
            dispatch({
                type: CURRENT_SELECTED_BRANCH,
                payload: data.data,
            });
            onSuccess && onSuccess();
        })
        .catch(function (err) {
            showErrorMessageFromApi(err);
            onFailure && onFailure();
        });
}