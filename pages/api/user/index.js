const jwt = require("jsonwebtoken");
import axios from "axios";
import { apiHandler } from "helpers/api";

export default apiHandler(handler);

function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getRandomUser();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getRandomUser() {
    axios.get("https://randomuser.me/api/").then((response) => {
      return res.status(200).json(response.data.results?.[0]);
    });

    // return basic user details and token
    return {};
  }
}
