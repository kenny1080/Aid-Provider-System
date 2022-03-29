import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Appeals", "Contributions", "Applications"];
const settings = ["Logout"];

const ResponsiveAppBar = () => {
  let profile = localStorage.getItem("profile");
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goHome = () => {
    window.location = "/";
  };

  const logout = () => {
    localStorage.removeItem("profile");
    window.location = "/organization/signIn";
  };

  const goToDisbursementList = () => {
    window.location =
      "/disbursement/list?organizationId=" + JSON.parse(profile).organizationId;
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={() => {
              goHome();
            }}
          >
            AID APPEALING SYSTEM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {profile != null && (
              <Button
                onClick={() => {
                  goToDisbursementList();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Disbursement List
              </Button>
            )}
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            onClick={() => {
              goHome();
            }}
          >
            AID APPEALING SYSTEM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {profile != null && (
              <Button
                onClick={() => {
                  goToDisbursementList();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Disbursement List
              </Button>
            )}
          </Box>
          {localStorage.getItem("profile") != null && (
            <Box sx={{ flexGrow: 0 }}>
              {JSON.parse(profile).organizationName} &nbsp; &nbsp;
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={JSON.parse(profile).organizationName}
                    src="/static/images/avatar/3.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => logout()}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
