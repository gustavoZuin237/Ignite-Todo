import styles from "./task.module.css";
import Trash from "/src/assets/trash.svg";

interface TaskProps {
  content: string;
  isChecked: boolean;
  index: number;
  checkCompletedTasks: Function;
  deleteTask: Function;
}

export function Task({
  content,
  isChecked,
  checkCompletedTasks,
  deleteTask,
  index,
}: TaskProps) {
  function checkCompletedTask() {
    checkCompletedTasks(index);
  }

  function deleteTasks() {
    deleteTask(index);
  }

  return (
    <div>
      <div className={styles.task}>
        <div>
          <input
            checked={isChecked}
            onChange={checkCompletedTask}
            type="checkbox"
            className={styles.checkbox}
          ></input>
          <p>{content}</p>
        </div>
        <img onClick={deleteTasks} src={Trash} />
      </div>
    </div>
  );
}
