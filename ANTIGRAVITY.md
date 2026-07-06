# Antigravity AI Development Guide - pharaoh-math-maze

此文件供 AI 助理（如 Antigravity）在後續開工與日常開發時讀取，記錄本專案的特殊規則、檔案結構與開發規範。

## 1. 專案背景與架構
- **專案名稱**：法老的詛咒：圖坦卡門的數學迷宮 (`pharaoh-math-maze`)
- **定位**：針對國小第二學習階段（中年級）數學能力指標（n-II-1, n-II-2 等）的遊戲化題庫系統。
- **技術棧**：
  - HTML5 + Vanilla CSS (手寫漸層、微動畫、埃及風格)
  - Vanilla JavaScript (無外部框架，純 Client-side)
  - 音效引擎：Web Audio API (純代碼合成音效，無外部 mp3)
  - 粒子系統：Canvas 煙火特效

## 2. 開發規範與地雷防範（🚨 重要）
- **資源路徑大小寫**：GitHub Pages 託管於 Linux 伺服器，**大小寫敏感**。所有圖片和資源名稱必須維持**全小寫**，且引用路徑必須與磁碟上完全一致（如 `assets/images/bastet_avatar.png`）。
- **相對路徑原則**：嚴禁寫入任何包含 `file:///` 或本機碟符（如 `D:/`）的絕對路徑。必須使用相對於根目錄的相對路徑。
- **無混合內容 (HTTPS)**：外部引入的字型、庫等一律使用 `https://` 協定，避免部署至 GitHub Pages 後被瀏覽器攔截。
- **題庫資料格式**：題庫保存在 `questions.js` 中的 `QUESTIONS_DATABASE` 陣列，每題格式需嚴格符合：
  ```javascript
  {
    "indicator": "指標編碼：...",
    "number": "題號",
    "text": "題目敘述...",
    "options": [
      { "letter": "A", "text": "選項內容" },
      ...
    ],
    "answer": "A/B/C/D",
    "image": "assets/images/imageX.png", // 選填
    "hint": "提示文字..."
  }
  ```

## 3. 開發工作流
- **開工**：讀取此文件及進行 `git status` 檢查。
- **收工**：確認無敏感資料洩漏，更新此文件（如有新規則）或開發筆記，逐個 stage 檔案並進行 commit。
- **自動部署**：專案透過 GitHub Pages 部署，網址為：`https://grethel1988-ai.github.io/pharaoh-math-maze/`
