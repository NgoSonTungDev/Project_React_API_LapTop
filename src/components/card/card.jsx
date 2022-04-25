import React from "react";
import "./card.scss";
import { useHistory } from "react-router-dom";
import { Button, Icon, Item } from "semantic-ui-react";
import product from "../../assets/data/product";
const Card = (props) => {
  const history = useHistory();
  const item = props.product;

  const moveToDeTail = () => {
    history.push(`/product/${item._id}`);
    console.log('item id: ', item._id);
  };
  return (
    <div className="card-container" onClick={() => {}}>
      <img className="image" src={item.images[0]} />
      <h4 className="name">{item.name}</h4>
      <p className="email d-flex">
        Hãng:{" "}
        <span className="ml-1 text-success font-weight-bold">{item.brand}</span>
      </p>
      <p className="email d-flex name">
        Chip xử lý:{" "}
        <span className="ml-1 text-success font-weight-bold">{item.cpu}</span>
      </p>
      <p className="email d-flex">
        Price: {item.price}{" "}
        <span className="ml-1 text-success font-weight-bold"></span>
      </p>

      {/* <button onClick={() => { }} className="btn-success">
              Mua ngay
            </button> */}
      <Button onClick={moveToDeTail} color="green">
        <Icon name="eye" /> Xem sản phẩm
      </Button>
    </div>
  );
};

export default Card;
