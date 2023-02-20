import styles from "./task.module.css";
import Trash from "/src/assets/trash.svg";

interface TaskProps {
  content: string;
  isChecked: boolean;
  id: string;
  checkCompletedTasks: Function;
  deleteTask: Function;
}

export function Task({
  content,
  checkCompletedTasks,
  deleteTask,
  id,
}: TaskProps) {
  function checkCompletedTask() {
    document.getElementById("content")!.style.textDecoration = "line-through"
    document.getElementById("content")!.style.color = "var(--gray-300)"
    checkCompletedTasks();
  }

  function deleteTasks() {
    deleteTask(id);
  }

  return (
    <div>
      <div className={styles.task}>
        <div>
          <input
            onChange={checkCompletedTask}
            type="checkbox"
            className={styles.checkbox}
          ></input>
          <p id="content">{content}</p>
        </div>
        <img onClick={deleteTasks} src={Trash} />
      </div>
    </div>
  );
}
