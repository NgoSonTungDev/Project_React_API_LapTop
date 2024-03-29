import React from "react";
import logo from "../../assets/imgs/desktop-computer.png";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const history = useHistory();
  const currentUser = localStorage.getItem("customerName");
  const isAdmin = localStorage.getItem("isAdmin");
  const backToHome = () => {
    history.push("/");
  };

  return (
    <div className="navbar">
      <p className="logo-container">
        <img className="logo" src={logo} onClick={backToHome} />
      </p>
      <div className="options">
        <Link className="option" onClick = {()=>history.push("/")} to="/" >
          TRANG CHỦ
        </Link>
        <Link className="option" to="/introduce">
          GIỚI THIỆU
        </Link>
        <Link className="option" to="/contact">
          LIÊN HỆ
        </Link>
        {currentUser ? (
          <Link className="option" to="/" onClick={() => localStorage.clear()}>
            ĐĂNG XUẤT
          </Link>
        ) : (
          <Link className="option" to="/login">
            ĐĂNG NHẬP
          </Link>
        )}
        {isAdmin === "true" && (
          <Link className="option" to="/admin/order">
            QUẢN LÝ ĐƠN HÀNG
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
