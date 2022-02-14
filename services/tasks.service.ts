import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";

import { fetchWrapper } from "helpers";
import { User } from "types/user";
import { Task } from "types/task";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/tasks`;

export const tasksService = {
  getTasks,
  addTask,
  editTask,
  deleteTask,
};

function getTasks(): Promise<Task[]> {
  return fetchWrapper.get(`${baseUrl}`).then((tasks) => {
    return tasks;
  });
}

function addTask(data: Task): Promise<void> {
  return fetchWrapper.post(`${baseUrl}/add`, data).then((res) => {
    return res;
  });
}

function editTask(data: Task): Promise<void> {
  return fetchWrapper.put(`${baseUrl}/${data.id}/edit`, data).then((res) => {
    return res;
  });
}

function deleteTask(id: number) {
  return fetchWrapper.delete(`${baseUrl}/${id}/delete`).then((res) => {
    return res;
  });
}
