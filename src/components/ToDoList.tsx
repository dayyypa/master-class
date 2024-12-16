import { useRecoilState, useRecoilValue } from 'recoil';
import CreateTodo from './CreateToDo';
import { toDoSelector, toDoState } from 'src/atoms';
import ToDo from './ToDo';

function ToDoList() {
	const [toDo, doing, done] = useRecoilValue(toDoSelector);

	return (
		<div>
			<h1>To Dos</h1>
			<hr />
			<CreateTodo />
			<h2>To Do</h2>
			<ul>
				{toDo.map((toDo) => (
					<ToDo {...toDo} />
				))}
			</ul>
			<hr />
			<h2>Doing</h2>
			<ul>
				{doing.map((toDo) => (
					<ToDo {...toDo} />
				))}
			</ul>
			<hr />
			<h2>Done</h2>
			<ul>
				{done.map((toDo) => (
					<ToDo {...toDo} />
				))}
			</ul>
		</div>
	);
}

export default ToDoList;
