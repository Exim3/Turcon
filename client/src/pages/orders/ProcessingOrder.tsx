import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../utils/AuthContext";
import { useDolorFormat } from "../../utils/useDollorFormat";
import NoOrder from "../../components/emptyOrder/NoOrder";
import { Link } from "react-router-dom";
const ProcessingOrder = () => {
  interface Item {
    condition: string;
    country: string;
    createdAt: string;
    itemcount: number;
    portLocation: string;
    sellerId: [object];
    size: string;
    stockCount: number;
    price: string;
    updatedAt: string;
    userId: string;
    type: string;
    _id: string;
  }

  interface Order {
    paymentStatus: string;
    orderStatus: string;
    items: Item[];
    bookingId: string;
    _id: string;
    paymentMethod: string;
    userDetails: {
      fullName: string;
      phone: string;
      email: string;
    };
    createdAt: string;
    tax: number;
    totalAmount: number;
    totalPrice: number;
  }

  const [orders, setOrders] = useState<Order[]>([]);

  const { user } = useAuth();
  const userId = user?.id || "";

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const dollor = useDolorFormat;

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/api/order/getbyuser", {
        params: { userId, orderStatus: "processing" },
      });
      setOrders(response.data?.orders || []);
      console.log(response, "res");
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      {orders.length === 0 && <NoOrder />}
      <div className="grid grid-cols-3 gap-8 text-sm ">
        {orders?.map((order, index) => (
          <div
            key={index}
            className="flex-col flex px-6 py-4 border justify-between gap-2 bg-[#FAFAFA] capitalize rounded-md"
          >
            <div className="ms-auto mb-1">
              <span
                className={`text-xs px-3 py-1 font-semibold text-end ${
                  order.orderStatus === "invoice"
                    ? "text-[#00B3FF] bg-[#EEFAFF]"
                    : order.orderStatus === "processing"
                    ? "text-[#221F1F] bg-[#E4E4E4]"
                    : order.orderStatus === "cancelled"
                    ? "text-[#C03744] bg-[#FFEEEE]"
                    : order.orderStatus === "collected"
                    ? "text-[#15B097] bg-[#DAFFF9]"
                    : ""
                }  rounded-md`}
              >
                {order.orderStatus}
              </span>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              <div className="flex flex-col gap-1">
                <h4 className="text-sm  font-semibold">Booking Id</h4>
                <span className="text-[#655F5F] text-sm">
                  {order.bookingId.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-semibold text-end">
                  Order Date/time
                </h4>
                <span className="text-[#655F5F] text-sm">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="w-full text-sm flex flex-col gap-2 px-2 rounded-sm py-2 bg-[#e4e4e4]">
                <tr className="flex items-center justify-between font-semibold ">
                  <td className="w-1/2">Container</td>
                  <td>Quantity</td>
                  <td>Total Unit</td>
                </tr>
                {order.items?.slice(0, 2).map((item, index) => (
                  <tr key={index} className="flex items-center justify-between">
                    <td className="w-1/2">
                      {item.condition}-{item.size}
                    </td>
                    <td>{item.itemcount}</td>
                    <td>{dollor(item.itemcount * parseFloat(item.price))}</td>
                  </tr>
                ))}
                {order.items?.length > 2 && <span>more...</span>}
              </div>
            </div>
            <div className="divider p-0 m-0"></div>
            <div className="flex items-center justify-between">
              <h3 className=" text-lg font-semibold">Total Amount</h3>
              <span className="  text-[#15B097]">
                {dollor(Number(order.totalAmount))}
              </span>
            </div>
            <div className="flex items-center flex-wrap justify-between">
              <div>
                <h4 className="font-semibold">Payment Method</h4>
                <p className="text-[#655F5F] text-sm font-semibold  capitalize">
                  {order.paymentMethod} Transfer
                </p>
              </div>
              <div className="">
                <h4 className="font-semibold ">Payment Status</h4>
                <p
                  className={`font-semibold  text-sm capitalize text-end ${
                    order.paymentStatus === "done"
                      ? "text-[#15B097]"
                      : "text-[#C03744]"
                  }`}
                >
                  {order.paymentStatus}
                </p>
              </div>
            </div>
            <Link
              className="btn bg-secondary hover:bg-secondary text-white"
              to={`/buy/orderview/${order._id}`}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProcessingOrder;
