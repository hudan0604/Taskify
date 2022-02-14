import { apiHandler } from "helpers/api";

const tasks: any = require("data/tasks.json");
const fs = require("fs");

export default apiHandler(handler);

function handler(req: any, res: any) {
  switch (req.method) {
    case "POST":
      return addTask(req);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function addTask(req) {
    const { body } = req;
    body.id = tasks.length + 1;
    tasks.push(body);
    fs.writeFile("data/tasks.json", JSON.stringify(tasks), function (err) {
      console.log(err);
    });
    return res.status(200).json();
  }
}
