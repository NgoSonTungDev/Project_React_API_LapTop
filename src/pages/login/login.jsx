import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Input, Button, Icon, Dimmer, Loader,Modal } from "semantic-ui-react";
import "./login.scss";
import { useHistory } from "react-router-dom";
const axios = require("axios");

const account = { username: "admin", password: "admin" };

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openDialog, setOpenDialog] = useState("");
  const [message, setmessage] = useState("");

  const history = useHistory();


  const handleChange = (e, field) => {
    if (field === "username") {
      setUsername(e.target.value);
    }
    if (field === "password") {
      setPassword(e.target.value);
    }
  };
  // const onLogin = () => {
  //   setLoading(true);
  //   axios
  //     .post("https://lap-center.herokuapp.com/api/login", {
  //       username: username,
  //       password: password,
  //     })
  //     .then(function (response) {
  //       history.push("/");
  //       setLoading(false);
  //       // localStorage.setItem('username', "tung");
  //       localStorage.setItem("customerName", response.data.userName);
  //       localStorage.setItem("userId", response.data.userId);
  //       localStorage.setItem("isAdmin", response.data.isAdmin);
  //     })
  //     .catch(function (error) {
  //       alert("Sai rồi mật khẩu hay user r kia !!!");
  //       setLoading(false);
  //     });
  // };

  const onLogin = () => {
    // setLoading(true);
    
    axios
      .post("https://lap-center.herokuapp.com/api/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        history.push("/");
        // setLoading(false);
        // localStorage.setItem('username', "tung");
        localStorage.setItem("customerName", response.data.userName);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("isAdmin", response.data.isAdmin);
      })
      .catch(function (error) {
        if(username === "" || password === ""){
          setmessage("không được bỏ trống user or passwork ")
          setOpenDialog(true);
          // setLoading(false);
        } else {
          setmessage("Sai rồi mật khẩu hay user r kia !!!");
          setOpenDialog(true);
          // setLoading(false);
        }      
      });
      
  };

  let checkInfo = true;
  !username || !password ? (checkInfo = true) : (checkInfo = false);

  return (
    <div>
      <Dimmer active={loading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      {/* <Navbar /> */}
      <Icon
        className="icon-home"
        name="home"
        size="large"
        inverted
        circular
        link
        onClick={() => history.push("/")}
      />
      <div className="login-container">
        <div className="login-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            {" "}
            Đăng nhập{" "}
          </h1>
          <div className="login-content">
            <label>Tên đăng nhập</label>
            <br />
            <Input
              placeholder="Username"
              className="inputText"
              value={username}
              onChange={(e) => handleChange(e, "username")}
            />
            <br />
            <label style={{ marginTop: "10px" }}>Mật khẩu</label>
            <br />
            <Input
              placeholder="Password"
              type="password"
              className="inputText"
              value={password}
              onChange={(e) => handleChange(e, "password")}
            />
            <br />
            <Button color="green" onClick={() => {
              onLogin();
            }}
            // disabled={checkInfo}
            >
              {" "}
              Đăng nhập{" "}
            </Button>
            <p style={{ marginTop: "20px", textAlign: "center" }}>
              Bạn chưa có tài khoản?{" "}
              <a
                className="register-text"
                onClick={() => history.push("/register")}
              >
                Đăng ký ngay.
              </a>
            </p>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setOpenDialog(false)}
        onOpen={() => setOpenDialog(true)}
        open={openDialog}
        size="mini"
      >
        <Modal.Header>
          <h4 className="txt-check">Thông báo</h4>
        </Modal.Header>
        <Modal.Content image>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Login;
