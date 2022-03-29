import moment from "moment";

export function isNull(value) {
  if (value != null && value !== "" && value !== undefined) {
    return false;
  }
  return true;
}

export function censorName(value) {
  if (!isNull(value)) {
    let text = value.substring(5);
    let censor = value.replace(text, "*****");
    return censor;
  }
  return null;
}

export function isNowBetweenDate(startDate, endDate) {
  var thisDate = moment().format("YYYY-MM-DD");
  var fromDate = moment(startDate).format("YYYY-MM-DD");
  var toDate = moment(endDate).format("YYYY-MM-DD");
  if (
    moment(thisDate).isSameOrAfter(fromDate) &&
    moment(thisDate).isSameOrBefore(toDate)
  ) {
    return true;
  }
  return false;
}

export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
