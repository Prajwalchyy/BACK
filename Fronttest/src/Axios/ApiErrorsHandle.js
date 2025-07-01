export const ApiErrors = (error) => {
  console.log(error);
  if (error.response?.status === 400) {
    console.error(error.response.data.errors[0].message);
  }
  if ([401, 403, 404, 500].includes(error.response?.status)) {
    console.error(error.response.data.message || "error occour");
  }
};
