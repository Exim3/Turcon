import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link, IconButton } from "@mui/material";
import aeroIcon from "/aerosendIcon.svg";
import axiosInstance from "../../../../utils/axiosInstance";
import debounce from "lodash.debounce";

interface Column {
  id: "name" | "email" | "mobile" | "role" | "message" | "action";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 126 },
  { id: "email", label: "Email", minWidth: 205 },
  {
    id: "mobile",
    label: "Mobile No",
    minWidth: 156,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "role",
    label: "Role",
    minWidth: 130,
  },
  {
    id: "message",
    label: "Message",
    minWidth: 200,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 60,
    align: "center",
  },
];

interface Data {
  fullName: string;
  email: string;
  phone: number;
  department: string;
  message: string;
}

export default function ContactFormTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalForms, setTotalForms] = React.useState(0);
  const [rows, setRows] = React.useState<Data[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const fetchOrders = React.useCallback(
    debounce(async (page: number, rowsPerPage: number) => {
      try {
        const response = await axiosInstance.get("/api/contactform/get", {
          params: {
            rowsPerPage,
            page,
          },
        });

        setRows(response.data.contactForms || []);
        setTotalForms(response.data.totalForms || 0);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch contact forms. Please try again.");
      }
    }, 500),
    [] // Empty dependency array to ensure debounce works as expected
  );

  React.useEffect(() => {
    fetchOrders(page, rowsPerPage);
  }, [page, rowsPerPage, fetchOrders]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
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
                  style={{ minWidth: column.minWidth, background: "#E4E4E4" }}
                >
                  <span className="font-semibold">{column.label}</span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={`${row.email}-${index}`} // Use a unique key to avoid duplicates
                sx={{ paddingInline: "16px" }}
              >
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{ padding: "8px" }}
                    >
                      {column.id === "role" ? (
                        <span
                          style={{
                            backgroundColor:
                              row.department === "sales"
                                ? "#8D9DF7"
                                : row.department === "support"
                                ? "#70C0F2"
                                : row.department === "enquiry"
                                ? "#32E47C"
                                : "#f1f1f1",
                            color: "#221F1F",
                          }}
                          className="font-semibold text-xs px-2 py-1 rounded"
                        >
                          {row.department}
                        </span>
                      ) : column.id === "name" ? (
                        row.fullName
                      ) : column.id === "mobile" ? (
                        row.phone
                      ) : column.id === "action" ? (
                        <Link href={`mailto:${row.email}`} underline="none">
                          <IconButton aria-label="send email">
                            <img src={aeroIcon} alt="Send Email" />
                          </IconButton>
                        </Link>
                      ) : column.id === "message" ? (
                        row.message || "no messages"
                      ) : column.id === "email" ? (
                        row.email
                      ) : (
                        ""
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={totalForms}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {error && <div style={{ color: "red", padding: "16px" }}>{error}</div>}
    </Paper>
  );
}
