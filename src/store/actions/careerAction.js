import axios from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const CAREER_GETALL = "CAREER_GETALL";

// Posts action
export const careerCreate =
    (careerData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .post("/headoffices", careerData)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("Career Enquiry created successfully");
            })
            .catch(function (err) {
                showErrorMessageFromApi(err);
                onFailure && onFailure();
            });
    };

export const careerGetAll =
    (_, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get("/allenquiry", {})
            .then(function ({ data }) {
                dispatch({
                    type: CAREER_GETALL,
                    payload: data.data,
                });
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response?.data?.message || err?.message);
                onFailure && onFailure();
            });
    };

export const careerUpdate =
    (careerUpdateData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .put(`/career/${careerUpdateData.id}`, careerUpdateData)
            .then(function ({ data }) {
                onSuccess && onSuccess();

                toast.success("Career Enquiry Updated successfully");
            })
            .catch(function (err) {
                toast.error(err.response?.data?.message || err?.message);
                onFailure && onFailure();
            });
    };

export const careerDelete =
    ({ id }, onSuccess, onFailure) =>
        async (dispatch) => {
            axios
                .delete(`/career/${id}`)
                .then(function ({ data }) {
                    toast.success("Career Enquiry deleted successfully");
                    onSuccess && onSuccess();
                })
                .catch(function (err) {
                    toast.error(err.response?.data?.message || err?.message);
                    onFailure && onFailure();
                });
        };
