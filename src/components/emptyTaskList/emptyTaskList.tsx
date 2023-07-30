// @ts-ignore
import Clipboard from "/src/assets/Clipboard.svg";
// @ts-ignore
import styles from "./emptyTaskList.module.css"

export function EmptyTaskList() {
  return (
      <div className={styles.emptyTaskList}>
        <img className={styles.clipboard }src={Clipboard} alt="" />
        <p className={styles.boldTaskListText}>
          Você ainda não tem tarefas cadastradas
        </p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
  );
}
