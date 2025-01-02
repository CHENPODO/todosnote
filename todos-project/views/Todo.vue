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
				placeholder="輸入附註（可選）"
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
h1 {
	text-align: center;
	font-size: 2rem;
	margin-top: 2rem;
}

.div1 {
	margin-top: 2rem;
	height: auto;
	background-color: #f5f5f5b8;
	display: flex;
	flex-direction: column; /* 垂直排列 */
	align-items: center; /* 子元素水平居中 */
	padding: 1rem; /* 添加內邊距使內容不緊貼邊緣 */
	min-height: 100vh; /* 設定最小高度，讓內容向下延伸 */
}

button {
	margin-left: 10px;
}

#input-wrapper .input-style {
	border-radius: 20px;
	background-color: #e3e3e3;
	padding: 10px; /* 調整內邊距 */
	max-width: 424px; /* 限制最大寬度 */
}
</style>
