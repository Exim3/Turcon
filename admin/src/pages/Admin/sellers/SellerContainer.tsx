import React from "react";
import AdminHeader from "../../../components/adminHeader/AdminHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
// import * as XLSX from "xlsx";

import { ChangeEvent, useCallback, useEffect, useState } from "react";

import debounce from "lodash.debounce";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../../utils/axiosInstance";
import { useDolorFormat } from "../../../utils/useDollorFormat";
import { useParams } from "react-router";
import { WarningIcon } from "../../../components/svg/Tick";
import { toast } from "react-toastify";

interface Column {
  id:
    | "container"
    | "size"
    | "condition"
    | "country"
    | "portLocation"
    | "price"
    | "quantity";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "container", label: "Container", minWidth: 150 },
  { id: "size", label: "Size", minWidth: 71 },
  {
    id: "condition",
    label: "Condition",
    minWidth: 100,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  { id: "country", label: "Country", minWidth: 120 },
  { id: "portLocation", label: "Port", minWidth: 120 },
  { id: "price", label: "Price", minWidth: 70, align: "center" },
  { id: "quantity", label: "Quantity", minWidth: 88, align: "center" },
];

interface Data {
  type: string;
  size: string;
  condition: string;
  country: string;
  portLocation: string;
  price: string;
  stockCount: string;
  _id: string;
}
interface SellerData {
  _id: string;
  sellerName: string;
  containers: any[];
  contactPerson: any[];
  address: string;
}
// interface ExportData {
//   type: string;
//   size: string;
//   condition: string;
//   stockCount: string;
//   portLocation: string;
//   country: string;
//   price: string;
// }
interface Stock {
  type: string;
  size: string;
  condition: string;
  stockCount: number;
  portLocation: string;
  country: string;
  price: number;
}

const SellerContainer: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [exportData, setExportData] = useState<ExportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [update, setUpdate] = useState<boolean>(false);
  const [updateStockInputValue, setUpdateStockInputValue] = useState("");

  const [rows, setRows] = useState<Data[]>([]);
  const [totalcontainers, setTotalContainers] = useState(0);
  const [seller, setSeller] = useState<SellerData | undefined>(undefined);

  const [filter, setFilter] = useState({
    country: "",
    size: "",
    port: "",
    condition: "",
    type: "",
  });
  const { sellerId } = useParams();
  // const navigate = useNavigate();

  const fetchContainers = useCallback(
    debounce(async (filter) => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/api/seller/getsellercontainer",
          {
            params: {
              country: filter.country,
              port: filter.port,
              size: filter.size,
              type: filter.type,
              condition: filter.condition,
              rowsPerPage: rowsPerPage,
              page: page,
              sellerId,
            },
          }
        );
        setRows(response.data?.containers);
        console.log(response, "containers", rows);
        setTotalContainers(response.data.totalContainers);
        setSeller(response.data.sellerName || undefined);
        console.log(seller);
      } catch (error: any) {
        console.error(error);
        setError(error?.response.data.error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [rowsPerPage, page]
  );

  useEffect(() => {
    fetchContainers(filter);
  }, [filter, fetchContainers, page]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "updatestocks") {
      setUpdateStockInputValue(value);
    } else {
      setFilter({ ...filter, [name]: value });
    }
  };

  const HandleUpdateStocks = async () => {
    try {
      const parsedData: Stock[] = JSON.parse(updateStockInputValue);
      if (!Array.isArray(parsedData)) {
        throw new Error("Invalid data structure");
      }
      setUpdateError("");
      try {
        const response = await axiosInstance.put(
          "api/seller/updatecontainer",
          { containers: parsedData },
          {
            params: {
              sellerId,
            },
          }
        );

        // Handle the response from the server
        if (response.data.errors) {
          // If there are errors returned from the server, format and set them
        } else {
          // Handle successful response
          console.log("Update successful:", response.data);
          if (response.data.message) {
            toast.success(response.data.message);
            fetchContainers(filter);
            setUpdate(false);
          }
          setUpdateStockInputValue("");
        }
      } catch (error: any) {
        // Handle errors from the API request

        const detailedErrors = error.response.data.errors[0].errors;

        setUpdateError(
          `Stocks are not updated due to ${detailedErrors} in one of the container,`
        );

        console.error("API error:", error);
      }
    } catch (error) {
      setUpdateError("Invalid JSON format or data structure");
      console.error("Error:", error);
    }
  };

  // const handleExport = () => {
  //   updateExport();
  //   const worksheet = XLSX.utils.json_to_sheet(exportData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   XLSX.writeFile(workbook, "export.xlsx");
  // };
  // const updateExport = () => {
  //   const data: ExportData[] = rows.map((row) => ({
  //     type: row.type,
  //     size: row.size,
  //     condition: row.condition,
  //     stockCount: row.stockCount,
  //     portLocation: row.portLocation,
  //     country: row.country,
  //     price: row.price,
  //   }));
  //   setExportData(data);
  // };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      {update && (
        <>
          <div className="fixed inset-0 bg-black opacity-30 z-40 "></div>
          <div className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="flex flex-col gap-4 py-5 px-6  w-[624px] bg-white rounded-xl">
              <h2 className="text-2xl font-semibold text-center">
                Update Stocks{" "}
              </h2>
              <div className="flex items-center py-1 px-2 gap-2">
                <span>
                  <WarningIcon color="#E49C44" />
                </span>
                <h3 className="text-[#E49C44] text-sm">
                  Warning: Input must follow the format: Size, Type, Condition
                  without any spaces at the beginning or end. Example:
                </h3>
              </div>
              <div className="flex flex-col gap-1 px-2 py-1">
                {/* type */}
                <h4 className="font-semibold">TYPE</h4>
                <div className="flex items-center gap-x-3 px-2 flex-wrap text-sm">
                  <span>DRY</span>
                  <span>|</span>
                  <span>OPENTOP</span>
                  <span>|</span>
                  <span>FLATRACK</span>
                  <span>|</span>
                  <span>TANKS</span>
                  <span>|</span>
                  <span>REEFERS</span>
                </div>
                {/* size */}
                <h4 className="font-semibold">SIZE</h4>
                <div className="flex items-center gap-x-3 px-2 flex-wrap text-sm">
                  <span>20’FT</span>
                  <span>|</span>
                  <span>40’FT</span>
                  <span>|</span>
                  <span>45'FT</span>
                  <span>|</span>
                  <span>20’FT HC</span>
                  <span>|</span>
                  <span>40’FT HC</span>
                  <span>|</span>
                  <span>45’FT HC</span>
                  <span>|</span>
                  <span>45'FT HC PW</span>
                </div>
                {/* condition */}
                <h4 className="font-semibold ">CONDITION</h4>
                <div className="flex items-center gap-x-3 px-2 flex-wrap text-sm">
                  <span>NEW</span>
                  <span>|</span>
                  <span>USED</span>
                  <span>|</span>
                  <span>IICL</span>
                  <span>|</span>
                  <span>ASIS</span>
                  <span>|</span>
                  <span>WWT</span>
                  <span>|</span>
                  <span>SCRAP</span>
                  <span>|</span>
                  <span>CARGOWORTHY</span>
                  <span>|</span>
                  <span>DAMAGED</span>
                </div>
              </div>
              <h2 className="text-[#383434] ">Stock Input(“JSON”)</h2>
              <textarea
                name="updatestocks"
                id="updatestocks"
                value={updateStockInputValue}
                onChange={handleInputChange}
                placeholder={`eg:[{"type":"DRY","size":"20'FT","condition":"CARGOWORTHY","stockCount":114,"portLocation":"MELBOURNE","country":"AUSTRALIA","price":1100}]`}
                className=" h-32 border rounded bg-[#FAFBFC] placeholder:text-[#7A869A] placeholder:text-xs placeholder:px-2 placeholder:py-2 focus-within:outline-none"
              ></textarea>
              {updateError && (
                <p className="text-red-500 text-sm">{updateError}</p>
              )}
              <div className="flex items-center justify-center gap-4">
                <div
                  className="btn btn-second"
                  onClick={() => setUpdate(false)}
                >
                  Cancel
                </div>
                <button className="btn btn-prime" onClick={HandleUpdateStocks}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="bg-[#F1F1F1] ">
        <AdminHeader
          title={"Inventory"}
          breadCrums={`sellers / ${seller?.sellerName}`}
          breadlinks="sellers"
        />
      </div>
      <div className="bg-[#F1F1F1] px-8 pt-4 flex flex-col gap-4 pb-6 h-full">
        {error && <p className="text-red-600">Error : {error}</p>}
        <div className="flex bg-white justify-between  gap-3 px-4 py-3 shadow-[0px_0px_4px_rgb(0,0,0,0.2)] rounded-xl capitalize">
          <h2 className="text-xl font-semibold text-[#221F1F]">
            <span className="text-2xl text-primary">{seller?.sellerName}</span>{" "}
            Inventory
          </h2>
          <button
            className="btn bg-[#FDC5C5] text-primary hover:bg-primary hover:text-white"
            onClick={() => setUpdate(true)}
          >
            Update Stocks
          </button>
        </div>
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
                        const value = row[column.id as keyof Data];
                        const dolor = useDolorFormat;
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ padding: "8px" }}
                          >
                            {column.id === "price" ? (
                              <> {dolor(Number(value))}</>
                            ) : column.id === "container" ? (
                              row.type
                            ) : column.id === "portLocation" ? (
                              row.portLocation
                            ) : column.id === "quantity" ? (
                              row.stockCount
                            ) : (
                              value
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
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={totalcontainers}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default SellerContainer;
