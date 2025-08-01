//create the context
//provide the state to context
//wrap context in root component
//consume the context using useContext

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProducts() {
    setLoading(true);
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();

    if (result && result?.products) {
      setListOfProducts(result?.products);
      setLoading(false);
    }
  }

  function handleAddToCart(getProductDetails) {
    // console.log("handle add to cart called");
    // console.log(getProductDetails.id);
    let cpyCartItems = [...cartItems];
    const findIndexOfProduct = cpyCartItems.findIndex(
      (cartItem) => cartItem.id === getProductDetails.id
    );
    console.log(findIndexOfProduct);

    if (findIndexOfProduct === -1) {
      cpyCartItems.push({
        ...getProductDetails,
        quantity: 1,
        totalPrice: getProductDetails?.price,
      });
    } else {
      console.log("its coming her");
      cpyCartItems[findIndexOfProduct] = {
        ...cpyCartItems[findIndexOfProduct],
        quantity: cpyCartItems[findIndexOfProduct].quantity + 1,
        totalPrice:
          (cpyCartItems[findIndexOfProduct].quantity + 1) *
          (cpyCartItems[findIndexOfProduct].price),
      };
    }

    setCartItems(cpyCartItems);

    localStorage.setItem("cartItems", JSON.stringify(cpyCartItems));
    navigate("/cart");
  }

  function handleRemoveFromCart(getProductDetails, isFullyRemovedFromCart) {
    let cpyExistingCartItems = [...cartItems];
    const findIndexOfExistingCartItem = cpyExistingCartItems.findIndex(
      (singleProduct) => singleProduct.id === getProductDetails.id
    );
    if (isFullyRemovedFromCart) {
      cpyExistingCartItems.splice(findIndexOfExistingCartItem, 1);
    } else {
      cpyExistingCartItems[findIndexOfExistingCartItem] = {
        ...cpyExistingCartItems[findIndexOfExistingCartItem],
        quantity: cpyExistingCartItems[findIndexOfExistingCartItem].quantity - 1,
        totalPrice:
          (cpyExistingCartItems[findIndexOfExistingCartItem].quantity - 1) *
          cpyExistingCartItems[findIndexOfExistingCartItem].price,
      };
    }
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingCartItems));
    setCartItems(cpyExistingCartItems);
  }

  useEffect(() => {
    fetchListOfProducts();
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  // we have to print here prevly we are clging inside the ifelse
  console.log("inside the context cartitems", cartItems);

  // one mistake musthave to share value inside the value
  return (
    <ShoppingCartContext.Provider
      value={{
        listOfProducts,
        loading,
        setLoading,
        productDetails,
        setProductDetails,
        handleAddToCart,
        cartItems,
        handleRemoveFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
