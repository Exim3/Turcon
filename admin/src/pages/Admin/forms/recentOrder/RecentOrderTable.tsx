import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import docview from "/documentView.svg";

import { useDolorFormat } from "../../../../utils/useDollorFormat";
import debounce from "lodash.debounce";
import axiosInstance from "../../../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { useState } from "react";

interface Column {
  id:
    | "bookingId"
    | "username"
    | "bookingDate"
    | "containerQuantity"
    | "amount"
    | "paymentStatus"
    | "orderStatus"
    | "paymentMethod"
    | "action";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "bookingId", label: "Booking Id", minWidth: 160 },
  { id: "username", label: "User Name", minWidth: 130 },
  { id: "bookingDate", label: "Booking Date", minWidth: 165 },
  {
    id: "containerQuantity",
    label: "Container Quantity",
    minWidth: 100,
    align: "center",
  },
  { id: "paymentMethod", label: "payment Method", minWidth: 110 },
  { id: "paymentStatus", label: "Payment Status", minWidth: 110 },
  { id: "orderStatus", label: "Order Status", minWidth: 110 },

  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 108,
    align: "center",
  },
];

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
interface Data {
  bookingId: string;
  amount: string;
  createdAt: string;
  items: Item[];
  orderStatus: string;
  quantity?: string;
  paymentStatus: string;
  paymentMethod: string;
  userEmail: string;
  userPhone: string;
  username: string;
  _id: string;
}

export default function RecentOrderTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Data[]>([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const dolor = useDolorFormat;

  const fetchOrders = React.useCallback(
    debounce(async () => {
      try {
        const response = await axiosInstance.get("/api/order/getallorders", {
          params: {
            rowsPerPage: rowsPerPage,
            page: page,
          },
        });
        setRows(response.data.orders);
        setTotalOrder(response.data.totalOrders);
      } catch (error) {
        console.error(error);
      }
    }, 500),
    [rowsPerPage, page]
  );
  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
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
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{ padding: "8px" }}
                        className={`${
                          column.id === "username" ? "" : "capitalize"
                        }`}
                      >
                        {column.id === "amount" ? (
                          <> {dolor(Number(row.amount))}</>
                        ) : column.id === "bookingId" ? (
                          <> {row.bookingId.toLocaleUpperCase()}</>
                        ) : column.id === "username" ? (
                          <> {row.username}</>
                        ) : column.id === "bookingDate" ? (
                          <> {row.createdAt}</>
                        ) : column.id === "containerQuantity" ? (
                          <> {row.quantity}</>
                        ) : column.id === "paymentMethod" ? (
                          <>{`${row.paymentMethod} Transfer`}</>
                        ) : column.id === "paymentStatus" ? (
                          <span
                            style={{
                              backgroundColor:
                                row.paymentStatus === "pending"
                                  ? "#F7C78D"
                                  : row.paymentStatus === "done"
                                  ? "#8DF7E6"
                                  : "#f1f1f1",
                              color:
                                row.paymentStatus === "pending"
                                  ? "#87500E"
                                  : row.paymentStatus === "done"
                                  ? "#0E8773"
                                  : "#221F1F",
                            }}
                            className="font-semibold text-xs px-2 py-1 rounded"
                          >
                            {row.paymentStatus}
                          </span>
                        ) : column.id === "orderStatus" ? (
                          <span
                            style={{
                              backgroundColor:
                                row.orderStatus === "invoice"
                                  ? "#EEFAFF"
                                  : row.orderStatus === "processing"
                                  ? "#E4E4E4"
                                  : row.orderStatus === "cancelled"
                                  ? "#FFEEEE"
                                  : row.orderStatus === "collected"
                                  ? "#DAFFF9"
                                  : "#f1f1f1",
                              color:
                                row.orderStatus === "invoice"
                                  ? "#00B3FF"
                                  : row.orderStatus === "processing"
                                  ? "#221F1F"
                                  : row.orderStatus === "cancelled"
                                  ? "#C03744"
                                  : row.orderStatus === "collected"
                                  ? "#15B097"
                                  : "#221F1F",
                            }}
                            className="font-semibold  text-xs px-2 py-1 rounded"
                          >
                            {row.orderStatus}
                          </span>
                        ) : column.id === "action" ? (
                          <Link to={`/orders/${row._id}`}>
                            <IconButton aria-label="send email">
                              <img src={docview} alt="" />
                            </IconButton>
                          </Link>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={totalOrder}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
