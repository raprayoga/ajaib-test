import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  Container,
  Box,
  TablePagination,
} from "@mui/material";

export default function List(props) {
  const onPageChange = (e, page) => {
    props.onPageChange(page)
  }

  const onRowsPerPageChange = (e) => {
    props.onRowsPerPageChange(e)
  }

  return (
    <Container maxWidth="lg">
      <Box component="form" autoComplete="off" mt={5}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#eeeded" }}>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Registered Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map((row, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell>{row.login.username}</TableCell>
                  <TableCell>{`${row.name.first}${row.name.last}`}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.registered.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TablePagination
                count={200}
                onPageChange={(e, page) => {
                  onPageChange(e, page);
                }}
                page={props.page}
                rowsPerPage={props.results}
                onRowsPerPageChange={(e) => {
                  onRowsPerPageChange(e);
                }}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
