/* AI Engineer Roadmap 2026 — 站點資料(第 9–15 站)
   主線:把「北辰零售集團」的文件助理導入案做完、上線、交到他們手上。 */
window.STAGES_B = [

{
  id: 9,
  emoji: "🧩",
  title: "向量資料庫 + Embeddings",
  tagline: "讓「意思相近」變成可以計算",
  color: "#06b6d4",
  duration: "約 1–2 週",
  connection: "上一站 retrieve() 裡那行向量內積,在幾十個 chunk 時很優雅。北辰給你的是 300 份政策文件、12,000 個 chunk:numpy 矩陣開始吃記憶體,每次重啟都要重算一遍,而且客服主管馬上會提出下一個要求 —「台北店的人不能看到總公司的內部規定」。",
  contribution: "DocMind 的知識庫從一個 list 換成正式的向量資料庫:支援依門市/文件類型的中繼資料過濾,新增或刪除文件不用重建整庫。",
  goals: [
    "建立 embedding 的幾何直覺",
    "熟練 cosine similarity 與最近鄰搜尋",
    "理解 ANN 索引如何在百萬筆裡保持毫秒響應",
    "學會用 metadata filter 滿足企業的權限要求"
  ],
  concepts: [
    { t: "嵌入向量", en: "Embedding", d: "把文字壓成上千維向量。語意相近的文本方向相近 —「退貨」跟「可以退款嗎」在空間裡靠得很近,即使沒有一個字相同。" },
    { t: "餘弦相似度", en: "Cosine Similarity", d: "比兩個向量「方向」的相似程度,範圍 −1 到 1。越接近 1 越相關;Chroma 回傳的是距離,所以常用 1 − distance 換成分數。" },
    { t: "近似最近鄰", en: "HNSW / IVF", d: "不逐一比對上百萬個向量,用圖索引或聚類換速度,準確率損失通常不到 1% — 這才是向量資料庫存在的理由。" },
    { t: "中繼資料過濾", en: "Metadata Filtering", d: "向量搜尋只懂「像不像」,不懂「誰有權看」。把門市、部門、生效日期存成 metadata,先過濾再比對,企業權限才落地得了。" },
    { t: "工具選擇", en: "Tooling", d: "起步:Chroma(本機、零設定)。客戶已有 PostgreSQL:pgvector,一條 SQL 就能跟業務資料 JOIN。全託管:Pinecone / Weaviate。" }
  ],
  code: [{
    lang: "python",
    name: "vector_store.py",
    desc: "把第 8 站的 numpy 知識庫換成 Chroma。兩個重點:PersistentClient(資料會留下來)和 where 過濾(客戶權限的關鍵)。",
    src: `import chromadb

client = chromadb.PersistentClient(path="./chroma_db")   # 資料落在本機資料夾
col = client.get_or_create_collection(
    "beichen_policies", metadata={"hnsw:space": "cosine"})

col.add(
    documents=[
        "退貨需在 14 天內完成,需附發票",
        "產品保固期兩年,人為損壞除外",
        "台北店門市營業時間為 9:00 至 18:00",
        "總公司內部採購流程需三級簽核",
    ],
    metadatas=[
        {"doc": "退貨政策 v3", "page": 3, "store": "全部門市"},
        {"doc": "保固條款",   "page": 1, "store": "全部門市"},
        {"doc": "門市公告",   "page": 1, "store": "台北店"},
        {"doc": "採購辦法",   "page": 7, "store": "總公司"},
    ],
    ids=["c1", "c2", "c3", "c4"],
)

# 台北店的客服提問:總公司的內部文件不會進入候選
res = col.query(
    query_texts=["可以退款嗎?"],
    n_results=2,
    where={"store": {"$in": ["全部門市", "台北店"]}},
)
for text, meta, dist in zip(res["documents"][0],
                            res["metadatas"][0],
                            res["distances"][0]):
    print(f"{1 - dist:.3f}  {meta['doc']} p.{meta['page']}  {text[:20]}")`
  }],
  quiz: [
    { q: "embedding 的核心特性是?",
      opts: ["把檔案壓縮變小", "語意相近的文字,在向量空間裡距離也相近", "把資料加密保護", "自動翻譯成英文"],
      a: 1,
      why: "embedding 把「語意」變成幾何:意思越像,向量越近 — 搜尋於是變成了算距離。" },
    { q: "為什麼不能就拿 numpy 逐一比對而已?",
      opts: ["向量庫比較專業", "資料量大時逐一比對太慢,向量庫用 ANN 索引加速", "numpy 存不下向量", "因為要錢"],
      a: 1,
      why: "12,000 個 chunk 還撐得住,百萬筆 ×1536 維就要數秒。HNSW 之類的 ANN 索引用近似換速度,毫秒內回傳。" },
    { q: "北辰要求「分店客服查不到總公司內部文件」,最合適的實作是?",
      opts: ["把文件分成 12 個向量庫,每個門市一份", "向量搜尋完成後,再用程式把不該看的結果濾掉", "把門市與權限存成 metadata,搜尋時先 where 過濾再比對", "請模型「不要回答」總公司的內容"],
      a: 2,
      why: "先過濾再比對,又快又對。分成 12 份庫難以維護;事後篩選會白白佔掉候選名額;叫模型「別說」是請求,不是權限控制。" }
  ],
  demo: "embeddings",
  project: "把第 8 站的 RAG 換成 Chroma:支援新增/刪除文件、依門市做 metadata 過濾,並用北辰的 20 個真實問題量出檢索命中率(正確那段有沒有進 top-3)。",
  resources: [
    { n: "Chroma 官方文件", u: "https://docs.trychroma.com/" },
    { n: "pgvector(用 PostgreSQL 存向量)", u: "https://github.com/pgvector/pgvector" }
  ],
  next: "知識庫能查了。但北辰客服主管真正想要的是「幫我把這張退貨單查好」— 下一站讓 DocMind 長出手腳:AI Agents。"
},

{
  id: 10,
  emoji: "🛠️",
  title: "AI Agents · 工具與 MCP",
  tagline: "從會回答,到能辦事",
  color: "#ec4899",
  duration: "約 2 週",
  connection: "導入第一週你才發現,北辰的問題有 4 成不在文件裡 —「這單退到哪了?」「那間店的庫存還夠嗎?」答案在訂單系統與庫存資料庫裡。Agent 的結構其實很樸素:LLM + 工具 + 一個設了上限的迴圈;模型只決定「要做什麼」,執行權始終在你的程式手裡。",
  contribution: "DocMind 接上客戶系統:檢索知識庫、查訂單與庫存、必要時把問題轉給真人客服 — 從問答助理進化成能幹活的現場助理。",
  goals: [
    "理解 function calling 的完整機制",
    "掌握 Agent 迴圈:思考 → 呼叫 → 觀察 → 再決定",
    "認識 MCP 協定如何省下重複整合的成本",
    "為高風險動作設計人類確認與迴圈上限"
  ],
  concepts: [
    { t: "函式呼叫", en: "Function Calling", d: "你用 JSON 描述工具(名稱、參數、用途),模型判斷何時該用並輸出結構化的呼叫意圖 — 真正動手的還是你的程式。" },
    { t: "Agent 迴圈", en: "ReAct", d: "Reason(思考)→ Act(呼叫工具)→ Observe(看結果)→ 重複到任務完成。關鍵設計:一定要設最大回合數。" },
    { t: "MCP", en: "Model Context Protocol", d: "把「模型怎麼連工具與資料源」標準化的開放協定。為北辰寫一次 MCP 伺服器,日後換模型、換客戶端都不用重寫 — AI 界的 USB-C。" },
    { t: "人類把關", en: "Human-in-the-loop", d: "查資料可以讓 Agent 自己做;退款、發信、刪資料要停在「請真人確認」那一步。設計工具清單時就標好風險等級。" },
    { t: "工具失敗處理", en: "Error Handling", d: "客戶的 API 會 timeout、會回 500。工具要把可讀的錯誤回傳給模型,讓它換條路或老實說查不到,而不是編一個進度出來。" }
  ],
  code: [{
    lang: "python",
    name: "agent_loop.py",
    desc: "DocMind 的第一個 Agent 迴圈:模型點菜,你的程式上菜,而且永遠帶著上限。",
    src: `import json
from openai import OpenAI

client = OpenAI()

TOOLS = [{
    "type": "function",
    "function": {
        "name": "get_order_status",
        "description": "依訂單編號查詢退貨進度,資料來自北辰訂單資料庫",
        "parameters": {
            "type": "object",
            "properties": {"order_no": {"type": "string"}},
            "required": ["order_no"],
        },
    },
}]

def get_order_status(order_no: str) -> dict:
    # 這裡接的是第 3 站的 orders 表,或第 4 站整合進來的內部 API
    row = db_lookup(order_no)
    return row or {"error": "查無此訂單,請確認編號"}

messages = [{"role": "user", "content": "BC2026-0912 這單退到哪了?"}]

for _ in range(6):                    # 上限:別讓模型無限自我迴圈
    resp = client.chat.completions.create(
        model="gpt-6-luna", messages=messages, tools=TOOLS)
    msg = resp.choices[0].message

    if not msg.tool_calls:            # 模型給出最終答案
        print(msg.content)
        break

    messages.append(msg)
    for tc in msg.tool_calls:         # 執行工具的是你,不是模型
        args = json.loads(tc.function.arguments)
        result = get_order_status(**args)
        messages.append({
            "role": "tool", "tool_call_id": tc.id,
            "content": json.dumps(result, ensure_ascii=False),
        })`
  }],
  quiz: [
    { q: "function calling 時,實際執行工具的是誰?",
      opts: ["模型自己上網執行", "你的程式碼 — 模型只輸出「想呼叫什麼」的 JSON", "MCP 伺服器強制執行", "API 供應商的伺服器"],
      a: 1,
      why: "模型只負責決定。執行權與資料權始終在你的程式手裡 — 這是你敢在客戶環境放 Agent 的前提。" },
    { q: "MCP(Model Context Protocol)解決的是什麼問題?",
      opts: ["新的神經網路架構", "把「模型怎麼連工具與資料源」標準化,寫一次四處可用", "一家新的模型公司", "一種向量資料庫"],
      a: 1,
      why: "FDE 每換一個客戶就得重新整合一次。MCP 讓工具實作與模型/客戶端解耦,重複整合的成本大幅下來。" },
    { q: "Agent 迴圈為什麼一定要設最大回合數?",
      opts: ["只是為了省錢", "模型可能反覆呼叫同一個失敗的工具出不來,上限是你的煞車", "API 硬性規定", "為了讓回答更長"],
      a: 1,
      why: "查不到時模型最常見的行為是「再試一次」。沒有上限,它能耗光額度並把延遲拉到幾十秒;有了上限,你才能在超時時轉真人客服。" }
  ],
  demo: null,
  project: "給 DocMind 加三個工具:知識庫檢索、訂單查詢、日期時間,並讓第四個動作「建立退款申請」必須真人確認。用複合問題測試:「退貨政策是什麼?那我手上這張單能退嗎?」",
  resources: [
    { n: "OpenAI Function Calling 指南", u: "https://platform.openai.com/docs/guides/function-calling" },
    { n: "MCP 官方網站", u: "https://modelcontextprotocol.io/" }
  ],
  next: "到這裡,你已經「什麼都做得出來」了。但現場最貴的錯誤不是寫不出來 — 是做出客戶不要的東西。下一站回到起點:需求訪談。"
},

{
  id: 11,
  emoji: "🎯",
  title: "需求訪談與問題定義",
  tagline: "最貴的錯誤,是做出沒人想用的東西",
  color: "#dc2626",
  duration: "約 1 週",
  connection: "北辰這個案子是從一句「我們想要一個 AI 客服」開始的。如果你當場就開始寫 code,三個月後很可能交出一個技術正確、但客服不願用的東西。FDE 和「會調 API 的人」的分水嶺就在這裡:把客戶的一句話,翻譯成一道可以衡量的真問題。",
  contribution: "交付《需求訪談紀錄》:三種角色的訪談、10 個真實故事、一句問題陳述、明確不做的清單、一個成功指標 — 之後幾站的每個取捨都以這份文件為準。",
  goals: [
    "會問「上次你怎麼處理」而不是「你希望它怎樣」",
    "畫出利害關係人地圖,找對訪談對象",
    "把需求寫成可衡量的問題陳述",
    "用第一刀範圍把專案控制在能上線的規模"
  ],
  concepts: [
    { t: "問題陳述", en: "Problem Statement", d: "格式:誰 + 什麼情境 + 遇到什麼 + 代價是什麼。「客服在退貨高峰期要翻 3 份文件才能確認政策,平均每題花 4 分鐘」— 這才叫問題。" },
    { t: "問行為不問意見", en: "Mom Test", d: "人們對未來的想像不可靠(人人都會說「這個功能很好啊」),但過去的實際行為不會撒謊。追問:「上週有沒有遇過一次?當時你怎麼做?」" },
    { t: "利害關係人地圖", en: "Stakeholder Map", d: "買單的主管、每天用的第一線、管資安的窗口、幫你開權限的 IT。只訪談主管,你會做出一個主管喜歡、客服不用的系統。" },
    { t: "範圍第一刀", en: "MoSCoW / MVP", d: "客戶一口氣列 12 項需求是常態。Must-have 只留能驗證核心價值的 2–3 項,其餘寫進「這版明確不做」,並請客戶確認簽名。" },
    { t: "成功指標", en: "Success Metric", d: "上線前就講好:3 個月後用哪個數字判定成不成功(單題處理時間、主管介入比例、客服主動使用率)。沒有指標的專案只會一直改版。" }
  ],
  code: [{
    lang: "markdown",
    name: "discovery-notes.md",
    desc: "第 11 站的交付物不是筆記,是一份能讓客戶簽名的文件。",
    src: `# 北辰零售集團 · 客服文件助理 需求訪談紀錄

日期:2026-11-03  訪談:3 場 / 共 4.5 小時
對象:客服主管(1)、第一線客服(2)、IT 窗口(1)

## 我們看到的真實行為(不是意見)
- 退貨高峰期(週一)每班 12 人,平均每題要查 3 份文件
- 客服把常用政策截圖存在桌面 — 版本早就過期了
- 新進客服前兩週幾乎無法獨立回答保固問題
- 發生過 2 次依過期政策誤許退貨,造成客訴

## 問題陳述
第一線客服在退貨與保固諮詢時,無法在 30 秒內取得「現行有效」的政策,
因此自行建立過期副本,每月造成約 20 小時的重工與客訴風險。

## 這版做(Must-have,3 項)
1. 政策文件的語意問答,答案必須附文件名稱與頁碼
2. 查不到時老實說「文件中沒有提到」,並建議轉人工
3. 依門市過濾:分店客服看不到總公司的內部文件

## 這版不做(已與客戶確認)
- 自動退款、自動回覆客戶 Email(高風險,需流程改造)
- 語音客服、多國語言
- 與 CRM 即時雙向同步(只做每日唯讀同步)

## 成功指標(3 個月後檢核)
| 指標 | 現況 | 目標 |
| --- | --- | --- |
| 單題平均處理時間 | 4 分鐘 | 下降 30% |
| 需主管介入比例 | 18% | 低於 10% |
| 客服主動使用率 | — | 超過 70% 的班次有使用 |

## 尚未解決的風險
資安審查還沒開始(第 12 站)、入口網站 API 的限速未知(第 4 站)`
  }],
  quiz: [
    { q: "客戶主管說「我們想要一個 AI 客服」,你下一個問題最好是?",
      opts: ["那你們要什麼顏色的介面?", "上週有沒有哪一次讓你特別需要它?當時你怎麼處理的?", "預算有多少?", "打算用哪個模型?"],
      a: 1,
      why: "把抽象願望拉回具體事件。對方描述「上次怎麼做」的時候,真正的痛點、現有流程與手上有哪些資料會一起露出來。" },
    { q: "為什麼要問過去行為,而不是問「你希望系統怎麼做」?",
      opts: ["問過去比較省時間", "人們對未來的意見常是客套話,過去的實際行為才是可靠證據", "因為需求文件只記錄過去", "兩種問法沒有差別"],
      a: 1,
      why: "每個人都會說「這個功能很好啊」,但那是禮貌不是採用。真實行為(自己截圖存桌面、建過期副本)才會告訴你系統該解決什麼。" },
    { q: "客戶一口氣列了 12 項需求,第一版該怎麼定?",
      opts: ["12 項都做才顯得專業", "只做工程師自己有興趣的 2 項", "選 2–3 項能驗證核心價值且能量化的 Must-have,其餘寫進「這版不做」並請客戶確認", "全部推到下一版"],
      a: 2,
      why: "範圍的價值在於取捨。寫下「不做什麼」並讓客戶點頭,你才能在三個月後真的交出上線的東西,而不是永遠在做第 12 項。" }
  ],
  demo: null,
  project: "在身邊找一個真實的「文件很長、人要查」場景(學校課務說明、公司 ERP 操作手冊、公會章程都算),訪談 3 個人(主管、第一線、IT),寫出 discovery-notes.md:10 個真實觀察、一句問題陳述、3 項 Must-have、5 項明確不做、一個可衡量的成功指標。",
  resources: [
    { n: "The Mom Test(Rob Fitzpatrick)", u: "https://momtestbook.com/" },
    { n: "Atlassian · Product Discovery", u: "https://www.atlassian.com/agile/product-management" }
  ],
  next: "問題定義清楚了,技術方向也定了。但下一個會讓你上不了線的東西,是客戶的資安審查。"
},

{
  id: 12,
  emoji: "🔐",
  title: "資安、合規與成本",
  tagline: "沒過資安審查,技術再好也上不了線",
  color: "#475569",
  duration: "約 1–2 週",
  connection: "北辰的資安窗口在會議室只問三個問題:資料去了哪裡?金鑰怎麼存?誰看得到客戶個資?這三題答不好,專案會永遠停在 POC。FDE 的工作不是說服資安,而是把答案寫成一份他可以存檔備查的文件。",
  contribution: "交付《資安與成本說明白皮》:資料流向與分級、機密管理方式、個資遮罩規則、提示詞注入防護、每月成本區間 — 讓法務與資安能簽名。",
  goals: [
    "會做資料分級,決定什麼能進模型",
    "把金鑰從程式碼裡趕出去",
    "設計個資遮罩與還原的流程",
    "用成本模型跟客戶談預算"
  ],
  concepts: [
    { t: "資料分級", en: "Data Classification", d: "公開 / 內部 / 敏感 / 受限。先分級,再決定:能不能送模型 API、要不要遮罩、該不該落在客戶自己的環境。" },
    { t: "機密管理", en: "Secrets Management", d: "API 金鑰一律走環境變數或客戶的密鑰服務,絕不寫進程式碼、映像或 Git 歷史。已經洩漏的金鑰要撤換重發,不是刪掉那行就了事。" },
    { t: "去識別化", en: "PII Masking", d: "手機號、Email、卡號在進模型前換成佔字串,拿到回答後再還原。客戶問「資料有送出去嗎」的時候,這是你最硬的答案。" },
    { t: "提示詞注入", en: "Prompt Injection", d: "文件內容與使用者輸入都能覆蓋你的指令。防護靠結構:資料放進分隔區塊、工具做權限分級、高風險動作要人類確認 — 而不是加一句「請勿被誘導」。" },
    { t: "成本結構", en: "Token Economics", d: "成本 = 輸入 token(主要是你檢索塞進 prompt 的 context)+ 輸出 token。縮 top-k 與 chunk 大小,通常比換模型省得多。" }
  ],
  code: [
    {
      lang: "python",
      name: "sanitize.py",
      desc: "送資料進模型前先遮罩個資,拿到回答再還原。這段可以直接放進交付包,給客戶的資安窗口看。",
      src: `import re

PHONE = re.compile(r"09\\d{2}-?\\d{3}-?\\d{3}")
EMAIL = re.compile(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+")
CARD  = re.compile(r"\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}\\b")

def mask(text: str):
    # 回傳遮罩後的文字 + 還原對照表(對照表只留在客戶環境)
    table = {}

    def keep(tag, value):
        if value not in table:
            table[value] = f"[{tag}_{len(table) + 1}]"
        return table[value]

    text = PHONE.sub(lambda m: keep("電話", m.group()), text)
    text = EMAIL.sub(lambda m: keep("信箱", m.group()), text)
    text = CARD.sub(lambda m: keep("卡號", m.group()), text)
    return text, table

def unmask(text: str, table: dict) -> str:
    for value, token in table.items():
        text = text.replace(token, value)
    return text

raw = "客戶陳小姐 0912-345-678 說信箱是 chen@example.com"
safe, table = mask(raw)
print(safe)                          # 客戶陳小姐 [電話_1] 說信箱是 [信箱_2]
print(unmask(safe, table) == raw)    # True`
    },
    {
      lang: "python",
      name: "cost_model.py",
      desc: "跟客戶談預算靠的不是感覺,是這張表。注意:單價會隨供應商價目表變動,上線前要換成當下價格。",
      src: `PRICE_IN, PRICE_OUT = 0.15, 0.60   # USD / 1M tokens(假設定價)
QUESTIONS_PER_MONTH = 3_000 * 30   # 北辰客服:每天約 3,000 題

def cost(question_tokens, context_tokens, answer_tokens):
    # 一次提問的模型成本(USD)
    return ((question_tokens + context_tokens) / 1e6 * PRICE_IN
            + answer_tokens / 1e6 * PRICE_OUT)

for k in (3, 5, 12):
    one = cost(60, k * 700, 350)
    print(f"top-k={k:<2} 單次 US\${one:.5f} → 每月 US\${one * QUESTIONS_PER_MONTH:,.0f}")

# top-k=3  單次 US$0.00053 → 每月 US$48
# top-k=5  單次 US$0.00074 → 每月 US$67
# top-k=12 單次 US$0.00148 → 每月 US$133`
    }
  ],
  quiz: [
    { q: "客戶要求「資料不能出境」,你第一個該確認的是?",
      opts: ["介面要不要改成中文", "模型供應商的資料去向:有沒有區域端點、是否保留輸入資料,或乾脆改用客戶環境內部署的模型", "要不要換前端框架", "向量庫放在哪個資料夾"],
      a: 1,
      why: "「出境」是資料流向問題:endpoint 在哪、資料有沒有被保留或拿去做訓練、能不能在客戶 VPC 內跑模型。這決定的是架構,不是裝飾。" },
    { q: "客服對話裡有手機號與 Email,送進模型前最合適的做法是?",
      opts: ["直接送,模型不會外洩", "先遮罩成佔字串,拿到回答後在客戶環境還原", "在提示詞裡叫模型「不要引用個資」", "把整段對話存進日誌方便之後追查"],
      a: 1,
      why: "提示詞裡的「不要引用」只是請求,遮罩才是控制。同時別忘了日誌也是外洩面 — 明文存對話等於又漏一次。" },
    { q: "上線後成本超出預期兩倍,通常最有效的第一刀是?",
      opts: ["換最貴的模型", "縮小檢索塞進 prompt 的 context(top-k 與 chunk 大小)", "把介面改成深色模式", "請客戶少問一點"],
      a: 1,
      why: "輸入 token 的量主要來自你塞進去的文章片段。從 top-12 收到 top-3 往往就省下兩三倍,而且品質未必變差 — 第 14 站的 evals 會告訴你答案。" }
  ],
  demo: null,
  project: "為你的案子出一份單頁《資安與成本說明》:資料分級表(哪些能進模型)、金鑰存放方式、PII 遮罩規則、提示詞注入的三層防護、單次與每月成本試算。拿它去請一位真的做資安或 IT 的人挑毛病,把被退回的地方補齊。",
  resources: [
    { n: "OWASP GenAI 安全風險清單", u: "https://genai.owasp.org/" },
    { n: "OpenAI · 你的資料如何使用", u: "https://platform.openai.com/docs/guides/your-data" }
  ],
  next: "資安簽名了,預算也過了。剩下的就是把 DocMind 裝進對方的環境裡。"
},

{
  id: 13,
  emoji: "🚀",
  title: "部署進客戶的環境",
  tagline: "從你的筆電,進到客戶的 VPC",
  color: "#2496ed",
  duration: "約 2 週",
  connection: "你在本機跑得很順的 DocMind,北辰的 IT 不會允許它跑在個人電腦上。他們給你的是 VPC 裡一台虛擬機、一張對外白名單,以及「金鑰不給、資料不出境」兩個前提。容器化讓你在那之前就能在自己筆電上重現那個環境,把意外留在本機。",
  contribution: "DocMind 包成 Docker image + FastAPI 服務,附一份《部署需求單》:對方要開哪些域名與出站權限、secrets 從哪裡注入、資料放在哪個持久卷。",
  goals: [
    "理解 image 與 container 的關係",
    "寫出可重現的 Dockerfile 與 .dockerignore",
    "用 FastAPI 把 RAG + Agent 管線包成 HTTP 服務",
    "搞定客戶環境的網路、金鑰與落地形態"
  ],
  concepts: [
    { t: "容器化", en: "Docker", d: "把程式 + 依賴 + 環境打包成可移植的 image。「在我機器上會動」的問題就此消失,因為客戶那台跑的跟你完全一樣。" },
    { t: "映像 vs 容器", en: "Image vs Container", d: "image 是唯讀藍圖(食譜),container 是執行中的實例(照食譜做的那道菜)。一份 image 可以同時跑好幾個 container。" },
    { t: "忽略清單", en: ".dockerignore", d: "最後那句 COPY . . 會把整個資料夾塞進映像。少了 .dockerignore,你的 .env、.git 和客戶的 PDF 就跟著上線了。" },
    { t: "API 門面", en: "FastAPI", d: "前端聊天介面、客戶的內部入口網站、排程工作,都透過同一個 HTTP API 使用 DocMind — 前後端分離的那座橋。" },
    { t: "落地形態", en: "Deployment Shapes", d: "SaaS 託管(最快)、客戶 VPC 內(最常見)、on-prem 機房(合規最嚴)。形態決定你用雲端模型 API 還是本地模型。" }
  ],
  code: [
    {
      lang: "dockerfile",
      name: "Dockerfile",
      desc: "十行,在任何機器上都長出一模一樣的 DocMind 環境。注意:金鑰不在這裡。",
      src: `# DocMind 的容器藍圖
FROM python:3.12-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
# 金鑰不寫進映像:由執行環境或客戶的密鑰服務注入
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`
    },
    {
      lang: "text",
      name: ".dockerignore",
      desc: "沒有這六行,你的金鑰和客戶文件會跟著映像一起上線。",
      src: `.env
.git
__pycache__/
*.pdf
chroma_db/
.venv/`
    },
    {
      lang: "python",
      name: "main.py",
      desc: "把第 8–10 站的管線變成世界上任何程式都能呼叫的 HTTP 服務。",
      src: `import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="DocMind API")

class Ask(BaseModel):
    question: str
    store: str = "全部門市"          # 第 9 站那個 metadata 過濾條件

@app.get("/health")                 # 部署後 IT 第一個會敲的端點
def health():
    return {"ok": True}

@app.post("/ask")
def ask(req: Ask):
    if not os.environ.get("OPENAI_API_KEY"):
        raise HTTPException(500, "金鑰未注入,檢查部署設定")
    return {"answer": docmind_answer(req.question, store=req.store)}

# 本機驗證:
#   docker build -t docmind .
#   docker run -p 8000:8000 --env-file .env docmind
#   curl -X POST localhost:8000/ask -H 'Content-Type: application/json' \\
#        -d '{"question":"退貨期限多久?"}'`
    }
  ],
  quiz: [
    { q: "image 和 container 的關係是?",
      opts: ["兩者是小不同的同一件事", "image 是唯讀藍圖,container 是它的執行實例", "container 只能在雲端跑", "image 比 container 大很多"],
      a: 1,
      why: "一份 image 可以同時跑出多個 container — 北辰要 6 個實例分擔流量,或你在本機開三個測試,用的都是同一份 image。" },
    { q: "API 金鑰上線時的正確做法是?",
      opts: ["寫進 Dockerfile 比較方便", "提交到 Git repo 方便管理", "執行時由環境變數或客戶的密鑰服務注入", "在 README 裡說明怎麼填"],
      a: 2,
      why: "image 和 repo 都會經手別人,金鑰一旦進過 Git 歷史就很難清乾淨。只在執行環境注入,外洩面最小;已經進過歷史的要撤換重發。" },
    { q: "客戶說「要 on-prem,資料不能出境」。你首先要確認的技術前提?",
      opts: ["前端需不需要重寫", "機房能不能出站連到外部模型 API;不能的話,就得改用客戶環境內可跑的模型", "要不要換程式語言", "向量庫選哪一套"],
      a: 1,
      why: "網路出站決定整個架構:連不到外部模型,就要在客戶機房跑本地模型(或請他們開白名單),第 12 站的成本模型也得整個重算。" }
  ],
  demo: null,
  project: "把 DocMind 包成 image 在本機跑起來,curl 測 /health 與 /ask,並進容器 ls 確認映像裡沒有 .env 與客戶 PDF。再寫一份《部署需求單》:需要的域名、出站 443、secrets 來源、持久卷位置,請一位 IT 人員幫你挑毛病。",
  resources: [
    { n: "Docker 官方入門", u: "https://docs.docker.com/get-started/" },
    { n: "FastAPI 官方文件(中文)", u: "https://fastapi.tiangolo.com/zh/" }
  ],
  next: "上線了。但「跑得起來」和「答得好」是兩件事 — 下一站教你怎麼用數字證明它答得好。"
},

{
  id: 14,
  emoji: "📈",
  title: "評估、監控與迭代",
  tagline: "把「感覺變好了」換成數字",
  color: "#22c55e",
  duration: "約 2 週",
  connection: "上線第二週,客服主管跟你說:「它最近常講錯。」你怎麼回?沒量過資的你只能憑感覺改改提示詞;有 evals 的你會先跑一遍測試集,定位是哪一層壞了,改完再跑一次,把前後對比直接貼給主管看。",
  contribution: "DocMind 有了 50 題黃金測試集、檢索與生成分開的指標、壞例子歸因流程和一塊監控面板 — 每次改動都有數字可以給客戶看。",
  goals: [
    "建立客戶一起認可的黃金測試集(golden set)",
    "把檢索品質與生成品質分開量",
    "認識 LLM-as-a-Judge 的用法與盲點",
    "設計壞例子歸因流程與上線監控"
  ],
  concepts: [
    { t: "黃金測試集", en: "Golden Set", d: "跟客戶一起定的 50 題:30 題有標準答案、10 題文件裡根本沒有(考它會不會編)、10 題邊界情況。改東西之前跑一次,品質回歸一眼看出。" },
    { t: "分層評估", en: "Retrieval vs Generation", d: "先量「正確那段有沒有被撈到」(檢索命中率),再量「撈到之後答得好不好」(忠實度、引用頁碼正確性)。混在一起量,你永遠不知道該修哪一層。" },
    { t: "LLM 當評審", en: "LLM-as-a-Judge", d: "請另一個模型依規準打分,能批量、能每天跑。盲點:偏愛長答案、跟被評的模型同源會客套。用它當篩子,別當最終判決,並抽樣人工校對。" },
    { t: "壞例子歸因", en: "Bad-case Triage", d: "答錯時先分類:檢索沒命中 / chunk 切太差 / 提示詞不清楚 / 文件本身就沒寫。四種對應四種修法,而「換模型」通常是最後一個選項。" },
    { t: "上線監控", en: "Observability", d: "每筆問答都記:延遲、token 成本、檢索命中哪份文件、讚/倒讚與重問率。沒有這些數據,下一版該做什麼只是猜。" }
  ],
  code: [{
    lang: "python",
    name: "evals.py",
    desc: "每次改提示詞或 top-k 之前,先讓這份測試集替你把關,並自動把壞例子留下來。",
    src: `import json

GOLDEN = [
    {"q": "退貨期限多久?", "must_include": ["14"],       "layer": "有答案"},
    {"q": "保固期多久?",   "must_include": ["兩年"],     "layer": "有答案"},
    {"q": "門市幾點開?",   "must_include": ["9:00"],     "layer": "有答案"},
    {"q": "你們老闆是誰?", "must_include": ["沒有提到"], "layer": "不該編"},
]

def run_evals():
    bad, passed = [], 0
    for case in GOLDEN:
        answer, hits = docmind_answer(case["q"])   # 第 8–10 站的管線
        ok = all(k in answer for k in case["must_include"])
        passed += ok
        print(f"{'PASS' if ok else 'FAIL'} [{case['layer']}] {case['q']}")
        if not ok:
            bad.append({"q": case["q"], "answer": answer[:120],
                        "retrieved": hits, "expected": case["must_include"]})
    print(f"通過 {passed}/{len(GOLDEN)}")
    with open("bad_cases.json", "w", encoding="utf-8") as f:
        json.dump(bad, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    run_evals()`
  }],
  quiz: [
    { q: "AI 應用所說的「evals」是指?",
      opts: ["網頁的動畫效果", "跟客戶一起認定的固定測試題庫,每次改動都重跑", "使用者的留言評論區", "工程師的績效考核"],
      a: 1,
      why: "AI 行為不像傳統程式那樣可預測。固定的評估集讓「改提示詞」從憑感覺變成看數字,也讓你跟客戶談成效時有共同依據。" },
    { q: "檢索命中率很高,但回答常常錯 — 你該修哪裡?",
      opts: ["先換更大的模型", "生成層:引用規則、context 的順序與長度", "資料庫層", "前端介面"],
      a: 1,
      why: "正確段落已經在 context 裡,表示檢索沒問題,是模型拿到資料卻沒照著答。這時改提示詞、縮 context 比換模型便宜又有效。" },
    { q: "上線之後最該持續追蹤的指標是?",
      opts: ["程式碼總行數", "延遲、token 成本、命中的文件、讚/倒讚與重問率", "GitHub 星星數", "開會次數"],
      a: 1,
      why: "延遲與成本決定體驗和生存,品質訊號(倒讚、同一題重問)告訴你下一刀該修哪一層 — 而且這些正是續約會議上的證據。" }
  ],
  demo: null,
  project: "跟北辰(或你專案裡的真實使用者)一起建 50 題黃金測試集:30 題有標準答案、10 題文件裡沒有、10 題邊界情況。跑第一輪記錄通過率,然後故意把 top-k 從 3 改成 1 再跑一次 — 看哪些題掉下來,那就是你該跟客戶討論的取捨。",
  resources: [
    { n: "OpenAI Evals 指南", u: "https://platform.openai.com/docs/guides/evals" },
    { n: "LangSmith(LLM 評估與監控)", u: "https://smith.langchain.com/" }
  ],
  next: "品質能量化了。最後一站決定這個案子是三個月後靜悄悄關掉,還是變成續約與下一個案子。"
},

{
  id: 15,
  emoji: "🤝",
  title: "交付、教育訓練與 ROI",
  tagline: "你不在的時候,它還在跑",
  color: "#a16207",
  duration: "約 1–2 週",
  connection: "導入案的最後一哩不是程式碼:客服願意用、IT 能自己處理問題、主管能向老闆講出省了多少。看過太多技術不錯的專案死在這裡 — 因為沒人接手,上線三個月就靜悄悄關掉了。",
  contribution: "DocMind 完整交付:runbook、教育訓練、支援分軌、ROI 單頁。北辰從「試用」變成續約,而你手上有了第一件能拿去面試的 FDE 案例。",
  goals: [
    "寫出客戶真的會用的 runbook",
    "用客戶自己的資料做教育訓練,培養超級用戶",
    "設計 L1/L2/L3 支援分軌與升級流程",
    "用量化的價值談續約,把案子變作品集"
  ],
  concepts: [
    { t: "維運手冊", en: "Runbook", d: "不是產品說明書,是「出問題時照著做」的清單:日誌在哪、常見現象對應什麼、如何重啟與回滾、什麼時候升級。標準很單純:你不在也能處理。" },
    { t: "超級用戶", en: "Super-user", d: "在第一線找 1–2 個願意學的人,教得比別人深。之後大部分問題由他擋掉,你的支援成本就是從這裡開始下降的。" },
    { t: "支援分軌", en: "Escalation / SLA", d: "L1 由客服主管照 runbook 處理、L2 給 IT、L3 才找你。把「多久回應」白紙黑字寫進合約,否則你會變成客戶的編外員工。" },
    { t: "採用率", en: "Adoption", d: "上線 ≠ 有人用。看每天主動使用的人數與班次占比。採用率低通常是流程或信任問題,不是模型問題 — 那要回頭修第 11 站定義的那個問題。" },
    { t: "回本周期", en: "Payback", d: "主管要的不是技術名詞,是「幾個月回本、第一年淨效益多少」。把模型成本、人力攤提與維護一起算,數字才站得住。" }
  ],
  code: [
    {
      lang: "markdown",
      name: "runbook.md",
      desc: "交給北辰 IT 的那份文件。寫得好,你才有空去接下一個案子。",
      src: `# DocMind 維運手冊(交付給北辰 IT)

## 平常看什麼
- 狀態:GET /health
- 日誌:docker logs docmind(保留 14 天)
- 監控面板:每筆問答的延遲、token 成本、讚/倒讚

## 常見現象對應
| 現象 | 可能原因 | 先做這個 |
| --- | --- | --- |
| 都回「查不到資料」 | 向量庫沒更新 | 跑 sync_portal_docs.py 每日同步 |
| 全部超時 | 模型 API 出站被封 | 確認白名單有開放 443 |
| 回答沒有來源頁碼 | 提示詞被改過 | git log 比對,還原上一版 system prompt |
| 成本突然翻倍 | top-k 被調高 | 看 context token 曲線,回覆原設定 |

## 重啟與回滾
docker compose restart        # 約 30 秒內恢復
docker compose up -d --pull   # 更新版本
回滾:改用上一版 image(永遠保留在 registry)

## 什麼時候要升級到 L3(找我)
- 個資遮罩失效,或有外洩疑慮
- 連續 1 小時錯誤率超過 5%
聯絡:it-support@example.com · 回應:4 個工作天內`
    },
    {
      lang: "python",
      name: "roi.py",
      desc: "續約會議上你會打開這個檔案。重點是把建置與維護一起算進去 — 只報模型省多少錢,數字好看得假。",
      src: `AGENTS = 12                # 客服人數(第 11 站訪談問到的真實數字)
SAVED_MIN = 45             # 教育訓練後每人每天省下的分鐘(上線 1 個月實測)
HOURLY = 450               # 客服人力時薪(TWD)
API_USD = 48               # 每月模型成本(第 12 站 cost_model.py 算出來的)
FX = 32
BUILD = 600_000            # 一次性建置:4 週導入,含教育訓練
RUN = 25_000               # 每月維護、監控與 L3 支援

saved = AGENTS * SAVED_MIN / 60 * 21 * HOURLY   # 每月省下的時間價值
op = API_USD * FX + RUN                          # 每月營運成本

print(f"每月省下:NT\${saved:,.0f}")
print(f"每月營運成本:NT\${op:,.0f}")
print(f"回本周期:{BUILD / (saved - op):.1f} 個月")
print(f"第一年淨效益:NT\${(saved - op) * 12 - BUILD:,.0f}")

# 每月省下:NT$85,050
# 每月營運成本:NT$26,536
# 回本周期:10.3 個月
# 第一年淨效益:NT$102,168`
    }
  ],
  quiz: [
    { q: "runbook 最主要的目的是?",
      opts: ["給主管看的專案介紹", "讓客戶的 IT 在你不在場時,也能自己處理常見問題", "當成測試報告交差", "記錄模型用了哪些參數"],
      a: 1,
      why: "判斷標準很單純:客服半夜遇到問題,照著文件能不能自己處理到一半。做不到,表示交付還沒完成。" },
    { q: "教育訓練怎麼設計最有效?",
      opts: ["講兩小時模型原理", "用客戶自己班次上的真實難題當練習,並在第一線培養 1–2 個超級用戶", "發一份 PDF 請大家自讀", "請所有主管一起參加"],
      a: 1,
      why: "人只記得住明天會用到的東西。用他們班次的真實問題演練,再把願意學的那位教深 — 之後多數問題由他擋掉,你的支援量才降得下來。" },
    { q: "三個月後跟主管談續約,你該拿出的數字是?",
      opts: ["程式更新了幾個版本", "採用率,加上處理時間下降換算的人力價值 vs 總成本(含維護)", "用了多大的模型", "技術文章的閱讀數"],
      a: 1,
      why: "續約的依據只有兩件事:有沒有人在用、值不值。採用率證明前者,回本周期證明後者 — 兩者都來自上線前就約好的成功指標。" }
  ],
  demo: null,
  project: "畢業交付:把 15 站的成果裝成一個「北辰導入案」交付包 — discovery-notes.md、架構圖、程式與 Docker image、50 題 evals 報告、runbook.md、30 分鐘教育訓練流程、ROI 單頁。再寫一篇《我如何把文件助理導入北辰》的技術文章,連同 code 放上 GitHub。走完這站,你就能以 FDE 的身分去談下一個案子。🏆",
  resources: [
    { n: "Google SRE Book(事件應變與文檔)", u: "https://sre.google/sre-book/table-of-contents/" },
    { n: "Google 工程實踐(Review 與交付標準)", u: "https://google.github.io/eng-practices/" }
  ],
  next: null
}

];
