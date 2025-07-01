import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CheckToken = async () => {
  const navigate = useNavigate();
  const AccessToken = Cookies.get("AccessToken");
  const RefreshToken = Cookies.get("RefreshToken");

  if (!AccessToken && RefreshToken) {
    try {
      const result = await axios.get("http://localhost:1122/RefreshToken", {
        withCredentials: true,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    console.log(AccessToken);
    console.log(RefreshToken);
  } else {
    window.location.href = "/Login";
  }
};

export default CheckToken;
