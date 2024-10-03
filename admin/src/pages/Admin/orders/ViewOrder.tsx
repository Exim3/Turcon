import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import { useParams } from "react-router";
import { useDolorFormat } from "../../../utils/useDollorFormat";
import axiosInstance from "../../../utils/axiosInstance";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  Alert,
  TableHead,
} from "@mui/material";
import TimeStampDisplay from "../../../components/date/TimeStampDisplay";

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
interface Column {
  id: "container" | "location" | "quantity" | "price" | "totalprice";
  label: string;
  minWidth?: number;
  align?: "center" | "right";
  format?: (value: number) => string;
}

interface UpdateStatus {
  orderStatus: string;
  paymentStatus: string;
}

const ViewOrder: React.FC = () => {
  const { id } = useParams();
  const [order, setOrders] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>({
    orderStatus: "",
    paymentStatus: "",
  });
  console.log(updateStatus, "updates");

  // const dollor = useDolorFormat;

  const columns: Column[] = [
    { id: "container", label: "Container" },
    { id: "location", label: "Location", align: "center" },
    {
      id: "quantity",
      label: "Quantity",
      align: "center",
    },
    {
      id: "price",
      label: "Per Unit",
      align: "center",
    },
    {
      id: "totalprice",
      label: "Total Price",
      align: "right",
    },
  ];
  const handleChangeInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateStatus((prevStatus) => ({ ...prevStatus, [name]: value }));
  };

  const dollor = useDolorFormat;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/order/getbyid", {
        params: { orderId: id },
      });
      const orderData = response.data?.orders[0] || null;
      setOrders(orderData);
      setError(null);
      if (orderData) {
        setUpdateStatus({
          orderStatus: orderData.orderStatus,
          paymentStatus: orderData.paymentStatus,
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch order details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateOrderStatus = useCallback(async () => {
    if (!order?._id) return;

    try {
      await axiosInstance.put("/api/order/updatebyid", {
        updateStatus,
        orderId: order._id,
      });
      fetchOrders(); // Refresh order details
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update order status.");
    }
  }, [order, updateStatus, fetchOrders]);

  useEffect(() => {
    if (id) {
      fetchOrders();
    }
  }, [id, fetchOrders]);

  useEffect(() => {
    if (
      order &&
      (updateStatus.orderStatus !== order.orderStatus ||
        updateStatus.paymentStatus !== order.paymentStatus)
    ) {
      updateOrderStatus();
    }
  }, [updateStatus, order, updateOrderStatus]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert severity="info">No order found.</Alert>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#F1F1F1] ">
        <AdminHeader
          title={"Order View"}
          breadCrums="orders / orderView"
          breadlinks="orders"
        />
      </div>
      <div className="bg-[#F1F1F1] px-8 pt-4 flex flex-col gap-4 pb-6">
        <div className="bg-white p-4 rounded-xl flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#221F1F] ">Order View</h2>
          <div className="flex items-center w-2/3 gap-6">
            <div className="flex w-full items-center justify-end gap-1">
              <label htmlFor="orderStatus" className="text-sm font-semibold">
                Order Status
              </label>
              <select
                id="orderStatus"
                className="select placeholder:text-sm placeholder:font-semibold select-bordered w-full max-w-[165px] focus:outline-none h-full bg-[#FAFAFA] rounded-sm"
                value={updateStatus.orderStatus || order.orderStatus}
                onChange={handleChangeInput}
                name="orderStatus"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="processing">Processing</option>
                <option value="invoice">Invoice</option>
                <option value="collected">Collected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex w-full items-center justify-end gap-1">
              <label htmlFor="paymentStatus" className="text-sm font-semibold">
                Payment Status
              </label>
              <select
                id="paymentStatus"
                className="select select-bordered w-full max-w-[165px] focus:outline-none h-full bg-[#FAFAFA] rounded-sm"
                value={updateStatus.paymentStatus || order.paymentStatus}
                onChange={handleChangeInput}
                name="paymentStatus"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="pending">Pending</option>
                <option value="done">Done</option>
              </select>
            </div>
            {/* <div className="btn btn-prime" onClick={updateMailCall}>
              update
            </div> */}
          </div>
        </div>
        <div className="flex bg-white flex-col gap-3 px-8 py-8 shadow-[0px_0px_4px_rgb(0,0,0,0.2)] rounded-xl capitalize">
          <div className="flex justify-between items-center">
            <h3 className="text-xl xl:text-2xl font-semibold">Order Details</h3>
            <div
              className={`p-3 ${
                order.orderStatus === "invoice"
                  ? "text-[#00B3FF] bg-[#EEFAFF]"
                  : order.orderStatus === "processing"
                  ? "text-[#221F1F] bg-[#E4E4E4]"
                  : order.orderStatus === "cancelled"
                  ? "text-[#C03744] bg-[#FFEEEE]"
                  : order.orderStatus === "collected"
                  ? "text-[#15B097] bg-[#DAFFF9]"
                  : ""
              } rounded-md`}
            >
              <p className="text-sm capitalize">{order.orderStatus}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between lg:items-center">
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">Booking Id</h4>
              <span className="text-[#655F5F] text-sm">
                {order.bookingId.toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">
                Order Date/time
              </h4>
              <span className="text-[#655F5F] text-sm">
                {" "}
                <TimeStampDisplay timestamp={order.createdAt} withTime />
              </span>
            </div>
          </div>
          <div className="divider p-0 m-0"></div>
          <div className="flex flex-wrap lg:items-center justify-between border-[#E4E4E4] lg:text-center">
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">
                Customer Name
              </h4>
              <span className="text-[#221F1F] text-sm">
                {order.userDetails?.fullName}
              </span>
            </div>
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">Phone No</h4>
              <span className="text-[#221F1F] text-sm">
                {order.userDetails?.phone}
              </span>
            </div>
            <div>
              <h4 className="text-sm xl:text-xl font-semibold">Email</h4>
              <span className="text-[#221F1F] text-sm">
                {order.userDetails?.email}
              </span>
            </div>
          </div>
          <div className="divider p-0 m-0"></div>
          <div className="flex flex-col p-3 gap-3 bg-[#fafafa] rounded-md">
            <h2 className="text-2xl font-semibold">Description</h2>
            <Paper sx={{ width: "100%", boxShadow: "none" }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            background: "#E4E4E4",
                          }}
                        >
                          <span className="font-semibold"> {column.label}</span>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={item._id}
                        sx={{
                          background: "#fafafa",
                          border: "none !important",
                          "&:hover": {
                            backgroundColor: "#fafafa !important",
                          },
                        }}
                      >
                        {columns.map((column) => {
                          let cellValue;

                          switch (column.id) {
                            case "container":
                              cellValue = `${item.condition} - ${item.size}`;
                              break;
                            case "location":
                              cellValue = `${item.country} - ${item.portLocation}`;
                              break;
                            case "quantity":
                              cellValue = item.itemcount;
                              break;
                            case "price":
                              cellValue = dollor(Number(item.price));
                              break;
                            case "totalprice":
                              cellValue = dollor(
                                item.itemcount * parseFloat(item.price)
                              );
                              break;
                            default:
                              cellValue = "N/A";
                              break;
                          }

                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ padding: "8px", borderBottom: "none" }}
                            >
                              {cellValue}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <div className="divider p-0 m-0"></div>
            <div className="flex justify-between flex-col text-center md:w-1/3 md:ml-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Amount</h3>
                <span className="text-lg">
                  {dollor(Number(order.totalPrice))}
                </span>
              </div>
              {/* <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Tax(10%)</h3>
                <span className="text-lg ">{dollor(Number(order.tax))}</span>
              </div> */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Total Amount</h3>
                <span className="text-lg text-[#15B097]">
                  {dollor(Number(order.totalAmount))}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-between">
            <div>
              <h4 className="text-lg ">Payment Method</h4>
              <p className="text-[#655F5F] text-sm font-semibold capitalize">
                {order.paymentMethod} Transfer
              </p>
            </div>
            <div className="">
              <h4 className="text-lg">Payment Status</h4>
              <p
                className={`font-semibold  text-sm capitalize ${
                  order.paymentStatus === "done"
                    ? "text-[#15B097]"
                    : "text-[#C03744]"
                }`}
              >
                {order.paymentStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewOrder;
