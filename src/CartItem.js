import React from "react";

class CartItem extends React.Component {
  render() {
    const { qty, price, title } = this.props.product;
    const { product } = this.props;

    return (
      <div className="cart-item">
        <div className="left-block">
          <img
            style={{
              height: 110,
              width: 110,
              borderRadius: 5,
              background: "#ccc",
            }}
            src={product.img}
          />
        </div>
        <div className="right-block">
          <div style={{ fontSize: 25 }}> {title} </div>
          <div style={{ color: "#777" }}>{price}</div>
          <div style={{ color: "#777" }}>Qty: {qty}</div>
          <div className="cart-item-actions">
            <img
              alt="add"
              src="https://cdn-icons-png.flaticon.com/512/32/32339.png"
              className="action-icons"
              onClick={() => this.props.onIncreaseQuantity(product)}
            />
            <img
              alt="minus"
              src="https://cdn-icons-png.flaticon.com/512/43/43625.png"
              className="action-icons"
              onClick={() => this.props.onDecreaseQuantity(product)}
            />
            <img
              alt="delete"
              src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
              className="action-icons"
              onClick={() => this.props.onDeleteProduct(product.id)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
