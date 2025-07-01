import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axiospost } from "../../Axios/CRUD/Axiospost";
import { handleInputChange } from "../../utills/InputHandle";

export default function Login() {
  const navigate = useNavigate();
  const [Formdata, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });
  const handlevalue = handleInputChange(Formdata, setFormData);
  const SubmitForm = Axiospost({
    url: `/Users/UserLogin`,
    data: Formdata,
    onSucess: (result) => {
      console.log(result.message);
      navigate("/");
    },
  });

  return (
    <form onSubmit={SubmitForm}>
      <div>
        <label>Email: </label>
        <input type="email" name="email" onChange={handlevalue} />
      </div>

      <div>
        <label>Password: </label>
        <input type="password" name="password" onChange={handlevalue} />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
