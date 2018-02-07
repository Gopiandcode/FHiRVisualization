/**
 * Sanitizes an axios error returned from the FHiR Visualization API
 * @param err The Error object returned from the call
 */
export function handleResponseError(err) {
    if (err.response && err.response.data && err.response.data.error) {
        if (typeof err.response.data.error === "string") {
            return err.response.data;
        } else {
            return {error: JSON.stringify(err.response.data.error)};
        }
    } else {
        return {error: JSON.stringify(err)};
    }
}