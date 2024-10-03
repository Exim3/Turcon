import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import docview from "/documentView.svg";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDolorFormat } from "../../../utils/useDollorFormat";
import axiosInstance from "../../../utils/axiosInstance";
import { CircularProgress, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ExportIcon } from "../../../components/svg/Tick";
import * as XLSX from "xlsx";
import { Search } from "@mui/icons-material";
import debounce from "lodash.debounce";
import TimeStampDisplay from "../../../components/date/TimeStampDisplay";

interface Column {
  id:
    | "bookingId"
    | "companyName"
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
  { id: "bookingId", label: "Booking Id", minWidth: 130 },
  { id: "companyName", label: "Company Name", minWidth: 180 },
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
  userCompanyName: string;
  username: string;
  _id: string;
}

interface ExportData {
  bookingId: string;
  username: string;
  bookingDate: string;
  containerQuantity: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  totalAmount: string;
}

const AllOrders: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<Data[]>([]);
  const dolor = useDolorFormat;
  const [exportData, setExportData] = useState<ExportData[]>([]);
  const [totalOrder, setTotalOrder] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [filter, setFilter] = useState({
    companyNameFilter: "",
    bookingIdFilter: "",
  });

  console.log("data", rows);
  const fetchOrders = useCallback(
    debounce(async (filter) => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/api/order/getallorders", {
          params: {
            companyName: filter.companyNameFilter,
            bookingId: filter.bookingIdFilter,
            rowsPerPage: rowsPerPage,
            page: page,
          },
        });
        console.log(response, "pgno");
        setRows(response.data.orders);
        setTotalOrder(response.data.totalOrders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [rowsPerPage, page]
  );

  useEffect(() => {
    fetchOrders(filter);
  }, [filter, fetchOrders, page]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleExport = () => {
    updateExport();
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "export.xlsx");
  };

  const updateExport = () => {
    const data: ExportData[] = rows.map((row) => ({
      bookingId: row.bookingId,
      username: row.username,
      bookingDate: row.createdAt,
      containerQuantity: row.quantity || "N/A",
      paymentMethod: row.paymentMethod,
      paymentStatus: row.paymentStatus,
      orderStatus: row.orderStatus,
      totalAmount: dolor(Number(row.amount)),
    }));
    setExportData(data);
  };

  return (
    <>
      <div className="bg-[#F1F1F1]">
        <AdminHeader title={"Orders"} />
      </div>
      <div className="bg-[#F1F1F1] px-8 pt-4 flex flex-col gap-4 pb-6">
        <div className="flex items-center gap-6 justify-between">
          {/* boxes */}
        </div>

        <div>
          {/* heading */}
          <div className="px-4 py-3 flex justify-between items-center bg-[white] rounded-md">
            <div className="flex items-center gap-7">
              <p className="text-2xl font-semibold">Orders</p>

              <div className="relative ">
                <input
                  type="input"
                  placeholder="Search by BookingId"
                  name="bookingIdFilter"
                  onChange={handleInputChange}
                  value={filter.bookingIdFilter}
                  className="input input-bordered mx-auto placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
                <button>
                  <Search
                    sx={{
                      color: "#655F5F",
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "10px",
                      cursor: "pointer",
                    }}
                  />
                </button>
              </div>
              <div className="relative ">
                <input
                  type="input"
                  placeholder="Search by Company Name"
                  name="companyNameFilter"
                  onChange={handleInputChange}
                  value={filter.companyNameFilter}
                  className="input input-bordered mx-auto placeholder:text-sm border-[#DFE1E6] hover:bg-[#EBECF0] hover:border-[#DFE1E6] active:border-[#11A3FF] focus:outline-none"
                />
                <button>
                  <Search
                    sx={{
                      color: "#655F5F",
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "10px",
                      cursor: "pointer",
                    }}
                  />
                </button>
              </div>
            </div>
            <div>
              <button
                onClick={handleExport}
                className="w-full flex items-center gap-2 bg-[#8DF7E6] rounded-md p-3"
              >
                <span className="text-[#0E8773]">Export</span>{" "}
                <ExportIcon color="#0E8773" />
              </button>
            </div>
          </div>
          {/* table */}
          {loading ? (
            <div className="flex justify-center items-center h-screen bg-white">
              <CircularProgress />
            </div>
          ) : (
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
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                        >
                          {columns.map((column) => {
                            return (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                sx={{ padding: "8px" }}
                                className={`${
                                  column.id === "companyName"
                                    ? ""
                                    : "capitalize"
                                }`}
                              >
                                {column.id === "amount" ? (
                                  <> {dolor(Number(row.amount))}</>
                                ) : column.id === "bookingId" ? (
                                  <> {row.bookingId.toLocaleUpperCase()}</>
                                ) : column.id === "companyName" ? (
                                  <> {row.userCompanyName}</>
                                ) : column.id === "bookingDate" ? (
                                  <>
                                    <TimeStampDisplay
                                      timestamp={row.createdAt}
                                      withTime
                                    />{" "}
                                  </>
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
                rowsPerPageOptions={[5, 10, 50, 100]}
                component="div"
                count={totalOrder}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
