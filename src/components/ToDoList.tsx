import { useRecoilState, useRecoilValue } from 'recoil';
import CreateTodo from './CreateToDo';
import { toDoState } from 'src/atoms';
import ToDo from './ToDo';

function ToDoList() {
	const toDos = useRecoilValue(toDoState);

	return (
		<div>
			<h1>To Dos</h1>
			<hr />
			<CreateTodo />
			<ul>
				{toDos.map((toDo) => (
					<ToDo {...toDo} />
				))}
			</ul>
		</div>
	);
}

export default ToDoList;
