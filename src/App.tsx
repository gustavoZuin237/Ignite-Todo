import Rocket from "/src/assets/Logo.svg";
import { PlusCircle } from "phosphor-react";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Task } from "./components/task/task";
import { EmptyTaskList } from "./components/emptyTaskList/emptyTaskList";

export function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  const [totalTaskCount, setTotalTaskCount] = useState(taskList.length);

  function createNewTask() {
    if (task !== "") {
      setTaskList([
        {
          id: uuidv4(),
          title: task,
          isChecked: false,
        },
        ...taskList
      ]);

      setTotalTaskCount(totalTaskCount + 1);
      setTask("");
    }
  }

  function checkCompletedTasks(index: number) {
    const newTasks = [...taskList];
    newTasks[index]['isChecked'] = true; //! ???????????????????????????????????????????
    setTaskList(newTasks);
  }

  function deleteTasks(index: number) {
    const taskListWithoutDeleted = taskList.filter((task) => {
      let taskIndex = taskList.indexOf(task);
      return taskIndex !== index;
    });

    setTotalTaskCount(taskListWithoutDeleted.length);
    setTaskList(taskListWithoutDeleted);
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
            {taskList.filter((task) => task['isChecked'] === true).length} de{" "}
            {totalTaskCount}
          </div>
        </div>
      </div>

      <div id="taskList" className="taskList">
        {taskList.length == 0 && <EmptyTaskList />}

        {taskList.map((task, index) => {
          return (
            <Task
              key={index}
              index={index}
              content={task['title']}
              isChecked={task['isChecked']}
              checkCompletedTasks={checkCompletedTasks}
              deleteTask={deleteTasks}
            />
          );
        })}
      </div>
    </div>
  );
}
