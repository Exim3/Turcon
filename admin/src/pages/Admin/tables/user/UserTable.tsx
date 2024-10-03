import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import * as XLSX from "xlsx";

import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CircularProgress, Link as Links } from "@mui/material";
import { Link } from "react-router-dom";
import {
  AeroIcon,
  ExportIcon,
  ViewIcon,
} from "../../../../components/svg/Tick";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import debounce from "lodash.debounce";
import { Search } from "@mui/icons-material";

interface Column {
  id: "username" | "fullName" | "email" | "phone" | "country" | "action";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "username", label: "username", minWidth: 160 },
  {
    id: "fullName",
    label: "Full Name",
    minWidth: 150,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 180,
  },
  {
    id: "phone",
    label: "Mobile Number",
    minWidth: 175,
    align: "center",
  },
  {
    id: "country",
    label: "Country",
    minWidth: 120,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 110,
    align: "center",
  },
];

interface Data {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  _id: string;
  companyAddress: string;
  companyName: string;
}
interface ExportData {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  companyAddress: string;
  companyName: string;
}

export default function UserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [exportData, setExportData] = useState<ExportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [rows, setRows] = useState<Data[]>([]);
  const [totaluser, setTotalUser] = useState(0);

  const [filter, setFilter] = useState({
    usernameFilter: "",
  });

  const fetchUsers = useCallback(
    debounce(async (filter) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/api/users/getallusers", {
          params: {
            username: filter.usernameFilter,
            rowsPerPage: rowsPerPage,
            page: page,
          },
        });
        setRows(response.data.users);
        console.log(response, "users");
        setTotalUser(response.data.totalUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500),
    [rowsPerPage, page]
  );
  useEffect(() => {
    fetchUsers(filter);
  }, [filter, fetchUsers, page]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
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
      username: row.username,
      fullName: row.fullName,
      email: row.email,
      phone: row.phone,
      country: row.country,
      companyAddress: row.companyAddress,
      companyName: row.companyName,
    }));
    setExportData(data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {" "}
      <div className="px-4 py-3 flex justify-between items-center bg-[white] rounded-md">
        <div className="flex items-center gap-7">
          <p className="text-2xl font-semibold">Users List</p>
          <div className="relative ">
            <input
              type="input"
              placeholder="Search by Username"
              name="usernameFilter"
              onChange={handleInputChange}
              value={filter.usernameFilter}
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.email}
                    >
                      {columns.map((column) => {
                        const value = row[column.id as keyof Data];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ padding: "8px" }}
                          >
                            {column.id === "action" ? (
                              <div className="flex items-center  justify-center gap-2">
                                <Link
                                  to={`/viewUser/${row._id}`}
                                  className="w-10 h-10 flex items-center justify-center bg-[#FFFAF5] rounded-md"
                                >
                                  <ViewIcon size={20} />
                                </Link>
                                <Links
                                  href={`mailto:${row.email}`}
                                  underline="none"
                                  className="w-10 h-10 flex items-center justify-center bg-[#F5FFF9] rounded-md"
                                >
                                  <AeroIcon size={20} />
                                </Links>
                              </div>
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
          rowsPerPageOptions={[5, 10, 50, 100]}
          component="div"
          count={totaluser}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
