import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

// function ToDoList() {
// 	const [toDo, setToDo] = useState('');
// 	const [toDoError, setToDoError] = useState('');
// 	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
// 		const {
// 			currentTarget: { value }
// 		} = event;
// 		setToDo(value);
// 	};

// 	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		if (toDo.length < 10) {
// 			setToDoError('To do should be longer');
// 		}
// 		console.log('submit');
// 	};

// 	return (
// 		<div>
// 			<form onSubmit={onSubmit}>
// 				<input value={toDo} onChange={onChange} placeholder="Write a to do" />
// 				<button>Add</button>
// 				{toDoError !== '' ? toDoError : null}
// 			</form>
// 		</div>
// 	);
// }
const ErrorMessage = styled.span`
	color: red;
`;

interface IForm {
	Email: string;
	FirstName: string;
	LastName: string;
	Username: string;
	Password: string;
	Password1: string;
}

function ToDoList() {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<IForm>({
		defaultValues: {
			Email: '@naver.com'
		}
	});
	const onValid = (data: any) => {
		console.log(data);
	};
	return (
		<div>
			<form style={{ display: 'flex', flexDirection: 'column', gap: 5 }} onSubmit={handleSubmit(onValid)}>
				<input
					{...register('Email', {
						required: '이메일은 필수값 입니다.',
						pattern: {
							value: /^[A-Za-z0-9._%+-]+@naver.com$/,
							message: '네이버 메일인지 확인하여 주세요.'
						}
					})}
					placeholder="Email"
				/>
				<ErrorMessage>{errors?.Email?.message}</ErrorMessage>
				<input {...register('FirstName', { required: '필수값 입니다.' })} placeholder="First Name" />
				<ErrorMessage>{errors?.FirstName?.message}</ErrorMessage>
				<input {...register('LastName', { required: '필수값 입니다.' })} placeholder="Last Name" />
				<ErrorMessage>{errors?.LastName?.message}</ErrorMessage>
				<input
					{...register('Username', { required: '필수값 입니다.', minLength: 10 })}
					placeholder="Username"
				/>
				<ErrorMessage>{errors?.Username?.message}</ErrorMessage>
				<input {...register('Password', { required: '필수값 입니다.', minLength: 5 })} placeholder="Password" />
				<ErrorMessage>{errors?.Password?.message}</ErrorMessage>
				<input
					{...register('Password1', {
						required: '비밀번호 재확인을 입력해 주세요.',
						minLength: {
							value: 5,
							message: '비밀번호 길이가 짧습니다'
						}
					})}
					placeholder="Password Confirmation"
				/>
				<ErrorMessage>{errors?.Password1?.message}</ErrorMessage>
				<button>Add</button>
			</form>
		</div>
	);
}

export default ToDoList;
