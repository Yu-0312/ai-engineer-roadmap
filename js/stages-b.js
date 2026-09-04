/* AI Engineer Roadmap 2026 — 站點資料(第 7–12 站) */
window.STAGES_B = [

{
  id: 7,
  emoji: "✍️",
  title: "提示詞工程",
  tagline: "學會跟 AI 講話的藝術",
  color: "#f59e0b",
  duration: "約 1 週",
  connection: "上一站 DocMind 會說話了,但答案時好時壞?模型不變,變的是你下的指令。提示詞工程是投資報酬率最高的技能 — 不用改任何程式,同一個模型可以因此變聰明一大截。",
  contribution: "為 DocMind 設計正式的系統提示詞:角色、規則、輸出格式與 few-shot 範例一次到位。",
  goals: [
    "掌握結構化提示詞:角色 / 任務 / 脈絡 / 格式",
    "學會用 few-shot 範例穩定輸出",
    "理解 Chain-of-Thought 逐步推理",
    "認識提示詞注入風險與基本防護"
  ],
  concepts: [
    { t: "系統提示詞", en: "System Prompt", d: "定義 AI 的角色與規則的「幕後劇本」,通常使用者看不到,卻決定回答的風格與底線。" },
    { t: "少樣本提示", en: "Few-shot", d: "在提示詞裡直接給 2–3 個輸入輸出範例,模型會模仿格式與風格 — 常比長篇大論的解釋更有效。" },
    { t: "思維鏈", en: "Chain-of-Thought", d: "請模型「一步一步想再給答案」。對數學與邏輯類問題,正確率顯著提升。" },
    { t: "結構化輸出", en: "Structured Output", d: "明確指定 JSON / Markdown 表格等格式並給範例,下游程式才能穩定解析。" },
    { t: "提示詞注入", en: "Prompt Injection", d: "使用者輸入可能覆蓋你的指令。用明確的分隔符、權限設計與過濾來降低風險。" }
  ],
  code: [{
    lang: "python",
    name: "docmind_prompt.py",
    desc: "DocMind 的正式系統提示詞:規則明確、格式固定、拒絕編造。",
    src: `SYSTEM_PROMPT = """你是 DocMind,一位嚴謹的文件助理。

## 規則
1. 只根據「參考資料」回答,嚴禁編造內容
2. 回答末尾標註來源,例如(來源:產品手冊 p.12)
3. 資料不足時,明確說「文件中沒有提到」
4. 一律使用繁體中文回答

## 輸出格式
- 先用 2–3 句話給重點摘要
- 再用條列補充細節
"""

def build_prompt(question: str, context: str):
    return [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user",
         "content": f"## 參考資料\\n{context}\\n\\n## 問題\\n{question}"},
    ]`
  }],
  quiz: [
    { q: "few-shot prompting 是指?",
      opts: ["少量多次地呼叫 API 以省錢", "在提示詞中提供幾個範例讓模型模仿", "改用參數更小的模型", "一次只問幾個字的短問題"],
      a: 1,
      why: "給 2–3 個「輸入→輸出」範例,模型就能抓住你要的格式與風格,常比文字描述更精準。" },
    { q: "「讓我一步一步想」(Chain-of-Thought)最適合什麼任務?",
      opts: ["單純的翻譯", "需要多步推理的數學與邏輯問題", "生成圖片", "壓縮檔案"],
      a: 1,
      why: "展開推理過程能大幅減少「直接跳答案」的錯誤,對多步驟問題特別有效。" },
    { q: "DocMind 要求「文件中沒有提到就老實說」,是為了?",
      opts: ["節省 API 費用", "降低幻覺,避免編造答案", "加快回應速度", "讓介面更美觀"],
      a: 1,
      why: "LLM 天生傾向「有問必答」。明確允許它說「不知道」,是對抗幻覺最簡單有效的一招。" }
  ],
  demo: "prompt",
  project: "幫 DocMind 寫出完整 system prompt(角色 + 規則 + 格式 + 2 個 few-shot 範例),並對同一個問題測試前後差異。",
  resources: [
    { n: "OpenAI Prompt Engineering 指南", u: "https://platform.openai.com/docs/guides/prompt-engineering" },
    { n: "Anthropic 互動式 Prompt 教程", u: "https://github.com/anthropics/prompt-eng-interactive-tutorial" }
  ],
  next: "提示詞再好,模型腦中仍沒有你的文件。下一站讓它「開卷考」:RAG — 本路線圖的技術高潮。"
},

{
  id: 8,
  emoji: "📚",
  title: "RAG 檢索增強生成",
  tagline: "給 LLM 一座外掛圖書館",
  color: "#6366f1",
  duration: "約 2–3 週",
  connection: "上一站的系統提示詞讓 DocMind 守規矩,但模型腦中沒有你公司的內部文件 — context window 也裝不下百萬字。RAG 的思路很優雅:先檢索出相關段落,再讓模型「開卷作答」。DocMind 從聊天機器人,升級成真正的知識助理。",
  contribution: "DocMind 的核心功能誕生:上傳文件 → 切塊 → 向量化 → 檢索 → 有憑有據的回答。",
  goals: [
    "掌握 RAG 的完整流程與每個環節",
    "理解 chunking 切塊策略的取捨",
    "學會評估檢索品質",
    "設計引用來源與防幻覺機制"
  ],
  concepts: [
    { t: "RAG", en: "Retrieval-Augmented Generation", d: "檢索增強生成:先從知識庫撈出相關內容,塞進提示詞,讓模型據此回答。" },
    { t: "為什麼需要 RAG", en: "Why RAG", d: "模型沒看過你的私有資料、知識有截止日期;微調又貴又不擅長「背事實」。RAG 便宜、可即時更新、答案可溯源。" },
    { t: "切塊", en: "Chunking", d: "把長文件切成 200–800 token 的片段(按標題、段落邊界)。太大 → 雜訊多;太小 → 語意斷裂。" },
    { t: "檢索", en: "Retrieval", d: "把使用者的問題也變成向量,找出最相近的文件片段。品質決定 RAG 的上限 — 下一站深入。" },
    { t: "引用與防幻覺", en: "Citations", d: "在提示詞要求「只依據參考資料回答並標註來源」,答不出來就老實說不知道。" }
  ],
  code: [{
    lang: "python",
    name: "mini_rag.py",
    desc: "最小可用 RAG:20 行程式碼,DocMind 的心臟就此誕生。",
    src: `from openai import OpenAI
import numpy as np

client = OpenAI()
chunks = [...]  # 預先切好的文件片段

def embed(text: str):
    r = client.embeddings.create(
        model="text-embedding-3-small", input=text)
    return r.data[0].embedding

chunk_vecs = np.array([embed(c) for c in chunks])

def retrieve(question: str, k: int = 3):
    q = np.array(embed(question))
    sims = chunk_vecs @ q / (
        np.linalg.norm(chunk_vecs, axis=1) * np.linalg.norm(q))
    top = sims.argsort()[-k:][::-1]
    return [chunks[i] for i in top]

context = "\\n---\\n".join(retrieve("退貨政策是什麼?"))
answer = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user",
      "content": f"只依據以下資料回答並標註來源:\\n{context}\\n\\nQ: 退貨政策是什麼?"}],
)
print(answer.choices[0].message.content)`
  }],
  quiz: [
    { q: "RAG 相比微調(fine-tuning)的主要優勢?",
      opts: ["一定更聰明", "知識可即時更新、成本低、答案可溯源", "完全不需要 GPU 或網路", "讓模型檔案變小"],
      a: 1,
      why: "換文件 = 換知識,不用重訓模型;回答附來源可驗證。微調更適合調整「風格與格式」,而非灌「事實」。" },
    { q: "chunk(切塊)切得太大了會怎樣?",
      opts: ["完全沒有影響", "一個片段塞進太多主題,檢索時雜訊變多", "向量會變短", "存不進向量資料庫"],
      a: 1,
      why: "一大段混雜多個主題,向量化後語意被「平均化」,檢索出不精準的內容,回答品質跟著崩壞。" },
    { q: "RAG 流程的正確順序是?",
      opts: ["生成 → 檢索 → 切塊", "文件切塊 → 向量化入庫 → 問題向量化 → 檢索 → 組合提示詞 → 生成", "直接把整份文件貼進 prompt", "先微調模型再檢索"],
      a: 1,
      why: "離線階段先把知識變成向量庫;線上階段每次提問才做「檢索 → 組合 → 生成」。" }
  ],
  demo: null,
  project: "挑一份 10 頁 PDF,實作完整 RAG:切塊 → embedding → 檢索 top-3 → 生成帶來源標註的回答。",
  resources: [
    { n: "LangChain RAG 官方教學", u: "https://python.langchain.com/docs/tutorials/rag/" },
    { n: "LlamaIndex 文件", u: "https://docs.llamaindex.ai/" }
  ],
  next: "檢索的靈魂藏在那一行「向量內積」裡。下一站拆解它:Embeddings 與向量資料庫。"
},

{
  id: 9,
  emoji: "🧩",
  title: "向量資料庫 + Embeddings",
  tagline: "讓「意思相近」變成可以計算",
  color: "#06b6d4",
  duration: "約 2 週",
  connection: "上一站的 retrieve() 裡藏著一行魔法:相似度 = 向量內積。這一站把魔法拆解 — 文字怎麼變成向量?為什麼「貓」和「狗」會靠近?一百萬筆向量怎麼在一毫秒內找到最近鄰?",
  contribution: "為 DocMind 裝上正式的向量資料庫(Chroma),支援上千份文件的語意搜尋與檢索。",
  goals: [
    "建立 embedding 的幾何直覺",
    "熟練 cosine similarity 與最近鄰搜尋",
    "理解向量資料庫與 ANN 索引原理",
    "認識主流工具:Chroma / pgvector / Pinecone"
  ],
  concepts: [
    { t: "嵌入向量", en: "Embedding", d: "把文字壓縮成數百維向量。語意相近的文本在向量空間中方向相近,連「國王−男人≈女王−女人」這種關係都被保留。" },
    { t: "餘弦相似度", en: "Cosine Similarity", d: "比較兩向量「方向」的相似程度,範圍 −1 到 1。越接近 1,語意越相近。" },
    { t: "向量資料庫", en: "Vector Database", d: "專門存向量、支援相似度搜尋的資料庫。百萬筆資料也能毫秒級找到最近鄰。" },
    { t: "ANN 索引", en: "HNSW / IVF", d: "近似最近鄰演算法:不逐一比對,用極小的準確率損失換來千倍的搜尋速度。" },
    { t: "工具選擇", en: "Tooling", d: "起步:Chroma(本地、零設定);已有 PostgreSQL:pgvector;全託管:Pinecone / Weaviate。" }
  ],
  code: [{
    lang: "python",
    name: "vector_store.py",
    desc: "用 Chroma 把第 8 站的 RAG 從玩具升級成正式的向量知識庫。",
    src: `import chromadb

client = chromadb.Client()
col = client.get_or_create_collection("docmind_docs")

# 存入文件(Chroma 會自動向量化)
col.add(
    documents=[
        "退貨需在 14 天內完成,需附發票",
        "產品保固期兩年,人為損壞除外",
        "門市營業時間為 9:00 至 18:00",
    ],
    ids=["c1", "c2", "c3"],
)

# 語意搜尋:問題沒有出現「退貨」兩個字也能命中
res = col.query(query_texts=["可以退款嗎?"], n_results=2)
print(res["documents"][0])
# -> ['退貨需在 14 天內完成,需附發票', '產品保固期兩年,人為損壞除外']`
  }],
  quiz: [
    { q: "embedding 的核心特性是?",
      opts: ["把檔案壓縮變小", "語意相近的文字 → 在向量空間中距離相近", "把資料加密保護", "自動翻譯成英文"],
      a: 1,
      why: "embedding 把「語意」變成幾何:意思越像,向量越近 — 搜尋於是變成了算距離。" },
    { q: "為什麼不用 Excel 存向量、逐一比對就好?",
      opts: ["Excel 不能存數字", "資料量大時逐一比對太慢,向量庫用 ANN 索引加速", "向量太長 Excel 存不下", "因為 Excel 要授權費"],
      a: 1,
      why: "一百萬筆 × 1536 維的逐一比對要數秒;HNSW 之類的 ANN 索引用近似換速度,毫秒內回傳。" },
    { q: "「國王 − 男人 + 女人 ≈ 女王」說明了 embedding 的什麼?",
      opts: ["模型會做算術題", "向量空間保留了語意關係的結構(如性別、語言)", "模型很會翻譯", "只是巧合"],
      a: 1,
      why: "embedding 不只記錄「意思」,還把語意之間的「關係」編碼成向量空間中的方向。" }
  ],
  demo: "embeddings",
  project: "把第 8 站的 RAG 從 numpy 換成 Chroma,支援新增/刪除文件,並用 20 個問題測試檢索品質。",
  resources: [
    { n: "Chroma 官方文件", u: "https://docs.trychroma.com/" },
    { n: "OpenAI Embeddings 指南", u: "https://platform.openai.com/docs/guides/embeddings" }
  ],
  next: "助理能查文件了。下一站讓它長出手腳,真正「能做事」:AI Agents。"
},

{
  id: 10,
  emoji: "🛠️",
  title: "AI Agents · 工具與 MCP",
  tagline: "讓 AI 會用工具、能做事",
  color: "#ec4899",
  duration: "約 2–3 週",
  connection: "到目前為止,DocMind 只能「說」。這一站它學會「做」:查資料庫統計、算數、呼叫外部 API。Agent = LLM + 工具 + 迴圈:模型自己決定何時呼叫哪個工具、觀察結果、再決定下一步 — 這是 2025–2026 最熱的戰場。",
  contribution: "為 DocMind 加上工具層:檢索知識庫、查資料庫統計、呼叫外部 API — 從問答助理進化成能幹活的 Agent。",
  goals: [
    "理解 function calling 的完整機制",
    "掌握 Agent 迴圈:Reason → Act → Observe",
    "認識 MCP 開放協定與生態",
    "學會替高風險動作加上人類把關"
  ],
  concepts: [
    { t: "函式呼叫", en: "Function Calling", d: "你描述工具(名稱、參數、用途),模型判斷何時該用並輸出結構化 JSON — 真正執行的是你的程式。" },
    { t: "Agent 迴圈", en: "ReAct", d: "Reason(思考)→ Act(呼叫工具)→ Observe(看結果)→ 重複,直到任務完成。" },
    { t: "MCP", en: "Model Context Protocol", d: "讓模型連接外部工具與資料源的開放標準協定:寫一次 MCP 伺服器,任何支援的模型都能用。" },
    { t: "多步規劃", en: "Planning", d: "好的 Agent 會把「幫我規劃東京行程」拆成查機票 → 查天氣 → 排行程,一步步呼叫工具完成。" },
    { t: "安全護欄", en: "Guardrails", d: "限制可用工具、設定金額上限、重要動作需人類確認(human-in-the-loop)— Agent 的煞車系統。" }
  ],
  code: [{
    lang: "python",
    name: "agent_loop.py",
    desc: "DocMind 的第一個 Agent 迴圈:模型點菜,你的程式上菜。",
    src: `import json
from openai import OpenAI

client = OpenAI()

tools = [{
    "type": "function",
    "function": {
        "name": "get_doc_stats",
        "description": "取得 DocMind 知識庫的統計資料",
        "parameters": {"type": "object", "properties": {}, "required": []},
    },
}]

def get_doc_stats():
    return {"documents": 42, "chunks": 1280, "chats": 96}

messages = [{"role": "user", "content": "知識庫現在有幾份文件?"}]

while True:
    resp = client.chat.completions.create(
        model="gpt-4o-mini", messages=messages, tools=tools)
    msg = resp.choices[0].message
    messages.append(msg)

    if not msg.tool_calls:              # 模型給出最終答案
        print(msg.content)
        break

    for tc in msg.tool_calls:           # 執行模型點名的工具
        result = get_doc_stats()        # 你的程式負責真正執行
        messages.append({
            "role": "tool", "tool_call_id": tc.id,
            "content": json.dumps(result, ensure_ascii=False),
        })`
  }],
  quiz: [
    { q: "function calling 時,實際執行工具的是誰?",
      opts: ["模型自己上網執行", "你的程式碼 — 模型只輸出「想呼叫什麼」的 JSON", "MCP 伺服器強制執行", "API 供應商的伺服器"],
      a: 1,
      why: "模型只負責「決定」:呼叫哪個工具、帶什麼參數。執行權與資料權始終在你的程式手裡 — 這是安全的關鍵設計。" },
    { q: "MCP(Model Context Protocol)是什麼?",
      opts: ["新的神經網路架構", "連接模型與外部工具/資料源的開放標準協定", "一家新的模型公司", "一種向量資料庫"],
      a: 1,
      why: "MCP 把「接工具」標準化:工具寫一次,所有支援的模型與客戶端都能用,像 AI 界的 USB-C。" },
    { q: "為什麼「轉帳」這類工具必須保留人類確認(human-in-the-loop)?",
      opts: ["模型打字太慢", "高風險動作需人把關,避免錯誤或被誘導執行", "API 有呼叫次數限制", "為了節省 token"],
      a: 1,
      why: "Agent 可能被惡意輸入誘導(prompt injection)或自行誤判。涉及金錢、刪除、寄信等動作,一定要人類按下最後那顆按鈕。" }
  ],
  demo: null,
  project: "給 DocMind 加三個工具:知識庫檢索、資料庫統計、日期時間,讓它能回答「知識庫裡關於退貨的資料多嗎?」這類需要查詢 + 推理的問題。",
  resources: [
    { n: "OpenAI Function Calling 指南", u: "https://platform.openai.com/docs/guides/function-calling" },
    { n: "MCP 官方網站", u: "https://modelcontextprotocol.io/" }
  ],
  next: "DocMind 功能齊全了 — 但它還活在你筆電的終端機裡。下一站:打包上雲,讓全世界都能用。"
},

{
  id: 11,
  emoji: "🚀",
  title: "AI 部署 · Docker + Cloud",
  tagline: "從你的筆電,到全世界",
  color: "#2496ed",
  duration: "約 2–3 週",
  connection: "上一站結束,DocMind 已經是功能完整的 Agent — 但它只活在你電腦的終端機裡。這一站學會容器化:把程式連同整個環境打包成 Docker 映像,在任何雲上一鍵啟動;別人打開瀏覽器就能用。",
  contribution: "把 DocMind 包成 Docker 映像、用 FastAPI 提供 REST API、部署上雲端並管好金鑰。",
  goals: [
    "理解 Docker 映像與容器的關係",
    "撰寫 Dockerfile 並建置映像",
    "用 FastAPI 把 RAG + Agent 包成 API",
    "學會金鑰管理與部署選項"
  ],
  concepts: [
    { t: "Docker", en: "Containerization", d: "把程式 + 依賴 + 環境打包成可移植的映像。「在我機器上會動」的問題從此消失。" },
    { t: "映像 vs 容器", en: "Image vs Container", d: "映像是唯讀藍圖(食譜),容器是執行中的實例(照食譜做好的那道菜)。" },
    { t: "FastAPI", en: "Web Framework", d: "Python 最流行的 API 框架:型別提示自動產生 API 文件,async 支援好,適合包 LLM 服務。" },
    { t: "環境變數", en: "Env Vars", d: "API 金鑰、資料庫密碼一律放環境變數或密鑰管理服務 — 絕不寫進程式碼或映像。" },
    { t: "部署選項", en: "Deployment Options", d: "小專案:Render / Railway / Cloud Run;主流雲:AWS / GCP / Azure;再往上是 K8s 的世界。" }
  ],
  code: [
    {
      lang: "dockerfile",
      name: "Dockerfile",
      desc: "DocMind 的容器藍圖:十行,在任何機器上都能長出一模一樣的環境。",
      src: `# DocMind 的容器藍圖
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# API 金鑰由部署環境注入,不寫進映像
ENV OPENAI_API_KEY=""

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
    },
    {
      lang: "python",
      name: "main.py",
      desc: "DocMind 的 API 門面:把 RAG + Agent 管線變成世界上任何程式都能呼叫的 HTTP 服務。",
      src: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="DocMind API")

class Ask(BaseModel):
    question: str
    chat_id: int | None = None

@app.post("/ask")
def ask(req: Ask):
    answer = docmind_answer(req.question)   # 你的 RAG + Agent 管線
    return {"answer": answer}`
    }
  ],
  quiz: [
    { q: "image 和 container 的關係是?",
      opts: ["兩者是同一件事", "image 是唯讀藍圖,container 是它的執行實例", "container 比 image 大很多", "image 只能在雲端執行"],
      a: 1,
      why: "一個 image 可以同時跑出多個 container,就像一份食譜可以做出好幾盤一樣的菜。" },
    { q: "API 金鑰上線時的正確做法是?",
      opts: ["寫在 Dockerfile 裡", "提交到 Git repo 方便管理", "用環境變數或密鑰管理服務注入", "印在 README 裡"],
      a: 2,
      why: "映像和 repo 都可能被別人拿到。金鑰只在執行環境注入(環境變數 / Secrets Manager),洩漏風險最低。" },
    { q: "為什麼 DocMind 要做成 API 服務?",
      opts: ["看起來比較專業", "讓網頁、App、其他程式都能透過 HTTP 使用核心功能", "可以省電", "LLM 模型要求的"],
      a: 1,
      why: "API 是前後端分離的橋樑:聊天介面、手機 App、排程任務都能共用同一套 DocMind 核心。" }
  ],
  demo: null,
  project: "把 DocMind 包成 Docker image 並在本機跑起來,用 curl 測試 /ask 端點;再試著免費部署到 Render 或 Cloud Run。",
  resources: [
    { n: "Docker 官方入門", u: "https://docs.docker.com/get-started/" },
    { n: "FastAPI 官方文件(中文)", u: "https://fastapi.tiangolo.com/zh/" }
  ],
  next: "最後一站:不是新技術,而是把 11 站積木組成真正有人用的產品。"
},

{
  id: 12,
  emoji: "💻",
  title: "打造 & 發布 AI 應用",
  tagline: "完整產品:打造、測試、發布、迭代",
  color: "#22c55e",
  duration: "持續進行",
  connection: "十一站的積木都齊了:Python、資料庫、ML、LLM、RAG、向量庫、Agent、Docker。最後一站不是新技術,而是把它們組成真正有人用的產品 — 聊天介面、評估測試、監控成本、收集回饋、快速迭代。走完這站,你不再只是「學過 AI」,而是能交付 AI 產品的工程師。",
  contribution: "DocMind 正式上線:完整 UI + 評估測試 + 監控 — 你的第一個 AI 產品作品集。",
  goals: [
    "串接前端聊天介面與後端 API",
    "建立評估集(evals)把關回答品質",
    "監控延遲、成本與使用者回饋",
    "把專案包裝成求職作品集"
  ],
  concepts: [
    { t: "全端整合", en: "Full-stack", d: "前端(React / Streamlit)打 API → 後端 RAG + Agent → 向量庫 + SQL。串起來,才是產品。" },
    { t: "評估", en: "Evals", d: "替 AI 應用建立測試題庫:固定 50 題 + 期望答案。每次改提示詞就重跑一次,品質回歸一眼看出。" },
    { t: "可觀測性", en: "Observability", d: "記錄每次呼叫:延遲、token 成本、檢索命中、使用者讚/倒讚。沒有數據,優化就是瞎猜。" },
    { t: "迭代閉環", en: "Iteration Loop", d: "上線 → 收回饋 → 修最痛的問題 → 跑 evals → 再上線。AI 產品是養出來的,不是發布就結束。" },
    { t: "作品集效應", en: "Portfolio", d: "一個有真實使用者的 DocMind,比十張證照更有說服力。寫技術文章記錄過程,曝光翻倍。" }
  ],
  code: [{
    lang: "python",
    name: "evals.py",
    desc: "DocMind 的品質回歸測試:改任何東西之前,先讓 evals 替你把關。",
    src: `# evals.py — DocMind 的品質回歸測試
EVAL_SET = [
    {"q": "退貨政策是什麼?", "must_include": ["14", "天"]},
    {"q": "保固期多久?",     "must_include": ["兩年"]},
    {"q": "你們的老闆是誰?", "must_include": ["文件中沒有提到"]},
]

def run_evals():
    passed = 0
    for case in EVAL_SET:
        answer = docmind_answer(case["q"])
        ok = all(k in answer for k in case["must_include"])
        passed += ok
        print(f"{'✅' if ok else '❌'} {case['q']} -> {answer[:40]}")
    print(f"\\n通過率: {passed}/{len(EVAL_SET)}")

if __name__ == "__main__":
    run_evals()`
  }],
  quiz: [
    { q: "AI 應用所說的「evals」是指?",
      opts: ["網頁的動畫效果", "固定測試題庫,每次改動都重跑以把關品質", "使用者的留言評論區", "工程師的績效考核"],
      a: 1,
      why: "AI 行為不像傳統程式那樣可預測。固定的評估集讓「改提示詞」從憑感覺,變成看數據。" },
    { q: "上線之後,最該持續追蹤的指標是?",
      opts: ["程式碼總行數", "延遲、token 成本、錯誤率與回答品質(讚/倒讚)", "GitHub 星星數", "團隊人數"],
      a: 1,
      why: "延遲與成本決定體驗和生存,品質訊號(讚/倒讚、重問率)告訴你該修哪裡。" },
    { q: "使用者反應「常常答非所問」,最合理的下一步是?",
      opts: ["直接換最貴的模型", "先看壞案例的檢索結果與提示詞,定位問題再對症下藥", "整個重寫", "暫時停止服務"],
      a: 1,
      why: "答非所問可能是檢索沒命中、chunk 切太爛、或提示詞不清。先看失敗案例的證據,再決定修哪一層。" }
  ],
  demo: null,
  project: "畢業專案:完成 DocMind 1.0 — 加上聊天介面、跑通 50 題 evals、部署上線,並寫一篇「我如何打造 DocMind」的技術文章。完成後,你已解鎖 AI Engineer。🏆",
  resources: [
    { n: "Streamlit(最快做出 AI 介面)", u: "https://streamlit.io/" },
    { n: "LangSmith(LMM 評估與監控)", u: "https://smith.langchain.com/" }
  ],
  next: null
}

];
