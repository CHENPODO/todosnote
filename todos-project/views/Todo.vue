<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3002/"
const todos = ref([]) // 存待辦事項
const newTodo = ref("") // 存新待辦事項
const newNote = ref("") // 存新附註

// 建立抓取後端的函數
const fetchTodos = async () => {
	try {
		const response = await axios.get(`${VITE_API_BASE_URL}todos`)
		todos.value = response.data
	} catch (error) {
		console.error("無法獲取待辦事項", error)
	}
}

// 新增待辦事項的函數
const addTodos = async () => {
	if (newTodo.value) {
		try {
			const response = await axios.post(`${VITE_API_BASE_URL}todos_post`, {
				title: newTodo.value,
				note: newNote.value, // 將附註也傳到後端
			})
			todos.value.push(response.data) // 將新增的待辦事項加入 todos
			newTodo.value = "" // 清空待辦事項輸入框
			newNote.value = "" // 清空附註輸入框
		} catch (error) {
			console.error("無法新增待辦事項", error)
		}
	}
}

// 刪除待辦事項的函數
const deleteTodo = async (id) => {
	try {
		await axios.delete(`${VITE_API_BASE_URL}delete/${id}`)
		todos.value = todos.value.filter((todo) => todo.id !== id) // 刪除指定 id 的待辦事項
	} catch (error) {
		console.error("無法刪除待辦事項", error)
	}
}

// 組件掛載時抓取待辦事項
onMounted(fetchTodos)
</script>

<template>
	<h1 class="font-heading">待辦事項</h1>
	<div class="flex-col div1 font-body text-black">
		<form @submit.prevent="addTodos" class="flex flex-col mb-4">
			<input v-model="newTodo" type="text" id="input-wrapper" placeholder="輸入新的待辦事項" class="flex-grow mr-2 p-2 rounded-lg border-gray-300" />
			<input
				v-model="newNote"
				type="text"
				id="note-wrapper"
				placeholder="輸入（可選）"
				class="input-style flex-grow mr-2 p-2 rounded-lg border-gray-300 mt-2"
			/>
			<button class="bg-blue-500 text-white rounded-lg py-2 px-4 shadow hover:bg-blue-600">新增</button>
		</form>
		<ul>
			<li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center border-b py-2">
				<span>{{ todo.title }}</span>
				<span>{{ todo.note || "無附註" }}</span>
				<button @click="deleteTodo(todo.id)" class="text-red-500 hover:text-red-700">刪除</button>
			</li>
		</ul>
	</div>
</template>

<style>
/* 全局樣式 */
:root {
	--primary-color: #646cff;
	--secondary-color: #535bf2;
	--background-color: #f8f9fa;
	--card-background: #ffffff;
	--text-primary: #2c3e50;
	--text-secondary: #666666;
	--border-color: #e2e8f0;
	--shadow-color: rgba(0, 0, 0, 0.1);
}

/* 主標題樣式 */
h1 {
	text-align: center;
	font-size: 2.5rem;
	color: var(--text-primary);
	margin: 2rem 0;
	font-weight: 600;
	letter-spacing: -0.5px;
	font-family: "Georgia", serif;
}

/* 主容器樣式 */
.div1 {
	margin: 2rem auto;
	width: 90%;
	max-width: 800px;
	min-height: 100vh;
	background-color: var(--background-color);
	border-radius: 16px;
	box-shadow: 0 4px 6px var(--shadow-color);
	padding: 2rem;
}

/* 表單樣式 */
form {
	width: 100%;
	margin-bottom: 2rem;
	background-color: var(--card-background);
	padding: 1.5rem;
	border-radius: 12px;
	box-shadow: 0 2px 4px var(--shadow-color);
}

/* 輸入框共用樣式 */
input[type="text"] {
	width: 100%;
	padding: 0.875rem 1.25rem;
	margin-bottom: 1rem;
	border: 1px solid var(--border-color);
	border-radius: 8px;
	font-size: 1rem;
	color: var(--text-primary);
	background-color: var(--card-background);
	transition: all 0.3s ease;
}

input[type="text"]:focus {
	outline: none;
	box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}

/* 按鈕樣式 */
button {
	background-color: var(--primary-color);
	color: white;
	padding: 0.875rem 1.25rem;
	border-radius: 8px;
	border: none;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.3s ease;
}

button:hover {
	transform: translateY(-2px);
}

/* 待辦事項列表樣式 */
ul {
	width: 100%;
	list-style: none;
	padding: 0;
}

li {
	background-color: var(--card-background);
	padding: 1rem 1.5rem;
	margin-bottom: 0.75rem;
	border-radius: 8px;
	border: 1px solid var(--border-color);
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: all 0.3s ease;
}

li:hover {
	transform: translateX(10px);
	box-shadow: 0 2px 4px var(--shadow-color);
}

/* 刪除按鈕樣式 */
li button {
	background-color: transparent;
	color: #dc2626;
	padding: 0.5rem 1rem;
	font-size: 0.875rem;
}

li button:hover {
	background-color: #fee2e2;
	color: #dc2626;
	transform: none;
}

/* 待辦事項文字樣式 */
li span {
	color: var(--text-primary);
	font-size: 1rem;
}

/* 附註文字樣式 */
li span:nth-child(2) {
	color: var(--text-secondary);
	font-size: 0.875rem;
	font-style: italic;
}

/* 響應式設計 */
@media (max-width: 640px) {
	.div1 {
		width: 95%;
		padding: 1rem;
	}

	h1 {
		font-size: 2rem;
	}

	li {
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}

	li button {
		align-self: flex-end;
	}
}
</style>
