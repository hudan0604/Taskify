import { Button, Dialog, Skeleton } from "@mui/material";
import AddOrEditTask from "components/AddOrEditTask/AddOrEditTask";
import TaskComponent from "components/Task/Task";
import Image from "next/image";
import { useEffect, useState } from "react";
import { tasksService } from "services/tasks.service";
import { Task } from "types/task";
import styles from "./Tasks.module.scss";

const Tasks = () => {
  const [tasks, setTasks] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [taskModal, setTaskModal] = useState<{
    open: boolean;
    type?: "add" | "edit";
    task?: Task;
  }>({ open: false });
  const fetchTasks = () => {
    setIsLoading(true);
    tasksService.getTasks().then((tasks) => {
      setTasks(tasks);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleModalClose = (fetchList?: boolean) => {
    if (fetchList) {
      fetchTasks();
    }
    setTaskModal({ open: false });
  };

  return (
    <div className={!tasks?.length ? styles.NoTasks : styles.Tasks}>
      {tasks?.length > 0 && !isLoading && (
        <div className={styles["Tasks--wraper"]}>
          {tasks.map((task, i) => (
            <TaskComponent
              key={`task-${i}`}
              task={task}
              fetchTasks={fetchTasks}
              openEditModal={() =>
                setTaskModal({ open: true, type: "edit", task })
              }
            />
          ))}

          <Button
            variant="contained"
            color="primary"
            className={styles.Button}
            onClick={() => setTaskModal({ open: true, type: "add" })}
          >
            {tasks?.length ? "Add new task" : "Add first task"}
          </Button>
        </div>
      )}

      {!tasks?.length && !isLoading && (
        <div className={styles.NoData}>
          <Image
            alt="no data"
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&ext=jpg"
            width="300"
            height="300"
          />
          <div>No tasks for now</div>
          <Button
            variant="contained"
            color="primary"
            className={styles.Button}
            onClick={() => setTaskModal({ open: true, type: "add" })}
          >
            {tasks?.length ? "Add new task" : "Add first task"}
          </Button>
        </div>
      )}

      {isLoading &&
        [...new Array(10)].map((_, i) => (
          <Skeleton variant="rectangular" key={`loading-tasks-${i}`} />
        ))}

      <Dialog
        title={taskModal.type === "edit" ? "Edit task" : "Add task"}
        open={taskModal.open}
        onClose={() => setTaskModal({ open: false })}
        classes={{ paper: styles.Modal }}
        maxWidth="md"
      >
        <AddOrEditTask
          formType={taskModal.type}
          onClose={(fetch) => handleModalClose(fetch)}
          task={taskModal.task || undefined}
        />
      </Dialog>
    </div>
  );
};

export default Tasks;
