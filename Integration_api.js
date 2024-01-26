import http from "k6/http";
import { check } from "k6";
const base_Url = "https://reqres.in/";
const headers = { "Content-Type": "application/json" };


export const PostScenario = () => {
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
};
export const PutScenario = () => {
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
};

export default function () {
  PostScenario();
  PutScenario();
}
