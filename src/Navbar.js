import React from "react";

const Navbar = (props) => {
  console.log("props", props);
  return (
    <div style={styles.nav}>
      <h1 style={styles.hea}>
        Amazon Cart Clone(REACT)using Firebase Realtime Database
      </h1>
      <div style={styles.cartIconContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/630/630746.png"
          style={styles.cartIcon}
        />
        <span style={styles.cartCount}>{props.count}</span>
      </div>
    </div>
  );
};

const styles = {
  hea: {
    color: "white",
  },
  nav: {
    height: 70,
    background: "#4267b2",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartIcon: {
    height: 32,
    marginRight: 20,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartCount: {
    background: "yellow",
    borderRadius: "50%",
    padding: "4px 8px",
    position: "absolute",
    right: 0,
    top: -9,
  },
};

export default Navbar;
