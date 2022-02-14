import { apiHandler } from "helpers/api";

const tasks: any = require("data/tasks.json");
const fs = require("fs");

export default apiHandler(handler);

function handler(req: any, res: any) {
  switch (req.method) {
    case "PUT":
      return editTask(req);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function editTask(req) {
    const { body, query } = req;
    const index = tasks.findIndex((task) => task.id === parseInt(query.id));
    tasks[index] = body;
    fs.writeFile("data/tasks.json", JSON.stringify(tasks), function (err) {
      console.log(err);
    });
    return res.status(200).json();
  }
}
