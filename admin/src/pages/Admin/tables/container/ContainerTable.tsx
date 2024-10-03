import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as XLSX from "xlsx";
import { ExportIcon } from "../../../../components/svg/Tick";
import { useDolorFormat } from "../../../../utils/useDollorFormat";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import debounce from "lodash.debounce";
import { CircularProgress } from "@mui/material";

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
interface ExportData {
  type: string;
  size: string;
  condition: string;
  stockCount: string;
  portLocation: string;
  country: string;
  price: string;
}
interface Country {
  label: string;
  value: string;
}

export default function ContainerTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [exportData, setExportData] = useState<ExportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<Data[]>([]);
  const [totalcontainers, setTotalContainers] = useState(0);
  const [countries, setCountries] = useState<Country[]>();
  const [ports, setPorts] = useState<Country[]>();

  const fetchCountry = async () => {
    try {
      const response = await axiosInstance.get("/api/containers/getcountry", {
        params: { country: filter.country },
      });
      setCountries(response.data?.countries);
      setPorts(response.data?.ports);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const [filter, setFilter] = useState({
    country: "",
    size: "",
    port: "",
    condition: "",
    type: "",
  });
  const Sizes = [
    "20'FT",
    "40'FT",
    "45'FT",
    "20'FT HC",
    "40'FT HC",
    "45'FT HC",
    "45'FT HC PW",
  ];
  const Conditions = [
    "NEW",
    "USED",
    "IICL",
    "ASIS",
    "WWT",
    "SCRAP",
    "CARGOWORTHY",
    "DAMAGED",
  ];
  const Types = ["DRY", "OPENTOP", "FLATRACK", "TANKS", "REEFERS"];

  const fetchContainers = useCallback(
    debounce(async (filter) => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/api/containers/getallcontainer",
          {
            params: {
              country: filter.country,
              port: filter.port,
              size: filter.size,
              type: filter.type,
              condition: filter.condition,
              rowsPerPage: rowsPerPage,
              page: page,
            },
          }
        );
        setRows(response.data?.containers);
        console.log(response, "containers");
        setTotalContainers(response.data.totalContainers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [rowsPerPage, page]
  );

  useEffect(() => {
    fetchContainers(filter);
  }, [fetchContainers, page]);
  useEffect(() => {
    fetchCountry();
  }, [filter.country]);

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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      type: row.type,
      size: row.size,
      condition: row.condition,
      stockCount: row.stockCount,
      portLocation: row.portLocation,
      country: row.country,
      price: row.price,
    }));
    setExportData(data);
  };
  const HandleFilterApply = () => {
    fetchContainers(filter);
  };
  const HandleClearFilter = () => {
    setFilter({ condition: "", country: "", port: "", size: "", type: "" });
    fetchContainers(filter);
  };
  console.log(filter.country, "country", filter.port);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <div className="px-4 py-3 flex justify-between items-center">
        <p className="text-2xl font-semibold">Container List</p>
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
      {/* dropdown for filter */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="max-w-40 px-4 py-[6px] rounded border">
          <select
            name="type"
            id="containerFilter"
            className="w-24 text-sm capitalize"
            onChange={handleInputChange}
            value={filter.type}
          >
            <option value="" selected>
              container
            </option>
            {Types.map((type) => (
              <option value={type}>{type}</option>
            ))}{" "}
          </select>
        </div>
        <div className="max-w-40 px-4 py-[6px] rounded border">
          <select
            name="size"
            id="sizeFilter"
            className="w-24 text-sm capitalize"
            onChange={handleInputChange}
            value={filter.size}
          >
            <option value="" selected>
              Size
            </option>
            {Sizes?.map((size) => (
              <option value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div className="max-w-40 px-4 py-[6px] rounded border">
          <select
            name="condition"
            id="conditionFilter"
            onChange={handleInputChange}
            value={filter.condition}
            className="w-24 text-sm capitalize"
          >
            <option value="" selected>
              Condition
            </option>
            {Conditions.map((condition) => (
              <option value={condition}>{condition}</option>
            ))}{" "}
          </select>
        </div>
        <div className="max-w-40 px-4 py-[6px] rounded border">
          <select
            name="country"
            id="countryFilter"
            className="w-24 text-sm capitalize"
            value={filter.country}
            onChange={handleInputChange}
          >
            <option value="">Country</option>
            {countries?.map((country) => (
              <option value={country.label}>{country.label}</option>
            ))}
          </select>
        </div>
        <div className="max-w-40 px-4 py-[6px] rounded border">
          <select
            name="port"
            id="portFilter"
            className="w-24 text-sm capitalize"
            onChange={handleInputChange}
            value={filter.port}
          >
            <option value="" selected>
              Port
            </option>
            {ports?.map((port) => (
              <option value={port.value}>{port.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            className="bg-secondary rounded  px-6 py-[6px] text-white"
            onClick={HandleFilterApply}
          >
            Apply
          </button>
          <button
            className="bg-[#d7f0ff] rounded  px-6 py-[6px] text-secondary"
            onClick={HandleClearFilter}
          >
            Clear
          </button>
        </div>
      </div>

      {/* table */}

      <Paper sx={{ width: "100%" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, background: "#E4E4E4" }}
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
    </>
  );
}
