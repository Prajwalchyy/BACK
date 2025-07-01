//how to use
// const handlevalue = InputHandle(setData, data);

export const handleInputChange = (data, setdata) => (e) => {
  setdata({
    ...data,
    [e.target.name]: e.target.value,
  });
};
