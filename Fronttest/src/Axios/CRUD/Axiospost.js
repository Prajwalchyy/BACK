import { ApiErrors } from "../ApiErrorsHandle";
import axiosMain from "../AxiosInstance";

/**
 * @param {string} params.url - API endpoint URL.
 * @param {Object} params.data - Data to send in POST request.
 * @param {function} [params.onSuccess] - Callback function called on success. Receives (result.data).
 * @param {function} [params.onError] - Callback function called on error. Receives error object.
 */
export const Axiospost =
  ({ url = "", data = {}, onSucess = () => {}, onError = () => {} }) =>
  async (e) => {
    e.preventDefault();
    try {
      const result = await axiosMain.post(url, data);
      console.log(result);
      onSucess(result.data);
      // alert(result.data.message);
    } catch (error) {
      ApiErrors(error);
      onError(error);
    }
  };
