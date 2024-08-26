import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import "./assets/styles/Common.css";
import HomePage from "./pages/Home/HomePage";
import AdminHomePage from "./pages/Home/AdminHomePage";
import AccountInfo from "./pages/AccountInformation/AccountInfo";
import UserRegistration from "./pages/Registration/UserRegistration";

function App() {
  return (
    <Routes>
      <Route exact path="/signup" element={<UserRegistration />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/adminhome" element={<AdminHomePage />} />
      <Route path="/userinfo" element={<AccountInfo />} />
    </Routes>
  );
}

export default App;
