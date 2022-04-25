import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import "./buy.scss";
import {
  Segment,
  Button,
  Input,
  Label,
  Form,
  TextArea,
  Modal,
  Header,
  Image,
} from "semantic-ui-react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

const Buy = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [disableButton, setdisableButton] = useState(true);
  const location = useLocation();
  const [data, setData] = useState([]);
  const [image, setimage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [load, setLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMesage] = useState("");
  const currentUser = localStorage.getItem("customerName");

  const id = location.pathname?.split("buy/")[1];

  const onChangeinfo = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case "customerName":
        setCustomerName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        setAddress(value);
    }
  };

  let checkInfo = true;
  if (!customerName || !phoneNumber || !email || !address) checkInfo = true;
  if (customerName && phoneNumber && email && address) checkInfo = false;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoad(true);
    let url = `https://lap-center.herokuapp.com/api/product/getProductById/${id}`;
    axios
      .get(url)
      .then(function (res) {
        const data = res.data.response;
        setData(data);
        setimage(data.images[0]);
        setLoad(false);
      })
      .catch(function (error) {
        setLoad(false);
        // console.log("error: ", error);
      });
  };

  const onChangeQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
    } else if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const onorder = () => {
    setOpen(false);
    setLoad(true);
    axios
      .post("https://lap-center.herokuapp.com/api/order/addOrder", {
        customerName: customerName,
        email: email,
        phone: phoneNumber,
        address: address,
        productName: data.name,
        productBrand: data.brand,
        quantity: quantity,
        orderStatus: 1,
      })
      .then(function (res) {
        console.log(res);
        setLoad(false);
        setOpenDialog(true);
        setMesage("Đặt hàng thành công !!");
        currentUser && onaddtohistory();
      })
      .catch(function (err) {
        setOpenDialog(true);
        setLoad(false);
        setMesage("Đặt hàng thất bại !!");
      });
  };

  const onaddtohistory = () => {
    axios
      .post(
        "https://lap-center.herokuapp.com/api/history/addProductToHistory",
        {
          userId: localStorage.getItem("userId"),
          phone: phoneNumber,
          address: address,
          productName: data.name,
          productBrand: data.brand,
          quantity: quantity,
          orderStatus: 1,
        }
      )
      .then(function (res) {
        console.log(res);
        console.log("dang them vai lich su mua hang");
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <Segment className="buy-container" loading={load}>
        <div className="buy-title">
          <p>Để đặt hàng</p>
          <span>
            , quý khách hàng vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc
            và điền các thông tin dưới đây:
          </span>
        </div>
        <div className="buy-content">
          <div className="buy-header">
            <img className="buy-image" src={image} alt="" />
            <p>{data.name}</p>
            <div className="quantity">
              <Button icon="minus" onClick={() => onChangeQuantity("minus")} />
              <Input
                className="inp-quantity"
                value={quantity}
                // onChange={(e) => {
                //   onChange(e.target.value);
                // }}
              />
              <Button icon="plus" onClick={() => onChangeQuantity("plus")} />
              <h4>{data.price}</h4>
            </div>
          </div>
          <hr />
          <div className="buy-total">
            <h3>Tổng tiền:</h3>
            <p>{data.price * quantity}</p>
          </div>
          <div className="user-info">
            <div className="user-info">
              <Segment raised>
                <Label as="a" color="red" ribbon>
                  Thông tin khách hàng
                </Label>
                <Form className="info-form">
                  <Form.Field>
                    <label>Tên khách hành</label>
                    <input
                      placeholder="Ngo Son Tung"
                      value={customerName}
                      onChange={(e) => onChangeinfo(e, "customerName")}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Số điện thoại</label>
                    <input
                      placeholder="0522564268"
                      value={phoneNumber}
                      onChange={(e) => onChangeinfo(e, "phoneNumber")}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input
                      placeholder="dumau50@gmail.com"
                      value={email}
                      onChange={(e) => onChangeinfo(e, "email")}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Địa chỉ</label>
                    <TextArea
                      placeholder="544 Điện Biên Phủ"
                      style={{ minHeight: 100 }}
                      value={address}
                      onChange={(e) => onChangeinfo(e, "address")}
                    />
                  </Form.Field>

                  <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={
                      <Button
                        color="red"
                        className="btn-order"
                        disabled={checkInfo}
                      >
                        Đặt hàng
                      </Button>
                    }
                  >
                    <Modal.Header>Xác nhận thông tin</Modal.Header>
                    <Modal.Content image>
                      <Image size="medium" src={image} wrapped />
                      <Modal.Description>
                        <h5 className="txt-title">Thông tin sản phẩm</h5>
                        <div className="info-check">
                          <p>Tên sản phẩm:</p>
                          <span>{data.name}</span>
                        </div>
                        <div className="info-check">
                          <p>Hãng : </p>
                          <span>{data.brand}</span>
                        </div>
                        <div className="info-check">
                          <p>Số lượng : </p>
                          <span>{quantity}</span>
                        </div>
                        <div className="info-check">
                          <p>Tổng tiền :</p>
                          <span>{quantity * data.price}</span>
                        </div>
                        <h5 className="txt-title">Thông tin khách hàng</h5>
                        <div className="info-check">
                          <p>Tên khách hàng :</p>
                          <span>{customerName}</span>
                        </div>
                        <div className="info-check">
                          <p>Số điện thoại : </p>
                          <span>{phoneNumber}</span>
                        </div>
                        <div className="info-check">
                          <p>Email : </p>
                          <span>{email}</span>
                        </div>
                        <div className="info-check">
                          <p>Địa chỉ : </p>
                          <span>{address}</span>
                        </div>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button onClick={() => setOpen(false)}>Hủy</Button>
                      <Button onClick={onorder} positive>
                        Xác nhận
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </Form>
              </Segment>
            </div>
          </div>
        </div>
      </Segment>
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

export default Buy;
