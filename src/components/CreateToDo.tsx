import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from 'src/atoms';

interface IForm {
	toDoInput: string;
}

function CreateTodo() {
	const setToDos = useSetRecoilState(toDoState);

	const { register, handleSubmit, setValue } = useForm<IForm>();

	const handleValid = ({ toDoInput }: IForm) => {
		const newTodo: IToDo = { text: toDoInput, id: Date.now(), category: 'TO_DO' };

		setToDos((oldToDos) => [newTodo, ...oldToDos]);
		// setToDos((old) => [...old, newTodo]);

		setValue('toDoInput', '');
	};
	// const [list, setList] = useState<string[]>([]);
	// // list = ['b', 'a'] --> ['c','b','a']
	// setList((oldList)=>{
	//
	// 	return ['c',...oldList] // ['c', 'b', 'a']
	// })
	// setList((oldList) => ['c', ...oldList])
	// setList(['c'])

	return (
		<form onSubmit={handleSubmit(handleValid)}>
			<input
				{...register('toDoInput', {
					required: 'Please write a To Do'
				})}
				placeholder="Write a to do"
			/>
			<button>Add</button>
		</form>
	);
}

export default CreateTodo;
