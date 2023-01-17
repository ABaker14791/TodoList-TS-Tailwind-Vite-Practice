import { useState, useRef } from "react";
import "./App.css";

function App() {
	const [todoList, setTodoList] = useState<{ id: number; taskName: string }[]>(
		[]
	);
	const [newTask, setNewTask] = useState<string>("");

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setNewTask(event.target.value);
	}

	function addTask(event: React.FormEvent<HTMLButtonElement>) {
		event.preventDefault();

		if (newTask) {
			const task: { id: number; taskName: string } = {
				id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
				taskName: newTask,
			};
			setTodoList([...todoList, task]);
			clearInput();
		} else return;
		console.log(newTask);
	}

	function clearInput() {
		setNewTask("");
	}

	function deleteTask(id: number | any) {
		setTodoList(todoList.filter((task) => task !== id));
	}

	return (
		<div className="container mx-auto w-1/2 max-w-sm flex flex-col">
			<form className="flex flex-col content-center mt-28">
				<input
					type="text"
					placeholder="Enter Task"
					onChange={handleChange}
					className="p-2 rounded"
				/>
				<button
					type="submit"
					onClick={addTask}
					className="p-2 bg-slate-600 mt-1"
				>
					Add Task
				</button>
			</form>
			<div>
				<ul className="mt-12">
					{todoList.map((todo) => (
						<div key={todo.id} className="flex gap-4 mt-2 justify-between">
							<li className="py-2 text-xl">
								{todo.taskName}
								{/* {todo.id} */}
							</li>
							<button
								onClick={() => deleteTask(todo)}
								className="text-red-700 bg-zinc-300 px-4 rounded cursor-pointer"
							>
								X
							</button>
						</div>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
