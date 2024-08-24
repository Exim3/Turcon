import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { SetCartCount } from "../../store/slice/containerCount";
import cartEmpty from "/cartEmpty.png";
import locationIcon from "/location.svg";
import containerImg from "/cartContainer.png";
import deleteIcon from "/delete.svg";
import infoIcon from "/info.svg";
import axiosInstance from "../../utils/axiosInstance";

export const UsFormat = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  return formattedAmount;
};

const CartItem: React.FC<{
  _id: string;
  name: string;
  size: string;
  portLocation: string;
  country: string;
  type: string;
  price: number;
  quantity: number;
  condition: string;
  availableStock: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onDelete: (id: string, userId: string) => void;
  userId: string;
}> = ({
  _id,
  name,
  portLocation,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
  country,
  size,
  type,
  condition,
  availableStock,
  userId,
}) => {
  const UsFormat = (amount: number) => {
    const formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    return formattedAmount;
  };
  return (
    <div className="border flex flex-col gap-1 bg-gray-50 p-4 rounded-md">
      <div className="flex gap-2 items-center  md:justify-between ">
        <div className="flex ">
          <div className="flex flex-col gap-2">
            <div className="flex items-center ">
              <div>
                <img src={locationIcon} alt="Location" />
              </div>
              <p>
                {portLocation}
                <span className="text-xs text-gray-400"> {country}</span>
              </p>
            </div>
            <div className="flex items-start gap-4 ">
              <div>
                <img src={containerImg} alt={name} />
              </div>

              <div className="flex-col flex gap-2 w-1/2 md:w-auto text-center">
                <h2 className="font-semibold text-start">
                  {size} {type} {name}
                </h2>

                <div className="flex justify-between">
                  <div className="chip inline">{condition}</div>
                </div>
                <p className="text-start">{UsFormat(price)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-3">
          <div className="flex justify-center text-center font-semibold items-center">
            <button
              className="w-6 h-6 rounded flex justify-center items-center border-[#005E99] border-2 cursor-pointer"
              onClick={() => onDecrease(_id)}
            >
              -
            </button>
            <div className="w-6 h-6  cursor-pointer">{quantity}</div>
            <button
              className="w-6 h-6 rounded flex justify-center items-center border-[#005E99] border-2 cursor-pointer"
              onClick={() => availableStock > quantity && onIncrease(_id)}
              disabled={quantity >= availableStock}
            >
              +
            </button>
          </div>
          <p className="text-xs text-center mt-1  border rounded-full px-2 py-1 bg-white">
            {availableStock >= 1 ? "Available Stocks" : "Out Of Stock"}:{" "}
            {availableStock}
          </p>
        </div>

        <div className="hidden md:flex flex-col gap-4">
          <h3 className="text-center">Total Price</h3>
          <p className=" text-xl text-[#15B097]">
            {UsFormat(price * quantity)}
          </p>
        </div>

        <div className="p-2 md:flex hidden">
          <img
            src={deleteIcon}
            alt="Delete"
            className="cursor-pointer"
            onClick={() => onDelete(_id, userId)}
          />
        </div>
      </div>

      <div className="flex md:hidden justify-between items-center">
        <div className="">
          <div className="flex justify-center text-center font-semibold items-center">
            <button
              className="w-6 h-6 rounded flex justify-center items-center border-[#005E99] border-2 cursor-pointer"
              onClick={() => onDecrease(_id)}
            >
              -
            </button>
            <div className="w-6 h-6 cursor-pointer">{quantity}</div>
            <button
              className="w-6 h-6 rounded flex justify-center items-center border-[#005E99] border-2 cursor-pointer"
              onClick={() => availableStock > quantity && onIncrease(_id)}
              disabled={quantity >= availableStock}
            >
              +
            </button>
          </div>
          <p className="text-xs text-center mt-1  border rounded-full px-2 py-1 ">
            {availableStock >= 1 ? "Available Stocks" : "Out Of Stock"}:{" "}
            {availableStock}
          </p>
        </div>

        <p className="text-xl text-[#15B097]">{UsFormat(price * quantity)}</p>

        <div className="p-2 flex ">
          <img
            src={deleteIcon}
            alt="Delete"
            className="cursor-pointer"
            onClick={() => onDelete(_id, userId)}
          />
        </div>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const [cartCounts, setCartCounts] = useState<{ [key: string]: number }>({});
  const [items, setItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const userId = "669dfb8fe54022e071ed16fe";

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get(`/api/cart/getcart`, {
        params: { userId },
      });
      setItems(response.data);

      dispatch(SetCartCount(response.data.length));

      const initialCounts = response.data.reduce(
        (acc: { [key: string]: number }, item: any) => {
          acc[item._id] = item.itemcount;
          return acc;
        },
        {}
      );
      setCartCounts(initialCounts);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const updateCart = async (_id: string, newQuantity: number) => {
    try {
      await axiosInstance.put(`/api/cart/updatecart`, null, {
        params: {
          quantity: newQuantity,
          itemId: _id,
        },
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const increaseItem = async (_id: string) => {
    const item = items.find((item) => item._id === _id);
    if (!item) return;

    const currentQuantity = cartCounts[_id] || 1;
    const availableStock = item.stockCount;

    if (currentQuantity < availableStock) {
      const newQuantity = currentQuantity + 1;
      setCartCounts((prevCounts) => ({ ...prevCounts, [_id]: newQuantity }));

      await updateCart(_id, newQuantity);
    }
  };

  const decreaseItem = async (_id: string) => {
    const newQuantity = Math.max((cartCounts[_id] || 1) - 1, 1);
    setCartCounts((prevCounts) => ({ ...prevCounts, [_id]: newQuantity }));
    await updateCart(_id, newQuantity);
  };

  const deleteItem = async (_id: string, userId: string) => {
    try {
      await axiosInstance.delete(`/api/cart/deletecart`, {
        params: {
          userId,
          itemId: _id,
        },
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * (cartCounts[item._id] || 1),
    0
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto">
      <div className="flex-col flex gap-4 my-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <div className="text-xl md:text-3xl text-[#0B0A0A]">Cart</div>
            <div className="text-[10px] md:text-sm text-[#7A7474]">
              {" "}
              <Link to={"/"}>home</Link> /{" "}
              <Link to={"/buy/inventory"}>Inventory</Link>/{" "}
              <span className="font-semibold text-[#0B0A0A]">Cart</span>
            </div>
          </div>
          <div className="btn btn-secondbtn" onClick={handleBack}>
            Back
          </div>
        </div>
        <div className="flex flex-col lg:flex-row py-6 gap-10">
          {items.length > 0 ? (
            <>
              <div className="lg:w-2/3 flex flex-col gap-2">
                {items.map((item) => (
                  <CartItem
                    key={item._id}
                    _id={item._id}
                    name={item.name}
                    portLocation={item.portLocation}
                    price={item.price}
                    quantity={cartCounts[item._id] || 1}
                    onIncrease={increaseItem}
                    onDecrease={decreaseItem}
                    onDelete={deleteItem}
                    country={item.country}
                    type={item.type}
                    size={item.size}
                    condition={item.condition}
                    availableStock={item.stockCount}
                    userId={userId}
                  />
                ))}
              </div>
              <div className="p-6 Summary bg-[#FAFAFA] w-full lg:w-1/3 mx-auto rounded-md">
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl text-center">Summary</h2>

                  <div className="flex flex-col gap-6">
                    <div className="flex justify-between">
                      <p className="text-xl">Items</p>
                      <p className=" text-xl font-semibold ">{items.length}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-xl">Total Amount</p>
                      <p className="text-[#15B097] text-xl font-semibold ">
                        {UsFormat(totalAmount)}
                      </p>
                    </div>
                  </div>

                  <Link className="btn btn-prime" to={"/buy/review"}>
                    Check Out
                  </Link>

                  <div className="flex items-start gap-2">
                    <img src={infoIcon} alt="Info" className="w-3 pt-1" />
                    <p className="text-[#008FE8] text-sm">
                      The prices in your cart may have changed or might change
                      due to market updates. Please review the new prices before
                      checkout.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full flex flex-col gap-6 text-center py-4">
              <div className="w-1/2 sm:w-1/3 md:w-1/5 mx-auto text-[#d7f0ff]">
                <img src={cartEmpty} alt="cartEmpty" />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-xl md:text-2xl">Your Cart Is Empty</p>
                <Link className="text-primary underline" to={"/buy/inventory"}>
                  Go to Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
