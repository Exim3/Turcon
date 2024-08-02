import React, { useState } from "react";
import { useNavigate } from "react-router";

const CartItem: React.FC<{
  id: string;
  name: string;
  size: string;
  location: string;
  country: string;
  type: string;
  price: number;
  quantity: number;
  condition: string;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}> = ({
  id,
  name,
  location,
  price,
  quantity,
  onIncrease,
  onDecrease,
  country,
  size,
  type,
  condition,
}) => (
  <div className="border flex flex-col gap-1 bg-gray-50 p-4">
    <div className="flex gap-2 items-center justify-around md:justify-between">
      <div>
        <img src="/cartContainer.png" alt={name} />
      </div>

      <div className="flex-col flex gap-2 w-1/2 md:w-auto text-center">
        <h2 className="font-semibold">
          {size} {condition} {name}
        </h2>
        <div className="flex gap-2 justify-center">
          <img src="/location.svg" alt="Location" />
          <p>
            {location}
            <span className="text-xs text-gray-400"> {country}</span>
          </p>
        </div>
        <div className="flex justify-around">
          <div className="chip inline">{type}</div>
          <p>${price}</p>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="flex justify-center text-center font-semibold items-center">
          <button
            className="w-8 h-8 rounded border-[#005E99] border-2 cursor-pointer"
            onClick={() => onDecrease(id)}
          >
            -
          </button>
          <div className="w-8 h-8 p-1 cursor-pointer">{quantity}</div>
          <button
            className="w-8 h-8 rounded border-[#005E99] border-2 cursor-pointer"
            onClick={() => onIncrease(id)}
          >
            +
          </button>
        </div>
      </div>

      <p className="hidden md:block text-xl text-[#15B097]">
        ${price * quantity}
      </p>

      <div className="p-2 md:flex hidden">
        <img src="/delete.svg" alt="Delete" />
      </div>
    </div>

    <div className="flex justify-around items-center">
      <div className="md:hidden block">
        <div className="flex justify-center text-center font-semibold items-center">
          <button
            className="w-8 h-8 rounded border-[#005E99] border-2 cursor-pointer"
            onClick={() => onDecrease(id)}
          >
            -
          </button>
          <div className="w-8 h-8 p-1 cursor-pointer">{quantity}</div>
          <button
            className="w-8 h-8 rounded border-[#005E99] border-2 cursor-pointer"
            onClick={() => onIncrease(id)}
          >
            +
          </button>
        </div>
      </div>

      <p className="md:hidden block text-xl text-[#15B097]">
        ${price * quantity}
      </p>

      <div className="p-2 flex md:hidden">
        <img src="/delete.svg" alt="Delete" />
      </div>
    </div>
  </div>
);

const Cart: React.FC = () => {
  const [cartCounts, setCartCounts] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const increaseItem = (id: string) => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) + 1,
    }));
  };

  const decreaseItem = (id: string) => {
    setCartCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 1) > 1 ? (prevCounts[id] || 1) - 1 : 1,
    }));
  };

  const items = [
    {
      id: "1",
      name: "Container",
      location: "Chennai",
      price: 1500,
      type: "New",
      country: "India",
      size: "20'ft",
      condition: "Dry",
    },
    {
      id: "2",
      name: "Container",
      location: "Mumbai",
      price: 800,
      type: "Scrab",
      country: "India",
      size: "40'ft",
      condition: "Standard",
    },
  ];

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * (cartCounts[item.id] || 1),
    0
  );

  return (
    <div className="container mx-auto">
      <div className="flex-col flex gap-4 my-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-2">
            <div className="text-3xl">Cart</div>
            <div className="text-xs">home / Inventory/Cart</div>
          </div>
          <div className="btn btn-secondbtn" onClick={handleBack}>
            Back
          </div>
        </div>
        <div className="flex flex-col lg:flex-row py-6 gap-10">
          <div className="lg:w-2/3 flex flex-col gap-2">
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                location={item.location}
                price={item.price}
                quantity={cartCounts[item.id] || 1}
                onIncrease={increaseItem}
                onDecrease={decreaseItem}
                country={item.country}
                type={item.type}
                size={item.size}
                condition={item.condition}
              />
            ))}
          </div>

          <div className="p-6 Summary bg-[#FAFAFA] w-full lg:w-1/3 mx-auto">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl text-center">Summary</h2>

              <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                  <p>Items</p>
                  <p>{items.length}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total Amount</p>
                  <p className="text-[#15B097] text-xl">${totalAmount}</p>
                </div>
              </div>

              <div className="btn btn-prime">Check Out</div>

              <div className="flex items-start gap-2">
                <img src="/info.svg" alt="Info" className="w-3 pt-1" />
                <p className="text-[#008FE8] text-sm">
                  The prices in your cart may have changed or might change due
                  to market updates. Please review the new prices before
                  checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
