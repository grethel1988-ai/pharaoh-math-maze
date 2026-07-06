# 專案開發筆記 - 法老的詛咒：圖坦卡門的數學迷宮

## 📋 已完成事項 (2026-07-06)
1. **GitHub 規範稽核**：
   - 檢查並確認 `index.html` 入口、相對路徑、HTTPS 混合安全性、大小寫相容性等皆符合託管標準。
2. **初始化儲存庫與基本文檔**：
   - 建立 `.gitignore`、`LICENSE` (MIT)、`README.md`、`ANTIGRAVITY.md`。
   - 本地初始化 Git，並改預設分支為 `main`。
3. **GitHub 雲端同步與部署**：
   - 建立遠端公開儲存庫 `pharaoh-math-maze` 並推送首版。
   - 啟用 GitHub Pages 部署服務，網址：https://grethel1988-ai.github.io/pharaoh-math-maze/。

## 🔍 踩坑與注意事項
* **大小寫敏感性**：GitHub Pages 伺服器區分大小寫。未來新增圖片或引用的資源檔案時，名稱與代碼中的路徑一律使用**全小寫**，以防網頁部署後圖片顯示破圖。
* **相對路徑**：代碼中一律不可出現 `file:///` 等本機實體路徑。

## 🚀 下一步計畫
1. **遊戲題庫優化**：視需要依據中年級指標繼續增刪或調整 `questions.js`。
2. **專名號劃線功能**：視需求使用 python-docx 對原始 Word 文件題庫進行專名標記與標註處理。
