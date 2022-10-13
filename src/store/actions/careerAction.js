import axios, { axiosWithActiveBranch } from "../../utils/api";
import { toast } from "react-toastify";
import { showErrorMessageFromApi } from "../../utils/common-error";

export const CAREER_GETALL = "CAREER_GETALL";
export const CAREER_GETSINGLE = "CAREER_GETSINGLE";
// Posts action
// export const careerCreate =
//     (careerData, onSuccess, onFailure) => async (dispatch) => {
//         axios
//             .post("/headoffices", careerData)
//             .then(function ({ data }) {
//                 onSuccess && onSuccess();
//                 toast.success("Career Enquiry created successfully");
//             })
//             .catch(function (err) {
//                 showErrorMessageFromApi(err);
//                 onFailure && onFailure();
//             });
//     };

export const careerGetAll =
    (_, onSuccess, onFailure) => async (dispatch) => {
        axiosWithActiveBranch
            .get("/enquiries/ccid", {})
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

export const careerGetSingle =
    ({ id }, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get(`/enquiries/${id}/show`, {})
            .then(function ({ data }) {
                dispatch({
                    type: CAREER_GETSINGLE,
                    payload: data.data,
                });

                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response?.data?.message || err?.message);
                onFailure && onFailure();
            });
    };


// export const careerUpdate =
//     (careerUpdateData, onSuccess, onFailure) => async (dispatch) => {
//         axios
//             .put(`/career/${careerUpdateData.id}`, careerUpdateData)
//             .then(function ({ data }) {
//                 onSuccess && onSuccess();

//                 toast.success("Career Enquiry Updated successfully");
//             })
//             .catch(function (err) {
//                 toast.error(err.response?.data?.message || err?.message);
//                 onFailure && onFailure();
//             });
//     };



export const assignEnquiryToEmployee =
    (enquiryData, onSuccess, onFailure) => async (dispatch) => {
        const { enquiry_id, ...rest } = enquiryData;
        axios
            .put(`/enquiries/${enquiry_id}/assign`, rest)
            .then(function ({ data }) {
                onSuccess && onSuccess();

                toast.success("Assign Enquiry successfully");
            })
            .catch(function (err) {
                toast.error(err.response?.data?.message || err?.message);
                onFailure && onFailure();
            });
    };
