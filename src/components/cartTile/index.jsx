import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";

function CartTile({ singleCartItem }) {
  const { handleRemoveFromCart, handleAddToCart } =
    useContext(ShoppingCartContext);

  console.log("tis is single cart item", singleCartItem);
  return (
    <Fragment>
      <div className="grid grid-cols-3 items-start gap-5 background-white">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              src={singleCartItem?.thumbnail}
              className="w-full h-full object-contain "
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 text-white">
              {singleCartItem?.title}
            </h3>
            <button
              className="text-sm px-4 py-3 bg-black text-white font-extrabold"
              onClick={() => handleRemoveFromCart(singleCartItem, true)}
            >
              REMOVE
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900 text-white">
            Total Price is ${singleCartItem.totalPrice}
          </h3>
          <p
            className="mt-2 mb-3 font-bolf text-[16px]text-white
          "
          >
            Quantity: {singleCartItem.quantity}
          </p>
          <div className="mt-3">
            <button
              className="disabled:opacity-65 border border-[#000]"
              onClick={() => handleRemoveFromCart(singleCartItem, false)}
              disabled={singleCartItem.quantity == 1}
            >
              -
            </button>
            <button
              className="border border-[#000]"
              onClick={() => handleAddToCart(singleCartItem)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-500" />
    </Fragment>
  );
}

export default CartTile;
