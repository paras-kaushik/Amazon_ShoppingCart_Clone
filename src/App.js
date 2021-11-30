import React from "react";
import "./App.css";
// import CartItem from './CartItem';
import Cart from "./Cart";
import Navbar from "./Navbar";
import * as firebase from "firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };
    this.db = firebase.firestore();
    this.options = [
      {
        title: "Rice (1Kg)",
        img: "https://media.newyorker.com/photos/5f2c85539a557880d973a759/1:1/w_1823,h_1823,c_limit/Buford-FrenchRice.jpg",
      },
      {
        title: "Atta (1Kg)",
        img: "https://i.ndtvimg.com/mt/cooks/2014-11/wholemeal-flour-atta.jpg",
      },
      {
        title: "Daal (1Kg) ",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/3_types_of_lentil.png/640px-3_types_of_lentil.png",
      },
      {
        title: "Onion (1Kg)",
        img: "https://cdn.theatlantic.com/thumbor/EzN397kNNrSmUeGu8HXn7Kk7nms=/0x93:1000x614/960x500/media/img/mt/2015/05/shutterstock_247399801/original.jpg",
      },
      {
        title: "Tomato (1Kg)",
        img: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
      },
    ];
  }

  // componentDidMount() {
  //   firebase
  //     .firestore()
  //     .collection("products")
  //     .get()
  //     .then(snapshot => {
  //       const products = snapshot.docs.map(doc => {
  //         const data = doc.data();
  //         data["id"] = doc.id;
  //         return data;
  //       });
  //       this.setState({ products: products, loading: false });
  //     });
  // }

  componentDidMount() {
    this.db
      .collection("products")
      // .where("price", "==", 999)
      // .where("title", "==", "Mug")
      .orderBy("price", "desc")
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({ products: products, loading: false });
      });
  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // });

    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({ qty: products[index].qty + 1 })
      .then(() => {
        console.log("Document updated sucessfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }
    // products[index].qty -= 1;

    // this.setState({
    //   products
    // });
    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({ qty: products[index].qty - 1 })
      .then(() => {
        console.log("Document updated sucessfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const docRef = this.db.collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("Deleted sucessfully");
      })
      .catch((err) => {
        console.log(err);
      });

    // const items = products.filter(product => product.id !== id);

    // this.setState({
    //   products: items
    // });
  };

  getcountOfCartItems = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  getcartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;

    products.map((product) => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return "";
    });

    return cartTotal;
  };

  addProduct = (opt) => {
    console.log(opt.title);
    this.db
      .collection("products")
      .add({
        img: opt.img,
        price: 100,
        qty: 1,
        title: opt.title,
      })
      .then((docRef) => {
        docRef.get().then((snapshot) => {
          console.log("Product has been added", snapshot.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { products, loading } = this.state;
    const ocf = this.addProduct;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />

        {this.options.map((opt) => {
          return (
            <button
              onClick={() => {
                ocf(opt);
              }}
              style={{ padding: 20, fontSize: 20 }}
            >
              {opt.title}
            </button>
          );
        })}
        <Cart
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          products={products}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : {this.getcartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
