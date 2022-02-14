import { apiHandler } from "helpers/api";

const tasks = require("data/tasks.json");

export default apiHandler(handler);

function handler(req: any, res: any) {
  switch (req.method) {
    case "GET":
      return getTasks();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  function getTasks() {
    return res.status(200).json(tasks);
  }
}
