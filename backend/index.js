import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config() // 載入 .env 環境變數

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
	})
)

app.use(express.json()) //解析 JSON
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173", // 设置允许访问的前端地址
	})
) // 所有路由啟用

//GET 路由
app.get("/todos", async (req, res) => {
	try {
		const todos = await prisma.todo.findMany() //取得所有代辦事項
		res.json(todos) //回傳代辦事項
	} catch (err) {
		res.status(500).json({ error: "無法取得代辦事項" })
	}
})

app.post("/todos_post", async (req, res) => {
	const { title, note } = req.body // 取得標題和記事內容
	if (!title) {
		return res.status(400).json({ error: "標題必填" })
	}

	try {
		// 檢查是否已經存在相同的待辦事項
		const existingTodo = await prisma.todo.findFirst({
			where: {
				title: title, // 使用 findFirst 查詢條件
			},
		})

		if (existingTodo) {
			return res.status(400).json({ error: "已存在相同的待辦事項" })
		}

		// 如果不存在則創建新的待辦事項
		const newTodo = await prisma.todo.create({
			data: {
				title, // 新增代辦事項
				note, // 新增記事
			},
		})
		res.json(newTodo) // 回傳新增的代辦事項
	} catch (error) {
		console.error(error) // 輸出錯誤到終端機
		res.status(500).json({ error: "無法新增代辦事項" })
	}
})

// PUT 路由
app.put("/update/:id", async (req, res) => {
	const { id } = req.params // 取得待辦事項 ID
	const { title, note } = req.body // 取得標題和記事內容
	if (!title) {
		return res.status(400).json({ error: "標題必填" })
	}

	try {
		const updateTodo = await prisma.todo.update({
			where: {
				id: Number(id), // 根據 ID 查詢待辦事項
			},
			data: {
				title, // 更新標題
				note, // 更新note
			},
		})
		res.json(updateTodo) // 回傳更新的代辦事項
	} catch (error) {
		console.error(error) // 輸出錯誤到終端機
		res.status(500).json({ error: "無法更新代辦事項" })
	}
})

// DELETE 路由
app.delete("/delete/:id", async (req, res) => {
	const { id } = req.params // 取得待辦事項 ID
	try {
		const deleteTodo = await prisma.todo.delete({
			where: {
				id: Number(id), // 根據 ID 刪除待辦事項
			},
		})
		res.json(deleteTodo) // 回傳刪除的代辦事項
	} catch (error) {
		console.error(error) // 輸出錯誤到終端機
		res.status(500).json({ error: "無法刪除代辦事項" })
	}
})
// 啟動伺服器
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
