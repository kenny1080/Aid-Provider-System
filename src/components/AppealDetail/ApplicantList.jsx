import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";

const ApplicantItemList = (props) => {
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

  const goToApplication = (status, applicationId, appealId) => {
    if (status !== "DISBURSED") {
      window.location =
        "/appeal/application/disbursement?appealId=" +
        appealId +
        "&applicationId=" +
        applicationId;
    } else {
      enqueueSnackbar(
        "Application already disrbursed! Please go to disbursement page to check the record.",
        {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
          autoHideDuration: 3000,
        }
      );
    }
  };

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    ":hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.primary.light,
    },
  }));

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <StyledListItem
        alignItems="flex-start"
        onClick={() => {
          goToApplication(
            props.detail.status,
            props.detail.applicationId,
            props.detail.appealId
          );
        }}
      >
        <ListItemAvatar>
          <Avatar alt={props.detail.name} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={props.detail.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Address: &nbsp;
              </Typography>
              {props.detail.address}
              <Typography
                component="span"
                variant="body2"
                style={{ float: "right" }}
              >
                {props.detail.status}
              </Typography>
            </React.Fragment>
          }
        />
      </StyledListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default ApplicantItemList;
