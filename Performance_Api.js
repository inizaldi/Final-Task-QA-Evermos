import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
const base_Url = "https://reqres.in/";
const headers = { "Content-Type": "application/json" };

export const options = {
  vus: 1000,
  duration: "30s",
  iterations: 3500,
  thresholds: {
    http_req_duration: ["avg < 2000"], // Batas maksimum 2s
    http_req_failed: ["rate < 0.01"], //  batas max failure rate
  },
};

export function Post_Api() {
  const PostPathUrl = "api/users";
  const Postpayload = JSON.stringify({
    name: "morpheus",
    job: "leader",
  });

  const res = http.post(`${base_Url}${PostPathUrl}`, Postpayload, {
    headers: headers,
  });

  const AsertPost = check(res, {
    "POST request is successful": (res) => res.status === 201,
    "response body name": (res) => res.body.includes("morpheus"),
    "response body job": (res) => res.body.includes("leader"),
  });
}

export function Put_Api() {
  const PutPathUrl = "api/users/2";
  const Putpayload = JSON.stringify({
    name: "morpheus",
    job: "zion resident",
  });

  const res = http.put(`${base_Url}${PutPathUrl}`, Putpayload, {
    headers: headers,
  });

  const AsertPut = check(res, {
    "Put request is successful": (res) => res.status === 200,
    "response body update name": (res) => res.body.includes("morpheus"),
    "response body update job": (res) => res.body.includes("zion resident"),
  });
}
export function handleSummary(data) {
  return {
    "./report.html": htmlReport(data),
  };
}

export default function () {
  Post_Api();
  Put_Api();
}
