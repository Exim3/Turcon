import React from "react";
import emptyOrder from "/emptyOrder.svg";
import { Link } from "react-router-dom";

const NoOrder: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center py-32">
      <div className="w-40">
        <img src={emptyOrder} alt="emptyOrder" />
      </div>
      <h2 className="text-xl text-[#655F5F]">Your Order Is Empty</h2>
      <div>
        <Link className="text-primary font-semibold" to={"/buy/inventory"}>
          go to Inventory
        </Link>
      </div>
    </div>
  );
};

export default NoOrder;
