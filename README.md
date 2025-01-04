# Todo List API
My First SideProject 1
簡單的待辦事項 API 服務，使用 Express.js 和 Prisma ORM 建置。

## 技術棧

- Node.js
- Express.js
- Prisma ORM
- MySQL/PostgreSQL

## 環境要求

- Node.js 16.0+
- MySQL 或 PostgreSQL 數據庫

## 環境變數設置

創建 `.env` 文件並設置：

```env
# 數據庫連接 URL
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# 服務器端口
PORT=3002

# 前端 URL
FRONTEND_URL="http://localhost:5173"
```

## 快速開始

1. 安裝依賴：
```bash
npm install
```

2. 初始化 Prisma：
```bash
npx prisma generate
npx prisma db push
```

3. 啟動服務器：
```bash
npm run dev
```

## API 端點

- GET `/todos` - 獲取所有待辦事項
- POST `/todos_post` - 創建新待辦事項
- PUT `/update/:id` - 更新待辦事項
- DELETE `/delete/:id` - 刪除待辦事項

## 聯絡方式

- Email：yan.work2002@gmail.com
- GitHub：[CHENPODO](https://github.com/CHENPODO)
- LinkedIn：[Hsinyen Chen](https://www.linkedin.com/in/hsinyen-chen)
