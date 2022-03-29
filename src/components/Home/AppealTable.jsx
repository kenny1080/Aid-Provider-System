import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as API from "../../services/api";
import Moment from "react-moment";
import Button from "@mui/material/Button";
import BasicModal from "./AppealModal";
import * as Helper from "../../util/helper";
import { useSnackbar } from "notistack";
import moment from "moment";

const CustomizedTables = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    ":hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.primary.light,
    },
  }));

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key) => (
    <>
      <Button
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        Dismiss
      </Button>
    </>
  );
  const goToAppealD = (appealId, isActive) => {
    if (isActive) {
      window.location = "/appeal/detail?appealId=" + appealId;
    } else {
      enqueueSnackbar("Appeal is not active.", {
        variant: "warning",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        action,
        autoHideDuration: 3000,
      });
    }
  };

  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  let profile = localStorage.getItem("profile");

  const toggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let mounted = true;
    if (profile != null) {
      API.getAllAppealsByOrganizationId(
        JSON.parse(profile).organizationId
      ).then((items) => {
        if (mounted) {
          setList(items);
          console.log(items);
        }
      });
    } else {
      API.getAllAppeals().then((items) => {
        if (mounted) {
          setList(items);
        }
      });
    }

    return () => (mounted = false);
  }, [open, profile]);

  return (
    <div>
      {profile != null && (
        <div>
          <div style={{ float: "right" }}>
            <Button
              variant="contained"
              onClick={() => {
                toggleModal();
              }}
            >
              Create Appeal
            </Button>
          </div>
          <BasicModal open={open} toggle={toggleModal} />
          <br /> <br /> <br />
        </div>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Appeal Id</StyledTableCell>
              <StyledTableCell align="center">Appeal Name</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">From Date</StyledTableCell>
              <StyledTableCell align="center">To Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length ? (
              list.map((row) => (
                <StyledTableRow
                  key={row.appealId}
                  onClick={() =>
                    goToAppealD(
                      row.appealId,
                      Helper.isNowBetweenDate(row.fromDate, row.toDate)
                    )
                  }
                >
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.appealId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.appealName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {Helper.isNowBetweenDate(row.fromDate, row.toDate)
                      ? row.status
                      : "INACTIVE"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Moment format="YYYY/MM/DD">{row.fromDate}</Moment>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Moment format="YYYY/MM/DD">{row.toDate}</Moment>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center">
                  No Appeals Made.
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomizedTables;
