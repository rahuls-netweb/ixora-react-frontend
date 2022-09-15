import axios from "../../utils/api";
import { toast } from "react-toastify";

export const COUNTRY_GETALL = "COUNTRY_GETALL";

// Posts action
export const countryCreate =
    (countryData, onSuccess, onFailure) => async (dispatch) => {
        const formData = new FormData();
        Object.entries(countryData).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        })
        axios
            .post("/countries", formData)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("Country created successfully");
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

export const countryGetAll =
    (_, onSuccess, onFailure) => async (dispatch) => {
        axios
            .get("/countries", {})
            .then(function ({ data }) {
                dispatch({
                    type: COUNTRY_GETALL,
                    payload: data.data,
                });
                onSuccess && onSuccess();
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const countryUpdate =
    (countryUpdateData, onSuccess, onFailure) => async (dispatch) => {
        axios
            .put(`/countries/${countryUpdateData.id}`, countryUpdateData)
            .then(function ({ data }) {
                onSuccess && onSuccess();
                toast.success("Country Updated successfully");
            })
            .catch(function (err) {
                toast.error(err.response.data.message);
                onFailure && onFailure();
            });
    };

export const countryDelete =
    ({ id }, onSuccess, onFailure) =>
        async (dispatch) => {
            axios
                .delete(`/countries/${id}`)
                .then(function ({ data }) {
                    toast.success("Country deleted successfully");
                    onSuccess && onSuccess();
                })
                .catch(function (err) {
                    toast.error(err.response.data.message);
                    onFailure && onFailure();
                });
        };
