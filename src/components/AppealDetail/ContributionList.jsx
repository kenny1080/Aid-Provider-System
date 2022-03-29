import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Moment from "react-moment";
import * as Helper from "../../util/helper";

const ContributionList = (props) => {
  let profile = localStorage.getItem("profile");

  const goToApplication = (id) => {
    console.log(id);
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
          goToApplication(props.detail.contributionId);
        }}
      >
        <ListItemAvatar>
          <Avatar alt={props.detail.name} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              {profile != null ? (
                <>{props.detail.name}</>
              ) : (
                <>{Helper.censorName(props.detail.name)}</>
              )}
            </>
          }
          secondary={
            <>
              {profile != null ? (
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Contribution: &nbsp;
                  </Typography>
                  {props.detail.item != null
                    ? props.detail.item
                    : props.detail.itemType}
                  &nbsp; &nbsp; &nbsp;
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Value: &nbsp;
                  </Typography>
                  RM {props.detail.value}
                  &nbsp; &nbsp; &nbsp;
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Date Received: &nbsp;
                  </Typography>
                  <Moment format="YYYY/MM/DD">
                    {props.detail.dateCreated}
                  </Moment>
                  <Typography
                    component="span"
                    variant="body2"
                    style={{ float: "right" }}
                  >
                    {props.detail.status}
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Contributed on: &nbsp;
                  </Typography>
                  <Moment format="YYYY/MM/DD">
                    {props.detail.dateCreated}
                  </Moment>
                </React.Fragment>
              )}
            </>
          }
        />
      </StyledListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default ContributionList;
