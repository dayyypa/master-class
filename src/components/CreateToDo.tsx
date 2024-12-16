import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, IToDo, toDoState } from 'src/atoms';

interface IForm {
	toDoInput: string;
}

function CreateTodo() {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();

	const handleValid = ({ toDoInput }: IForm) => {
		setToDos((oldToDos) => [{ text: toDoInput, id: Date.now(), category }, ...oldToDos]);

		setValue('toDoInput', '');
	};

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
