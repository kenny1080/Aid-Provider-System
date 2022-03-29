const baseUrl = "http://localhost:8080";

export async function getAllAppeals() {
  const data = await fetch(baseUrl + "/appeal/getAll");
  return await data.json();
}

export async function getAllAppealsByOrganizationId(id) {
  const data = await fetch(
    baseUrl + "/appeal/get/appeals?organizationId=" + id
  );
  return await data.json();
}

export function getAppealDetails(appealId) {
  return fetch(baseUrl + "/appeal/get/single?appealId=" + appealId).then(
    (data) => data.json()
  );
}

export function login(credentials) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };
  return fetch(baseUrl + "/organization/login", requestOptions).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw res;
  });
}

export async function addAppeal(appealDetails) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appealDetails),
  };
  const res = await fetch(baseUrl + "/appeal/add", requestOptions);
  return res;
}

export async function applyAppeal(formData) {
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const res = await fetch(baseUrl + "/application/apply", requestOptions);
  return res;
}

export async function getApplicants(appealId) {
  const data = await fetch(
    baseUrl + "/application/getApplications?appealId=" + appealId
  );
  return await data.json();
}

export async function getContributions(appealId) {
  const data = await fetch(
    baseUrl + "/contribute/getContributions?appealId=" + appealId
  );
  return await data.json();
}

export async function getApplicant(applicationId) {
  const data = await fetch(
    baseUrl + "/application/get/single?applicationId=" + applicationId
  );
  return await data.json();
}

export async function getPendingContributions(appealId) {
  const data = await fetch(
    baseUrl + "/contribute/getPendingContributions?appealId=" + appealId
  );
  return await data.json();
}

export async function makeDisbursement(disbursementDetail) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(disbursementDetail),
  };
  const res = await fetch(baseUrl + "/disbursement/record", requestOptions);
  return res;
}

export async function makeContribution(contributionDetail) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contributionDetail),
  };
  const res = await fetch(baseUrl + "/contribute/donate", requestOptions);
  return res;
}

export async function getDisbursements(organizationId) {
  const data = await fetch(
    baseUrl +
      "/disbursement/getDisbursementList?organizationId=" +
      organizationId
  );
  return await data.json();
}

export async function downloadFile(fileId) {
  const data = await fetch(baseUrl + "/application/download?fileId=" + fileId);
  return await data.json();
}
