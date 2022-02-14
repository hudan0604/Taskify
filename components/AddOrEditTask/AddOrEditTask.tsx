import {
  Button,
  CircularProgress,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { tasksService } from "services";
import { Task } from "types/task";
import styles from "./AddOrEditTask.module.scss";

const AddOrEditTask = ({
  task,
  onClose,
  formType,
}: {
  task?: Task;
  onClose: (fetch?: boolean) => void;
  formType: "add" | "edit" | undefined;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: task
      ? {
          taskName: task.taskName,
          body: task.body,
          priority: {
            label: `${task.priority
              .slice(0, 1)
              .toUpperCase()}${task.priority.slice(1)}`,
            value: task.priority,
          },
          tag: {
            label: `${task.tag.slice(0, 1).toUpperCase()}${task.tag.slice(1)}`,
            value: task.tag,
          },
        }
      : undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const submit = async (data) => {
    data.tag = data.tag.value;
    data.priority = data.priority.value;
    data.id = task?.id;
    setIsLoading(true);
    if (formType === "add") {
      tasksService
        .addTask(data)
        .then(() => {
          setIsLoading(false);
          onClose(true);
          toast.success("Task successfuly created !");
        })
        .catch(() => toast.error("Error when creating task !"));
    } else {
      tasksService
        .editTask(data)
        .then(() => {
          setIsLoading(false);
          onClose(true);
          toast.success(`Task #${task?.id} successfuly updated !`);
        })
        .catch(() => toast.error(`Error when updating task #${task?.id} !`));
    }
  };
  const tagOptions = ["sport", "holidays", "studies", "work", "bank"].map(
    (type) => ({
      value: type,
      label: `${type.slice(0, 1).toUpperCase()}${type.slice(1)}`,
    })
  );
  const priorityOptions = ["low", "medium", "high"].map((type) => ({
    value: type,
    label: `${type.slice(0, 1).toUpperCase()}${type.slice(1)}`,
  }));

  return (
    <>
      <h4>{formType === "add" ? "Add task" : "Edit task"}</h4>
      <form onSubmit={handleSubmit(submit)} className={styles.Form}>
        <Controller
          control={control}
          name={"taskName"}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              required
              type="text"
              label="Name"
              error={fieldState?.error as any}
              className={styles.Input}
            />
          )}
          rules={{ required: true }}
        />
        <Controller
          control={control}
          name={"body"}
          render={({ field }) => (
            <TextareaAutosize
              aria-label="minimum height"
              minRows={4}
              {...field}
              required
              placeholder="Task description *"
              className={styles.Textarea}
            />
          )}
          rules={{ required: true }}
        />
        <Controller
          control={control}
          name={"tag"}
          render={({ field }) => (
            <>
              <label style={{ marginBottom: "0.6rem" }}>Tag *</label>
              <Select
                className={styles.Input}
                menuPlacement="top"
                options={tagOptions}
                {...field}
              />
            </>
          )}
          rules={{ required: true }}
        />
        <Controller
          control={control}
          name={"priority"}
          render={({ field }) => (
            <>
              <label style={{ marginBottom: "0.6rem" }}>Priority *</label>
              <Select
                className={styles.Input}
                menuPlacement="top"
                options={priorityOptions}
                {...field}
              />
            </>
          )}
          rules={{ required: true }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || !isValid}
          className={styles.Button}
        >
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : formType === "add" ? (
            "Add task"
          ) : (
            "Edit task"
          )}
        </Button>
      </form>
    </>
  );
};

export default AddOrEditTask;
