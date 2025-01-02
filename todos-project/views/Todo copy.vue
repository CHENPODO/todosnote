<template>
	<div class="container mx-auto p-4">
		<h1 class="text-2xl font-bold mb-4">待辦事項列表</h1>

		<form @submit.prevent="addTodo" class="mb-4">
			<input v-model="newTodo.title" type="text" placeholder="輸入待辦事項" class="border rounded p-2 mr-2 w-1/2" />
			<button type="submit" class="bg-blue-500 text-white rounded p-2">新增</button>
		</form>

		<ul>
			<li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center border-b py-2">
				<span>{{ todo.title }}</span>
				<button @click="deleteTodo(todo.id)" class="text-red-500 hover:text-red-700">刪除</button>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const todos = ref([])
const newTodo = ref({ title: "" })

const fetchTodos = async () => {
	try {
		const response = await axios.get("http://localhost:3000/todos")
		todos.value = response.data
	} catch (error) {
		console.error("無法獲取待辦事項", error)
	}
}

const addTodo = async () => {
	if (newTodo.value.title) {
		try {
			const response = await axios.post("http://localhost:3000/todos_post", newTodo.value)
			todos.value.push(response.data)
			newTodo.value.title = "" // 清空輸入框
		} catch (error) {
			console.error("無法新增待辦事項", error)
		}
	}
}

const deleteTodo = async (id) => {
	try {
		await axios.delete(`http://localhost:3000/delete/${id}`)
		todos.value = todos.value.filter((todo) => todo.id !== id) // 从列表中删除
	} catch (error) {
		console.error("無法刪除待辦事項", error)
	}
}

onMounted(fetchTodos)
</script>

<style scoped>
/* 在这里添加任何自定义样式 */
</style>
