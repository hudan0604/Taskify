import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";
import { User } from "types/user";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userBaseUrl = `${publicRuntimeConfig.apiUrl}/user`;
export const userSubject = new BehaviorSubject<string | null | User>(
  process.browser && JSON.parse(localStorage.getItem("user") as any)
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  getRandomUser,
};

function login(username: string, password: string) {
  return fetchWrapper
    .post(`${baseUrl}/authenticate`, { username, password })
    .then((user) => {
      if (user !== undefined) {
        userSubject.next(user as unknown as User);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      } else return { error: "Incorrect creds" };
    });
}

function logout() {
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/login");
}

function getRandomUser() {
  return fetchWrapper.get(`${userBaseUrl}`).then((user) => user);
}
