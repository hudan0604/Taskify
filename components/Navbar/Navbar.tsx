import { Avatar } from "@mui/material";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { userService } from "services";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [userInfos, setUserInfos] = useState<any>(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x as any));
    userService.getRandomUser().then((data) => setUserInfos(data));
    return () => subscription.unsubscribe();
  }, []);

  const logout = () => {
    userService.logout();
  };

  if (!user) return null;

  return (
    <nav className={styles.Navbar}>
      <span className={styles.Brand}>Taskify</span>
      <div className={styles.Separator}></div>
      <span className={styles["Navbar--links"]}>
        <Link href="/tasks" passHref>
          <div
            className={classnames(styles.Link, {
              [styles["Link--active"]]: router?.pathname === "/tasks",
            })}
          >
            Tasks
          </div>
        </Link>
      </span>

      <a onClick={logout}>Logout</a>
      <div className={styles.Avatar}>
        <Avatar
          src={userInfos?.picture.large}
          alt={`${userInfos?.name?.first} ${userInfos?.name?.last}`}
          sx={{ width: 48, height: 48 }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
