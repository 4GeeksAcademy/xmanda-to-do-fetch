import React, { useState, useEffect } from "react";

const Home = () => {
	const [task, setTask] = useState("");
	const [items, setItems] = useState([]);

	const fetchItems = () => {
		fetch('https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/xmanda')
			.then(response => response.json()).then(data => { setItems(data); })
			.catch(err => console.error(err));
	};

	//FETCH
	useEffect(() => {
		fetchItems();
	}, [])

	//ADD TASK ON BOTH SITE AND API
	function handleTask(e) {
		if (e.key === "Enter" && e.target.value != "") {
			// Frontend
			setItems(items.concat({ label: e.target.value, done: false }));
			// Add in database - Backend
			let aux = items.concat({ label: e.target.value, done: false }); // Array auxiliar para prevenir el delay en el fetch y lo paso como parámetro
			setTodoList(aux);
			setTask("");
		}
	}


	// REMOVE TASK ON BOTH SITE AND API
	const removeTask = (id) => {
		setItems((prevItems) =>
			prevItems.filter((_, currentIndex) => id !== currentIndex)
		);
		let aux = items.filter((id, index) => index !== id);
		setTodoList(aux);
	};

	// Delete All
	function clearList() {
		setItems([]);
		setTodoList([]);
	}

	//PUT API
	function setTodoList(lista) {
		fetch(
			"https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/xmanda",
			{
				method: "PUT",
				body: JSON.stringify(lista),
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((resp) => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	//see array on console
	console.log(items)

	//html with calls
	return (
		<div className="container">
			<div className="listHolder rounded">
				<h1 className="title">To-do List</h1>
				<ul>
					<input
						type="text"
						onChange={(e) => { setTask(e.target.value) }}
						value={task}
						onKeyDown={(e) => {
							handleTask(e);
						}}
						placeholder="Write your task here"
					/>

					{items.map((task, index) => (
						<li key={index}>
							{task.label}
							<i
								className="delete fa-solid fa-xmark"
								onClick={() => removeTask(index)}
							></i>
						</li>
					))}
				</ul>


				<div className="taskNumber">{items.length} tasks</div>

				<button
					className="btn btn-danger mx-4"
					onClick={() => {
						clearList();
					}}
				>
					Delete All
				</button>

			</div>
		</div>
	);
};

export default Home;