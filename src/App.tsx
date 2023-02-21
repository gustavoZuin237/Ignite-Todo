import Rocket from "/src/assets/Logo.svg";
import { PlusCircle } from "phosphor-react";
import Clipboard from "/src/assets/Clipboard.svg";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Task } from "./components/task/task";

export function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const [totalTaskCount, setTotalTaskCount] = useState(taskList.length);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  function createNewTask() {
    if (task !== "") {
      setTaskList([
        ...taskList,
        {
          id: uuidv4(),
          title: task,
          isChecked: false,
        },
      ]);

      setTotalTaskCount(totalTaskCount + 1);
      setTask("");
      hideEmptyTaskList(event);
    }
  }

  function checkCompletedTasks(index) {

    const newTasks = [...taskList];
    newTasks[index].isChecked = true;
    setTaskList(newTasks);

    const taskListWithoutCompleted = taskList.filter((task) => {
      return task.isChecked == true;
    });
    setCompletedTaskCount(taskListWithoutCompleted.length);   
  }

  function deleteTasks(index) {
    const taskListWithoutDeleted = taskList.filter((task) => {
      let taskIndex = taskList.indexOf(task);
      return taskIndex !== index;
    });
    
    setTotalTaskCount(taskListWithoutDeleted.length)
    setTaskList(taskListWithoutDeleted);
  }

  function hideEmptyTaskList(event: MouseEvent) {
    event.preventDefault();
    document.getElementById("emptyTaskList")!.style.display = "none";
    document.getElementById("taskList")!.style.border = "0";
    document.getElementById("taskList")!.style.paddingTop = "0";
  }

  return (
    <div>
      <header className="header">
        <img src={Rocket} />
      </header>

      <div className="inputAndButtonWrapper">
        <input
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
          type="text"
          placeholder="Adicione uma nova tarefa"
        />
        <button onClick={createNewTask}>
          Criar <PlusCircle className="plusIcon" size={22} />
        </button>
      </div>

      <div className="taskBox">
        <div className="createdTasks">
          <p>Tarefas criadas</p>
          <div className="counter">{totalTaskCount}</div>
        </div>

        <div className="completedTasks">
          <p>Concluídas</p>
          <div className="counter">
            {completedTaskCount} de {totalTaskCount}
          </div>
        </div>
      </div>

      <div id="taskList" className="taskList">
        <div id="emptyTaskList">
          <img className="clipboard" src={Clipboard} alt="" />
          <p className="boldTaskListText">
            Você ainda não tem tarefas cadastradas
          </p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>

        {taskList.map((task, index) => {
          return (
            <Task
              key={index}
              index={index}
              content={task.title}
              isChecked={task.isChecked}
              checkCompletedTasks={checkCompletedTasks}
              deleteTask={deleteTasks}
            />
          );
        })}
      </div>
    </div>
  );
}
