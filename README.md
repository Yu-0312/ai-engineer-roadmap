# 🔥 AI Engineer Roadmap 2026 · 互動式教學網站

根據 12 站 AI Engineer 路線圖打造的單頁互動教學網站(純前端、無需建置、可離線使用)。

## 🚀 如何使用

**方式一(最簡單):** 直接用瀏覽器打開 `index.html`。

**方式二(本機伺服器):**

```bash
cd ai-engineer-roadmap
python3 -m http.server 8000
# 打開 http://localhost:8000
```

## ✨ 特色

- **有連貫性的主線劇情** — 一個貫穿 12 站的畢業專案「DocMind 智慧文件助理」:每一站都為它添上一塊積木(讀文件 → Git → SQL → 意圖分類 → 神經網路 → 接 LLM → 提示詞 → RAG → 向量庫 → Agent → Docker → 上線),每頁都有「接續上一站」與「下一站預告」。
- **互動學習** — 概念翻牌卡、36 道隨堂測驗(即時解析)、程式碼一鍵複製、語法高亮。
- **3 座互動實驗室** — 第 6 站 Temperature 模擬器、第 7 站提示詞建構器、第 9 站語意空間地圖。
- **進度系統** — localStorage 保存:測驗全對才能標記完成、頂部進度環、路線圖勾勾、完成全部 12 站解鎖結業證書(可輸入名字並列印)。

## 📁 結構

```
ai-engineer-roadmap/
├── index.html        # 頁面骨架
├── css/style.css     # 樣式(淺色簡潔風)
└── js/
    ├── stages-a.js   # 站點內容 1–6
    ├── stages-b.js   # 站點內容 7–12
    └── app.js        # 路由 / 測驗 / 進度 / 互動實驗室
```

進度資料存在瀏覽器 localStorage(`ai-roadmap-2026-progress-v1`),可透過右上角 ↺ 按鈕重置。
