import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Components/Form/Login";
import RoutePaths from "./RoutePath/RoutePaths";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Login /> */}
      <RoutePaths />
    </>
  );
}

export default App;
