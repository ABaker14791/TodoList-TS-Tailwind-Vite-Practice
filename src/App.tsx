import { useState, useRef } from "react";
import "./App.css";

function App() {
	const input = useRef<HTMLInputElement>(null);
	const [todoList, setTodoList] = useState<
		{ id: number; taskName: string; date: string; time: string }[]
	>([]);
	const [newTask, setNewTask] = useState<string>("");

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setNewTask(event.target.value);
	}

	function addTask(event: React.FormEvent<HTMLButtonElement>) {
		event.preventDefault();

		if (newTask) {
			const task: { id: number; taskName: string; date: string; time: string } =
				{
					id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
					taskName: newTask,
					date: new Date().toLocaleDateString(),
					time: new Date().toLocaleTimeString("en-GB", {
						hour: "numeric",
						minute: "numeric",
					}),
				};
			setTodoList([...todoList, task]);
			if (input.current !== null) {
				input.current.value = "";
			}
		} else return;
		setNewTask("");
	}

	function deleteTask(id: object) {
		setTodoList(todoList.filter((task) => task !== id));
	}

	return (
		<div className="container mx-auto w-1/2 max-w-sm flex flex-col">
			<form className="flex flex-col content-center mt-28">
				<input
					type="text"
					ref={input}
					placeholder="Enter Task"
					onChange={handleChange}
					className="p-2 rounded"
				/>
				<button
					type="submit"
					onClick={addTask}
					className="p-2 bg-slate-600 mt-1 rounded"
				>
					Add Task
				</button>
			</form>
			<div>
				<ul className="mt-12">
					{todoList.map((todo) => (
						<div
							key={todo.id}
							className="flex gap-4 mt-2 pl-4 justify-between border-2 rounded-lg"
						>
							<li className="py-2 text-xl w-full">
								<div className="">
									<div className="flex justify-between w-full">
										<div className="text-slate-500 text-sm">{todo.date}</div>
										<div className="text-slate-500 text-sm">{todo.time}</div>
									</div>
									<div className="">{todo.taskName}</div>
								</div>
							</li>
							<button
								onClick={() => deleteTask(todo)}
								className="text-red-700 bg-zinc-300 px-4 rounded-tr rounded-br cursor-pointer"
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
