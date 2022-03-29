import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ResponsiveAppBar from "../AppBar/AppBar";
import * as API from "../../services/api";
import * as Helper from "../../util/helper";
import { useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "notistack";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ContributionForm = () => {
  function Copyright(props) {
    return (
      <div style={{ bottom: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          {...props}
        >
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    );
  }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key) => (
    <>
      <Button
        onClick={() => {
          closeSnackbar(key);
          console.log(key);
        }}
      >
        <Typography color="white" sx={{ fontSize: 12 }}>
          Dismiss
        </Typography>
      </Button>
    </>
  );

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
    fontSize: 20,
  }));

  const FormPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
  }));

  const [itemType, setItemType] = useState("");
  const [itemList, setItemList] = useState([]);

  const handleChange = (event) => {
    setItemType(event.target.value);
  };

  let [searchParams, setSearchParams] = useSearchParams();
  const appealId = searchParams.get("appealId");
  const [appeal, setAppeal] = useState(null);

  useEffect(() => {
    let mounted = true;
    API.getAppealDetails(appealId).then((item) => {
      if (mounted) {
        setAppeal(item);
        console.log(item);
      }
    });

    return () => (mounted = false);
  }, []);

  const handleSubmit = () => {
    let name = document.getElementById("fullname").value;
    let number = document.getElementById("number").value;
    let address = document.getElementById("address").value;

    if (
      Helper.isNull(name) ||
      Helper.isNull(number) ||
      Helper.isNull(address) ||
      Helper.isNull(itemList)
    ) {
      enqueueSnackbar("Some data are missing. Please fill details properly.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        action,
        autoHideDuration: 3000,
      });
    } else {
      const contributionData = {
        name: name,
        number: number,
        address: address,
        appealId: appealId,
        contributedItems: itemList,
      };

      API.makeContribution(contributionData)
        .then((res) => {
          if (!res.ok) {
            const error = res;
            return Promise.reject(error);
          }
          window.location = "/contribution/success";
        })
        .catch((error) => {
          enqueueSnackbar(
            "Error when processing your application. Try again later.",
            {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              action,
              autoHideDuration: 3000,
            }
          );
        });
    }
  };

  const addInContribution = () => {
    let money;
    let receiptNo;
    let paymentChannel;
    let itemName;
    let itemValue;
    let description = document.getElementById("description").value;
    let newList = itemList;

    if (itemType === "CASH") {
      money = document.getElementById("money").value;
      receiptNo = document.getElementById("receiptNo").value;
      paymentChannel = document.getElementById("paymentChannel").value;

      if (
        !Helper.isNull(money) &&
        !Helper.isNull(receiptNo) &&
        !Helper.isNull(paymentChannel)
      ) {
        newList = (itemList || []).concat({
          itemIndex: Helper.makeid(6),
          itemType: itemType,
          itemValue: money,
          itemDescription: description,
          paymentChannel: paymentChannel,
          receiptNo: receiptNo,
        });
        enqueueSnackbar("Added into contribution list below.", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
          autoHideDuration: 3000,
        });
      } else {
        enqueueSnackbar("Please fill in contribution properly.", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
          autoHideDuration: 3000,
        });
      }

      document.getElementById("money").value = "";
      document.getElementById("receiptNo").value = "";
      document.getElementById("paymentChannel").value = "";
    } else if (itemType === "ITEM") {
      itemName = document.getElementById("item").value;
      itemValue = document.getElementById("itemValue").value;

      if (!Helper.isNull(itemName) && !Helper.isNull(itemValue)) {
        newList = (itemList || []).concat({
          itemIndex: Helper.makeid(6),
          itemName: itemName,
          itemType: itemType,
          itemValue: itemValue,
          itemDescription: description,
        });

        enqueueSnackbar("Added into contribution list below.", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
          autoHideDuration: 3000,
        });
      } else {
        enqueueSnackbar("Please fill in contribution properly.", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          action,
          autoHideDuration: 3000,
        });
      }

      document.getElementById("item").value = "";
      document.getElementById("itemValue").value = "";
    } else {
      enqueueSnackbar("Please select an Item Type.", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        action,
        autoHideDuration: 3000,
      });
    }

    document.getElementById("description").value = "";

    setItemList(newList);
    console.log(itemList);
  };

  const handleDelete = (key) => {
    let newList;
    itemList.forEach((item) => {
      if (item.itemIndex !== key) {
        newList = (newList || []).concat(item);
      }
    });

    setItemList(newList);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <br /> <br /> <br />
      <Container>
        <Div>{"Contribution Form"}</Div>
        <br />
        <FormPaper>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="appealId"
                  required
                  fullWidth
                  id="appealId"
                  label="Appeal ID"
                  disabled
                  value={appeal != null ? appeal.appealId : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="appealName"
                  required
                  fullWidth
                  id="appealName"
                  label="Appeal's Name"
                  disabled
                  value={appeal != null ? appeal.appealName : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">
                    Select Item Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={itemType}
                    label="Item Type"
                    onChange={handleChange}
                  >
                    <MenuItem value="ITEM">ITEM</MenuItem>
                    <MenuItem value="CASH">CASH</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {itemType === "CASH" ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="money"
                      required
                      fullWidth
                      id="money"
                      label="Money"
                      type="number"
                    />
                  </Grid>{" "}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="receiptNo"
                      required
                      fullWidth
                      id="receiptNo"
                      label="Receipt No"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="paymentChannel"
                      required
                      fullWidth
                      id="paymentChannel"
                      label="Payment Channel"
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="item"
                      required
                      fullWidth
                      id="item"
                      label="Item"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="itemValue"
                      required
                      fullWidth
                      id="itemValue"
                      label="Value"
                      type="number"
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                addInContribution();
              }}
            >
              Add Contribution
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                  Contribution List (Review & Make Your Contribution)
                </Typography>
                <List>
                  <Stack direction="row" spacing={1}>
                    {itemList?.map((item) => (
                      <ListItem key={item.itemIndex}>
                        <Chip
                          label={
                            item.itemName != null
                              ? item.itemName
                              : "RM " +
                                item.itemValue +
                                " (" +
                                item.receiptNo +
                                ")"
                          }
                          variant="outlined"
                          onDelete={() => {
                            handleDelete(item.itemIndex);
                          }}
                        />
                      </ListItem>
                    ))}
                  </Stack>
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="fullname"
                  required
                  fullWidth
                  id="fullname"
                  label="Name per Identity Card"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="number"
                  required
                  fullWidth
                  id="number"
                  label="Phone Number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                handleSubmit();
              }}
              color="success"
            >
              Make Contribution
            </Button>
          </Box>
        </FormPaper>
      </Container>
      <Copyright sx={{ mt: 8, mb: 3 }} />
    </div>
  );
};

export default ContributionForm;
