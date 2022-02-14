import Head from "next/head";
import Tasks from "components/Tasks/Tasks";

const TasksPage = () => {
  return (
    <>
      <Head>
        <title>Tasks list | Taskify</title>
      </Head>

      <Tasks />
    </>
  );
};

export default TasksPage;
