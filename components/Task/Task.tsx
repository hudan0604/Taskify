import { Chip } from "@mui/material";
import { Task } from "types/task";
import styles from "./Task.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { tasksService } from "services";
import { Priority } from "types/priority";
import { Tag } from "types/tag";
import LowPriorityIcon from "@mui/icons-material/LowPriority";
import SurfingIcon from "@mui/icons-material/Surfing";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SavingsIcon from "@mui/icons-material/Savings";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { toast } from "react-toastify";

const TaskComponent = ({
  task,
  openEditModal,
  fetchTasks,
}: {
  task: Task;
  openEditModal: () => void;
  fetchTasks?: () => void;
}) => {
  const handleDeleteTask = () => {
    tasksService
      .deleteTask(task.id!!)
      .then(() => {
        fetchTasks!!();
        toast.success(`Task #${task?.id} successfuly deleted !`);
      })
      .catch(() => toast.success(`Error when deleting task #${task?.id} !`));
  };
  const colorForPriority = (priority: Priority) => {
    switch (priority) {
      case "low":
        return "#1b8c4e";
      case "medium":
        return "rgb(249 196 2)";
      case "high":
        return "red";

      default:
        return "";
    }
  };
  const colorForTags = (tag: Tag) => {
    switch (tag) {
      case "holidays":
        return "#f5a356";
      case "sport":
        return "#56f556";
      case "studies":
        return "#9d56f5";
      case "work":
        return "#ad6e2f";
      case "bank":
        return "#f556e5";
      default:
        return "";
    }
  };
  const getTagIcon = (tag: Tag) => {
    switch (tag) {
      case "holidays":
        return <SurfingIcon />;
      case "work":
        return <WorkOutlineIcon />;
      case "bank":
        return <SavingsIcon />;
      case "sport":
        return <SportsBasketballIcon />;
      case "studies":
        return <CastForEducationIcon />;

      default:
        return "";
    }
  };
  return (
    <div className={styles.Task}>
      <div className={styles.Actions}>
        <EditIcon
          sx={{ color: "#2f3233", marginRight: "0.6rem" }}
          onClick={() => openEditModal()}
        />
        <DeleteIcon
          sx={{ color: "#2f3233" }}
          onClick={() => handleDeleteTask()}
        />
      </div>
      <div className={styles.Taskname}>{task.taskName}</div>
      <div className={styles.TagSection}>
        <Chip
          icon={<LowPriorityIcon />}
          label={task.priority}
          style={{
            backgroundColor: colorForPriority(task.priority),
            width: "10rem",
          }}
        />
        <Chip
          icon={getTagIcon(task.tag) as any}
          label={task.tag}
          style={{
            backgroundColor: colorForTags(task.tag),
            marginLeft: "1.6rem",
            width: "10rem",
          }}
        />
      </div>
    </div>
  );
};

export default TaskComponent;
