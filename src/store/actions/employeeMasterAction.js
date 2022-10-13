import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const EMPLOYEEMASTER_GETALL = "EMPLOYEEMASTER_GETALL";
export const GET_USER_BY_BRANCHES = "GET_USER_BY_BRANCHES";
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
                showErrorMessageFromApi(err);
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

export const getEmployeesByBranchId =
    ({ branchId }, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get(`/branch/${branchId}/users`, {})
            .then(function ({ data }) {
                dispatch({
                    type: GET_USER_BY_BRANCHES,
                    payload: data.data,
                });
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };