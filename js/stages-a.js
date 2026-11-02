/* AI Engineer Roadmap 2026 — 站點資料(第 1–8 站)
   主線:Forward Deployed Engineer 的現場工作 — 把「北辰零售集團」的文件助理導入案做完。 */
window.STAGES_A = [

{
  id: 1,
  emoji: "🐍",
  title: "Python 程式設計",
  tagline: "現場工作的通用語言",
  color: "#3776ab",
  duration: "約 2–3 週",
  connection: "旅程從這裡開始 — 但目標不是「成為工程師」,而是能被派到客戶現場,把一個模糊的問題變成能運作的系統。FDE 每天寫的程式多半不是大架構,而是「把客戶丟過來的檔案讀進來、清乾淨、丟給模型、把結果寫回去」的腳本。Python 是這件事的通用語言。",
  contribution: "北辰的 IT 丟給你一個 1.2 GB 的資料夾:300 份退貨、保固、門市流程文件。這一站你寫出第一支腳本 — 讀文件、清文字、統計字詞,知識庫管線從這裡開始。",
  goals: [
    "熟悉變數、資料型別、流程控制與函式",
    "會用 list / dict / tuple / set 處理資料",
    "學會 pip、虛擬環境(venv)與套件管理",
    "能讀寫檔案、處理 JSON 文字資料"
  ],
  concepts: [
    { t: "變數與資料型別", en: "Variables & Types", d: "int、float、str、bool 是四種基本型別。Python 動態型別,不用事先宣告,寫起來像自然語言。" },
    { t: "容器", en: "Containers", d: "list 有序可變、dict 是鍵值對、tuple 不可變、set 自動去重 — 處理客戶資料每天都在用它們。" },
    { t: "函式", en: "Functions", d: "用 def 把可重複使用的邏輯封裝起來。好函式只做一件事,並有清楚的名字 — 三週後接手的人會感謝你。" },
    { t: "虛擬環境", en: "Virtual Environments", d: "每個專案獨立的套件空間,避免 A 專案要新版、B 專案要舊版的衝突。在客戶的機器上裝東西,這是基本禮貌。" },
    { t: "套件生態系", en: "Ecosystem", d: "pip 一行指令就能裝上 NumPy、pandas、PyTorch、requests。Python 統治 AI 的真正原因就是這個生態系。" }
  ],
  code: [{
    lang: "python",
    name: "analyze.py",
    desc: "對北辰的第一次交付:讀取一份文件,統計字數與熱門詞彙 — 先搞清楚這 300 份文件長什麼樣子。",
    src: `from pathlib import Path
from collections import Counter

def load_document(path: str) -> str:
    """讀取文件內容 — 知識庫管線的第一步"""
    return Path(path).read_text(encoding="utf-8")

def top_words(text: str, n: int = 5):
    words = text.lower().split()
    return Counter(words).most_common(n)

doc = load_document("notes.txt")
print("文件字數:", len(doc.split()))
print("熱門詞彙:", top_words(doc))`
  }],
  quiz: [
    { q: "Python 在 AI 領域稱霸的最主要原因是什麼?",
      opts: ["執行速度是所有語言中最快的", "完整的 AI 套件生態系 + 易讀的語法", "它是編譯型語言,效能好", "只能在伺服器上執行"],
      a: 1,
      why: "NumPy、pandas、PyTorch、Transformers…幾乎所有 AI 工具都優先支援 Python,加上語法接近自然語言,它成了 AI 的通用語言。" },
    { q: "tuple 和 list 最大的差別是?",
      opts: ["tuple 不可變(immutable)", "list 不能存放字串", "tuple 只能放數字", "完全沒有差別"],
      a: 0,
      why: "tuple 建立後不能修改,適合固定的資料;list 可動態增刪改,是日常處理資料的主力。" },
    { q: "為什麼每個專案都要用虛擬環境(venv)?",
      opts: ["讓程式執行變快", "隔離各專案的套件與版本,避免衝突", "可以把程式碼加密", "用來取代 Git 做版本控制"],
      a: 1,
      why: "專案 A 可能需要 transformers 4.40、專案 B 要 4.30。venv 讓每個專案有自己的套件空間,彼此不干擾 — 尤其在客戶的機器上重裝環境時。" }
  ],
  demo: null,
  project: "寫一個 analyze.py:讀取任意 .txt 文件,輸出總字數與最常見的 10 個詞。再用它跑完北辰給的全部文件,把結果存成一份「這些文件裡最常出現的 20 個詞」清單 — 那是你理解客戶業務的第一份情報。",
  resources: [
    { n: "Python 官方中文教學", u: "https://docs.python.org/zh-tw/3/tutorial/" },
    { n: "Real Python(優質英文教學)", u: "https://realpython.com/" }
  ],
  next: "下一站,你會用 Git 把這些程式碼放進「時光機」— 在客戶現場改壞了,也回得去。"
},

{
  id: 2,
  emoji: "🔧",
  title: "Git + GitHub",
  tagline: "給交付留下一條可追溯的軌跡",
  color: "#f05033",
  duration: "約 1 週",
  connection: "上一站你寫出了第一批文件分析腳本。但導入案會改、會回滾、會被第二個人接手:客戶上線前問「你上週到底動了什麼」,你怎麼答?Git 把每一步變成可回溯的快照,GitHub 讓你的交付有紀錄可查 — 這在客戶現場不是美德,是要求。",
  contribution: "為北辰導入案建立 repo、README 與 .gitignore,用分支開發功能;README 就是客戶第一次看到這個系統的說明書。",
  goals: [
    "掌握 add → commit → push 基本流程",
    "用分支(branch)平行開發功能",
    "理解 Pull Request 與程式碼審查",
    "用 .gitignore 保護機密與大檔案"
  ],
  concepts: [
    { t: "版本控制", en: "Version Control", d: "記錄每次變更的快照,隨時可回溯、可比較、可協作 — 給專案一台時光機。" },
    { t: "Commit", en: "Commit", d: "一次有意義的變更快照。好習慣:小步提交、訊息寫清楚做了什麼、為什麼。客戶追問時,歷史就是你的答案。" },
    { t: "分支", en: "Branch", d: "從主線分出一條平行時空實驗新功能,穩定後再合併回 main,主線永遠保持可用 — 現場演示前尤其重要。" },
    { t: "Pull Request", en: "PR", d: "提出變更請求讓他人審查(code review)。導入案後期客戶的維運工程師會從 PR 讀起,那是你們共同的語言。" },
    { t: ".gitignore", en: "Git Ignore", d: "告訴 Git 忽略哪些檔案:.env(API 金鑰!)、客戶文件、模型權重、__pycache__。推錯客戶資料是 FDE 最嚴重的一次事故。" }
  ],
  code: [{
    lang: "bash",
    name: "terminal",
    desc: "把北辰導入案放進版本控制,並用分支開發新功能。",
    src: `# 初始化 DocMind 專案
git init
printf ".env\\n__pycache__/\\n*.pdf\\n" > .gitignore   # 保護金鑰與客戶檔案
git add analyze.py .gitignore
git commit -m "feat: 加入文件字數統計功能"

# 用分支開發新功能
git switch -c feature/pdf-loader
# ...撰寫讀取 PDF 的程式...
git add . && git commit -m "feat: 支援讀取 PDF"
git switch main
git merge feature/pdf-loader
git push origin main`
  }],
  quiz: [
    { q: "git commit 和 git push 的差別?",
      opts: ["完全一樣", "commit 存在本地,push 才推上遠端(GitHub)", "push 會刪除歷史紀錄", "commit 一次只能處理一個檔案"],
      a: 1,
      why: "commit 是本機的快照(可以隨時做),push 才把這些快照同步到 GitHub 等遠端儲存庫。" },
    { q: "為什麼 .env 一定要放進 .gitignore?",
      opts: ["檔案太大拖慢速度", "裡面有 API 金鑰等機密,推上 GitHub 會外洩", "Git 不支援文字檔", "為了讓 commit 更快"],
      a: 1,
      why: ".env 存放 API 金鑰與密碼。一旦推進公開 repo,爬蟲幾分鐘內就會抓走;推進客戶專案的私有 repo,你還是得假設所有人都看得到。" },
    { q: "開發一個新功能時,最專業的做法是?",
      opts: ["直接在 main 上邊改邊試", "開一條新分支,完成測試後再合併回 main", "先刪掉舊程式再重寫", "盡量不要用 Git 以免出錯"],
      a: 1,
      why: "feature branch 讓實驗不污染主線,出問題隨時整條丟棄;合併前還能開 PR 讓隊友或客戶審查。" }
  ],
  demo: null,
  project: "把上一站的 analyze.py 推上 GitHub,寫一份像樣的 README:這個系統替客戶解決什麼、怎麼裝、怎麼跑、目前已知不做什麼。最後一項最關鍵 — 它會幫你擋掉一半的臨時需求。",
  resources: [
    { n: "Pro Git 官方中文書", u: "https://git-scm.com/book/zh-tw/v2" },
    { n: "GitHub Skills(互動練習)", u: "https://skills.github.com/" }
  ],
  next: "程式碼進了時光機。下一站,找到客戶的資料真正藏在哪裡:SQL 與資料庫。"
},

{
  id: 3,
  emoji: "🗄️",
  title: "SQL + 資料庫",
  tagline: "客戶的資料九成已經在某張表裡",
  color: "#336791",
  duration: "約 2 週",
  connection: "程式碼有了紀錄,資料呢?北辰的政策在文件裡,訂單在 ERP 裡,對話紀錄在客服系統的資料庫裡。FDE 到現場的第一份工作不是寫模型,而是搞懂對方的表結構:主鍵、外鍵、誰關到誰 — 然後替 DocMind 需要留下的東西,蓋一個整齊的家。",
  contribution: "為北辰設計 documents、chats、messages 三張核心表,並用 SQL 查出「哪位客服在問什麼、同一個問題被問了幾次」— 這張報表後來決定了知識庫要先補哪些文件。",
  goals: [
    "理解關聯式資料庫與資料表設計",
    "熟練 CRUD 四大基本操作(SQL 增刪查改)",
    "用 JOIN 結合多張資料表查詢",
    "知道 SQL 與 NoSQL 各適合什麼場景"
  ],
  concepts: [
    { t: "關聯式資料庫", en: "RDBMS", d: "用「表」組織資料,表與表之間用鍵關聯。PostgreSQL、MySQL、SQLite 都屬於這一類 — 客戶的維運看得懂它,這很重要。" },
    { t: "主鍵與外鍵", en: "PK / FK", d: "主鍵唯一識別一列資料;外鍵指向另一張表的主鍵,把資料關聯起來 — 例如訊息屬於哪場對話。" },
    { t: "CRUD", en: "Create Read Update Delete", d: "INSERT、SELECT、UPDATE、DELETE — 對資料的四種基本操作,SQL 的核心。" },
    { t: "JOIN", en: "Join", d: "依外鍵把兩張表「接」起來查詢。客戶問「哪些問題最常查不到答案」時,你就需要一次 JOIN。" },
    { t: "SQL vs NoSQL", en: "Database Choice", d: "結構固定、需要複雜查詢 → SQL;彈性 schema、超大規模 → NoSQL。導入案常兩種都用:對話進 SQL,向量進向量庫。" }
  ],
  code: [{
    lang: "sql",
    name: "schema.sql",
    desc: "DocMind 的核心資料表(以 SQLite 為例):文件、對話、訊息 — 之後第 13 站的 API 會直接使用它。",
    src: `-- DocMind 的核心資料表(SQLite,零安裝即可練習)
CREATE TABLE documents (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    content     TEXT,
    uploaded_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chats (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name  TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id  INTEGER REFERENCES chats(id),
    role     TEXT CHECK (role IN ('user', 'assistant')),
    content  TEXT NOT NULL
);

-- 查詢:哪位客服問最多、最常問的是誰
SELECT c.user_name, COUNT(m.id) AS msg_count
FROM chats c
JOIN messages m ON m.chat_id = c.id
GROUP BY c.user_name
ORDER BY msg_count DESC;

-- 換成 PostgreSQL 時:INTEGER PRIMARY KEY AUTOINCREMENT → SERIAL,
-- 時間欄位 TEXT → TIMESTAMPTZ`
  }],
  quiz: [
    { q: "主鍵(Primary Key)的作用是?",
      opts: ["加密資料防止洩漏", "唯一識別每一列資料", "自動排序所有資料", "定期備份資料"],
      a: 1,
      why: "主鍵保證每列資料有唯一身分證,其他表才能用外鍵指向它,建立可靠的關聯。" },
    { q: "JOIN 用來做什麼?",
      opts: ["把兩個資料庫合併成一個", "依關聯欄位把多張表的資料接起來查詢", "刪除重複的資料", "建立更快的索引"],
      a: 1,
      why: "例如 JOIN messages 與 chats,就能在一次查詢中同時拿到「訊息內容」與「是誰的對話」。" },
    { q: "之後 DocMind 的「文件向量」最適合存放在哪裡?",
      opts: ["Excel 活頁簿", "一般資料表的 TEXT 欄位", "第 9 站會學的向量資料庫", "根本不用存"],
      a: 2,
      why: "高維向量需要專門的相似度搜尋。路線圖刻意把向量資料庫排在第 9 站 — 學完 RAG(第 8 站)你會立刻明白它為何存在。" }
  ],
  demo: null,
  project: "用 SQLite 建立上述三張表、插入假資料(至少 3 位客服、10 則訊息),寫出兩個查詢:①某位客服的完整對話紀錄 ②被問最多次的前 5 個問題。第二個查詢的結果,就是你該先補進知識庫的內容。",
  resources: [
    { n: "SQLBolt 互動練習(英文)", u: "https://sqlbolt.com/" },
    { n: "PostgreSQL 官方教學", u: "https://www.postgresqltutorial.com/" }
  ],
  next: "資料有家了。但客戶真正的重要資料不會等你去建表 — 下一站是 FDE 花最多時間的地方:把資料從對方的系統裡搬出來。"
},

{
  id: 4,
  emoji: "🔌",
  title: "REST API 與系統整合",
  tagline: "客戶的系統不會自己開門,你得學會敲門",
  color: "#f97316",
  duration: "約 1–2 週",
  connection: "上一站你摸清了北辰的表結構。但政策文件在入口網站、訂單在 ERP、會員在 CRM — 這些系統不會把資料庫直接給你,只會開一個 API。導入案 80% 的工程時間其實花在「把 A 系統的資料穩定搬到 B,而且不會半夜掛掉」,這一站就是 FDE 的日常。",
  contribution: "打通第一條整合:用 OAuth 向北辰入口網站取文件清單與內容,寫進 documents 表,之後每天只同步有變動的部分。",
  goals: [
    "讀懂 API 文件:端點、參數、狀態碼、錯誤格式",
    "用 requests 呼叫 REST API,處理 JSON 與分頁",
    "會做認證:API key、Bearer token、OAuth2 client credentials",
    "設計重試、限速與錯誤處理,讓同步任務穩定可重跑",
    "判斷何時用輪詢、何時要求對方提供 webhook"
  ],
  concepts: [
    { t: "HTTP 動詞與狀態碼", en: "Verbs & Status", d: "GET 讀、POST 寫、PUT/PATCH 改、DELETE 刪。2xx 成功、4xx 是你請求的問題、5xx 是對方掛了 — 看代碼就知道該修哪裡。" },
    { t: "REST 與 JSON", en: "REST / JSON", d: "用 URL 表示資源、用 JSON 表示資料。客戶的系統十之八九長這樣,讀文件時先找「範例回應」再看參數表。" },
    { t: "認證與 Token", en: "Auth & Tokens", d: "API key 最簡單;OAuth2 client credentials 換一張會過期的 token,到期前要更新。金鑰一律放環境變數,不進程式碼。" },
    { t: "分頁與增量同步", en: "Pagination", d: "客戶不會一次回你 300 份文件。跟著 next_page 一頁頁搬,並用 updated_at 只抓變動 — 否則每天全量重搬,對方會先關門。" },
    { t: "限速、重試與 Webhook", en: "Rate limit / Webhook", d: "429 表示「你太快了」,要退避重試而非猛打。要即時,就請對方在你上傳時推 webhook,而不是你每分鐘去問一次。" }
  ],
  code: [{
    lang: "python",
    name: "sync_portal_docs.py",
    desc: "把北辰入口網站的文件搬回自己的資料庫 — 含換 token、分頁、429 退避,這三段就是整合工作的全部日常。",
    src: `import os
import time
import requests

BASE = "https://portal.example.com/api/v1"   # 北辰入口網站(範例網域)

def get_token() -> str:
    """OAuth2 client credentials:換一張會過期的入場券"""
    r = requests.post(
        f"{BASE}/oauth/token",
        data={
            "grant_type": "client_credentials",
            "client_id": os.environ["PORTAL_CLIENT_ID"],
            "client_secret": os.environ["PORTAL_CLIENT_SECRET"],
        },
        timeout=10,
    )
    r.raise_for_status()
    return r.json()["access_token"]

def iter_documents(token: str):
    """沿著分頁一頁一頁搬;遇到 429 就退避重試"""
    url = f"{BASE}/documents?per_page=100"
    while url:
        for attempt in range(4):
            r = requests.get(url,
                             headers={"Authorization": f"Bearer {token}"},
                             timeout=10)
            if r.status_code == 429:          # 對方請你慢下來
                time.sleep(int(r.headers.get("Retry-After", 2 ** attempt)))
                continue
            r.raise_for_status()
            break
        page = r.json()
        yield from page["items"]
        url = page.get("next_page")           # 沒有 next_page 就結束

docs = list(iter_documents(get_token()))
print("取得文件數:", len(docs))
print("第一份:", docs[0]["title"])`
  }],
  quiz: [
    { q: "呼叫客戶 API 收到 HTTP 429,正確的做法是?",
      opts: ["立刻重送同樣的請求,直到成功", "依 Retry-After 或指數退避後再重試", "把 GET 改成 POST", "請客戶關掉限速"],
      a: 1,
      why: "429 是對方在說「你太快了」。猛打只會讓限速更嚴,甚至被封 IP;正確做法是照 Retry-After 或指數退避等待後重試。" },
    { q: "客戶給你的 client_secret 應該放在哪裡?",
      opts: ["寫在程式碼裡方便複製", "環境變數或密鑰管理服務", "commit 進 repo 的 .env", "貼在 README 的安裝步驟"],
      a: 1,
      why: "金鑰只該在執行環境注入。repo 不論公私都等於給所有能看到原始碼的人 — 第 2 站的 .gitignore 與第 12 站的金鑰管理講的都是這件事。" },
    { q: "北辰要求「文件上傳後 1 分鐘內就能被 DocMind 搜尋到」,最合適的設計是?",
      opts: ["每 24 小時輪詢一次全部文件", "請入口網站提供 webhook,有更新就推事件給 DocMind", "把整個入口網站 HTML 爬下來", "請客服手動上傳給 DocMind"],
      a: 1,
      why: "1 分鐘的即時性靠事件驅動(webhook)最省也最快;輪詢要壓到 1 分鐘會把對方 API 打爆,也浪費 token 與頻寬。" }
  ],
  demo: null,
  project: "挑一個不需要金鑰的公開 API(GitHub REST 很合適):寫一支腳本分頁取回某個 repo 的所有 releases,存進第 3 站的 SQLite 表;第二次執行只新增沒看過的項目,並印出「新增幾筆、跳過幾筆」。能重跑、不重複,就是合格的同步。",
  resources: [
    { n: "MDN:HTTP 回應狀態碼", u: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status" },
    { n: "OAuth 2.0 官方介紹", u: "https://oauth.net/2/" },
    { n: "Requests 官方文件", u: "https://requests.readthedocs.io/en/latest/" },
    { n: "GitHub REST:分頁指南", u: "https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api" }
  ],
  next: "搬資料的工具齊了。下一站回到原理層 — 客戶會問「這會不會越用越準」,你得答得出來。"
},

{
  id: 5,
  emoji: "📊",
  title: "機器學習與深度學習速讀",
  tagline: "你不用發明模型,但要知道它怎麼學會的",
  color: "#8e44ad",
  duration: "約 3 週",
  connection: "北辰的 IT 主管會丟給你一句話:「我們只有 200 筆標註,要不要自己訓練一個?」答不上來,後面的方案就輪不到你講。這一站把機器學習與深度學習壓成一站 — 監督式學習的節奏、什麼叫過擬合、loss 怎麼一路降、Transformer 為什麼是 LLM 的骨架。FDE 的任務不是發明模型,而是判斷這個問題需不需要學。",
  contribution: "為北辰做第一個意圖分類器:判斷客服的問題屬於「退貨 / 保固 / 門市」,決定該查知識庫、查訂單系統,還是直接轉真人。",
  goals: [
    "理解監督式學習的完整流程與 train/test 切分",
    "認識過擬合,看得懂 precision / recall / F1",
    "知道神經網路的訓練節奏:前向 → loss → 反向 → 更新",
    "理解張量、autograd 與 Transformer 在 LLM 裡的位置",
    "能判斷:這個問題要訓練模型、要 RAG,還是規則就夠"
  ],
  concepts: [
    { t: "監督式學習", en: "Supervised Learning", d: "給模型「題目 + 標準答案」(標籤資料)學習映射關係。分類(預測類別)與回歸(預測數值)都屬於這一類。" },
    { t: "特徵", en: "Features", d: "餵給模型的輸入資訊。文字要先轉成數字(TF-IDF 或 embedding),模型才讀得懂 — 中文還要想辦法切對。" },
    { t: "訓練/測試切分", en: "Train / Test Split", d: "用沒看過的資料「考試」,才知道模型是真學會了,還是只把答案背下來。客戶問準不準,你只能拿這一欄的數字回答。" },
    { t: "過擬合", en: "Overfitting", d: "訓練分數極高、測試卻很差的「背題型學生」。解方:更多資料、正則化、簡化模型。" },
    { t: "評估指標", en: "Metrics", d: "Accuracy、Precision、Recall、F1。類別不平衡時 accuracy 會騙人 — 99% 都是正常件時,全猜「正常」也有 99%。" },
    { t: "訓練迴圈", en: "Training Loop", d: "張量(tensor)放資料,autograd 自動算梯度:預測 → 算 loss → 反向傳播 → 更新參數,重複幾千次。所有深度學習都是這個節奏。" },
    { t: "Transformer", en: "Attention Is All You Need", d: "2017 年的架構革命:注意力機制讓模型看懂長文本的關聯。GPT 的 T 就是它 — 你之後呼叫的每一顆 LLM 都長這樣。" }
  ],
  code: [
    {
      lang: "python",
      name: "intent_classifier.py",
      desc: "第一項交付:北辰客服問題的意圖分類。中文要改用字元 n-gram,才抓得到「退貨 / 退款」這類共享字。",
      src: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# 每類 6 句示意資料(實務上每類要數十到數百筆)
texts = [
    "幫我摘要這份文件", "總結一下重點", "這段話在說什麼",
    "濃縮成三句話", "幫我抓出摘要", "重點整理一下",
    "把這段翻成英文", "翻譯成日文", "幫我翻成中文",
    "英文翻成中文", "這段幫我翻譯", "翻成法文",
    "今天天氣如何", "你好呀", "午餐吃什麼好",
    "講個笑話吧", "週末去哪玩", "你叫什麼名字",
]
labels = ["summarize"] * 6 + ["translate"] * 6 + ["chitchat"] * 6

X_train, X_test, y_train, y_test = train_test_split(
    texts, labels, test_size=0.25, random_state=2026, stratify=labels)

model = make_pipeline(
    # 中文沒有空格,預設的詞級切分會把整句當成一個 token;
    # 改用字元 n-gram 才能讓「總結」與「總結一下」共用特徵。
    TfidfVectorizer(analyzer="char", ngram_range=(1, 2)),
    LogisticRegression(max_iter=1000),
)
model.fit(X_train, y_train)

print(classification_report(y_test, model.predict(X_test)))
print(model.predict(["幫我總結一下"]))   # -> ['summarize']`
    },
    {
      lang: "python",
      name: "train_loop.py",
      desc: "親手寫一次訓練迴圈 — 這五行節奏,就是所有 LLM 訓練與微調的縮影。",
      src: `import torch
import torch.nn as nn

# 小型分類網路:輸入 10 維特徵 -> 3 類意圖
model = nn.Sequential(
    nn.Linear(10, 32), nn.ReLU(),
    nn.Linear(32, 3)
)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

X = torch.randn(100, 10)          # 100 筆樣本
y = torch.randint(0, 3, (100,))   # 標籤 0 / 1 / 2

for epoch in range(200):
    pred = model(X)               # 1. 前向傳播:算出預測
    loss = loss_fn(pred, y)       # 2. 計算損失:錯多少?
    optimizer.zero_grad()         # 3. 清掉上一輪的梯度
    loss.backward()               # 4. 反向傳播:算梯度
    optimizer.step()              # 5. 更新參數

    if epoch % 50 == 0:
        print(f"epoch {epoch}  loss = {loss.item():.4f}")`
    }
  ],
  quiz: [
    { q: "監督式和非監督式學習最大的差別?",
      opts: ["資料量多寡不同", "有沒有「標準答案」(標籤)", "使用的程式語言不同", "需要的硬體等級不同"],
      a: 1,
      why: "監督式學習的資料帶有標籤(答案);非監督式(如分群)只給資料,讓模型自己找出結構。" },
    { q: "訓練集準確率 99%,測試集卻只有 60%,這是?",
      opts: ["欠擬合(underfitting)", "過擬合 — 把訓練資料背下來了", "資料集太大造成的", "完全正常的現象"],
      a: 1,
      why: "模型把訓練題「背下來」而不是學會規律。解方:更多資料、正則化、簡化模型、資料增強。" },
    { q: "北辰說:「我們只有 200 筆標註,想自己訓練一個模型。」最合適的回應是?",
      opts: ["立刻開始訓練一個數十億參數的模型", "先用檢索 + 提示詞把系統做出來,把那 200 筆留著當驗收題,再評估是否需要微調", "請客戶先買 GPU", "200 筆一定不夠,這案做不成"],
      a: 1,
      why: "FDE 的判斷順序是:先確認問題能不能用檢索與提示詞解決。多數企業問答案不需要自己訓練模型;把標註資料當考卷,比當教材更值錢。" }
  ],
  demo: null,
  project: "把意圖分類器擴成北辰的四類(退貨 / 保固 / 門市 / 其他),每類至少 20 句,印出 classification_report,然後寫一句話給客戶:「現在最不可靠的是哪一類、需要你們補什麼資料」。這一句話,就是 FDE 的價值。",
  resources: [
    { n: "scikit-learn 官方入門教學", u: "https://scikit-learn.org/stable/getting_started.html" },
    { n: "PyTorch 官方教學(60 min blitz)", u: "https://pytorch.org/tutorials/" },
    { n: "3Blue1Brown 神經網路系列", u: "https://www.3blue1brown.com/topics/neural-networks" }
  ],
  next: "分類器背後那座冰山就是 LLM。下一站把它拆開看:token、context window、temperature。"
},

{
  id: 6,
  emoji: "🤖",
  title: "LLM 基礎",
  tagline: "你要交付的東西,到底怎麼運作?",
  color: "#10a37f",
  duration: "約 2 週",
  connection: "上一站你懂了訓練的節奏。LLM 就是「超大型 + 讀過整個網際網路的文字預測神經網路」。這一站拆開黑盒子:token、context window、temperature — 從此你呼叫 API 時,知道自己正在操作什麼,也算得出北辰每月要花多少錢。",
  contribution: "讓 DocMind 第一次對北辰的客服開口說話,並把每顆參數的代價講清楚:溫度影響一致性、context 影響費用、token 影響報價。",
  goals: [
    "理解 token 與詞元化(tokenization)",
    "掌握 context window 的限制與影響",
    "熟練 temperature / top_p 等生成參數",
    "認識主流 API 模型與開源模型(Llama、Qwen)"
  ],
  concepts: [
    { t: "詞元", en: "Token", d: "模型讀文字的最小單位,可能是詞、子詞或標點。計費與 context 上限都以 token 計算 — 中文通常一個字就是一個以上 token。" },
    { t: "下一詞預測", en: "Next-token Prediction", d: "LLM 的本質:根據前文預測最可能的下一個 token,不斷重複,生成整段文字。" },
    { t: "上下文視窗", en: "Context Window", d: "模型一次能「看到」的 token 上限。超出就會截斷 — 這正是第 8 站 RAG 存在的關鍵原因。" },
    { t: "溫度", en: "Temperature", d: "控制隨機度:低溫 = 穩定可預測(適合資料抽取);高溫 = 多樣有創意(適合腦力激盪)。客戶要的是「每次一樣」,所以多半用低溫。" },
    { t: "預訓練 vs 微調", en: "Pre-training / Fine-tuning", d: "先用海量文字學會語言,再用少量資料調整行為。多數導入案其實只需要好提示詞 + RAG。" }
  ],
  code: [{
    lang: "python",
    name: "ask_llm.py",
    desc: "DocMind 第一次開口:呼叫 LLM API,並把參數與 token 用量一起印出來 — 後者是你要報給客戶的數字。",
    src: `from openai import OpenAI

client = OpenAI()   # 自動讀取環境變數 OPENAI_API_KEY

resp = client.chat.completions.create(
    model="gpt-6-luna",            # 便宜的小模型;以你帳號可用的為準
    temperature=0.3,               # 0=穩定一致, 1=奔放有創意
    messages=[
        {"role": "system",
         "content": "你是文件助理 DocMind,回答精簡、必須附依據。"},
        {"role": "user",
         "content": "用一句話解釋什麼是 RAG?"},
    ],
)
print(resp.choices[0].message.content)
print("本回共花費 tokens:", resp.usage.total_tokens)`
  }],
  quiz: [
    { q: "LLM API 的計費主要依據什麼?",
      opts: ["對話的總次數", "處理的 token 數量(輸入 + 輸出)", "模型被下載的次數", "固定月租費"],
      a: 1,
      why: "輸入 prompt 與輸出回答的 token 總量決定費用 — 這也是為什麼「塞整份文件進 prompt」又貴又容易超窗。" },
    { q: "要讓模型做「資料抽取」時,temperature 建議怎麼設?",
      opts: ["調到最高 2.0 讓它發揮創意", "調低(0–0.3),輸出穩定一致", "完全沒有影響", "每次呼叫隨機調整"],
      a: 1,
      why: "抽取任務要的是一致性:同一份發票每次都抽出同樣的欄位。低溫讓輸出接近機率最高的答案。" },
    { q: "對話超過 context window 上限會發生什麼?",
      opts: ["自動升級到更大的模型", "報錯,或舊內容被截斷導致模型「失憶」", "內容自動存進資料庫", "不會有任何影響"],
      a: 1,
      why: "模型只能看到視窗內的內容。塞不下的部分會被丟棄 — 這就是為什麼需要 RAG 來「外掛知識」。" }
  ],
  demo: "temperature",
  project: "寫一個 ask_docmind(question) 函式:串上 LLM API,設定 system prompt 與 temperature,印出 token 用量。然後用同一個問題跑 5 次,把 5 次的答案與 token 數貼給北辰 — 讓他們親眼看到「不定性」與「花費」是同一件事。",
  resources: [
    { n: "OpenAI API 官方文件", u: "https://platform.openai.com/docs" },
    { n: "Hugging Face LLM 課程", u: "https://huggingface.co/learn" }
  ],
  next: "模型會說話了,但怎麼讓它「聽話」?下一站:提示詞工程 — 不用改一行模型程式,就能讓交付品質跳一級。"
},

{
  id: 7,
  emoji: "✍️",
  title: "提示詞工程",
  tagline: "把客戶的規則寫成模型一定得守的劇本",
  color: "#f59e0b",
  duration: "約 1 週",
  connection: "上一站 DocMind 會說話了,但北辰的法務與客服主管各抱怨了一件事:「它每次都講不一樣的格式」「它亂講我們沒有寫的政策」。模型不變,變的是你下的指令。提示詞工程是投資報酬率最高的技能 — 也是 FDE 在現場改得最快的一層。",
  contribution: "為北辰定稿 system prompt:角色、規則(不確定就說文件裡沒有)、輸出格式、以及法務要求的「一律附來源」,一次到位。",
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
    { t: "結構化輸出", en: "Structured Output", d: "明確指定 JSON / Markdown 表格等格式並給範例,下游程式才能穩定解析 — 客戶要匯入 Excel 時靠的就是它。" },
    { t: "提示詞注入", en: "Prompt Injection", d: "使用者輸入或文件內容可能覆蓋你的指令。用分隔符、工具權限與過濾降低風險;第 12 站會把它當成正式的資安項目處理。" }
  ],
  code: [{
    lang: "python",
    name: "docmind_prompt.py",
    desc: "DocMind 的正式系統提示詞:規則明確、格式固定、拒絕編造 — 這份文字檔是要給客戶簽核的。",
    src: `SYSTEM_PROMPT = """你是 DocMind,一位嚴謹的文件助理。

## 規則
1. 只根據「參考資料」回答,嚴禁編造內容
2. 回答末尾標註來源,例如(來源:退貨作業手冊 p.12)
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
      why: "LLM 天生傾向「有問必答」。明確允許它說「不知道」,是對抗幻覺最簡單有效的一招 — 也是客戶敢上線的前提。" }
  ],
  demo: "prompt",
  project: "幫北辰寫出完整 system prompt(角色 + 規則 + 格式 + 2 個 few-shot 範例),對同一組 10 個問題測試前後差異,並把「改了哪一句、結果差在哪」寫成三行紀錄 — 之後第 14 站的 evals 會直接接上這份東西。",
  resources: [
    { n: "OpenAI Prompt Engineering 指南", u: "https://platform.openai.com/docs/guides/prompt-engineering" },
    { n: "Anthropic 互動式 Prompt 教程", u: "https://github.com/anthropics/prompt-eng-interactive-tutorial" }
  ],
  next: "提示詞再好,模型腦中仍沒有北辰的 300 份文件。下一站讓它「開卷考」:RAG — 本路線圖的技術高潮。"
},

{
  id: 8,
  emoji: "📚",
  title: "RAG 檢索增強生成",
  tagline: "給 LLM 一座客戶自己的圖書館",
  color: "#6366f1",
  duration: "約 2–3 週",
  connection: "上一站的系統提示詞讓 DocMind 守規矩,但模型腦中沒有北辰的退貨政策、保固條款與門市作業手冊 — context window 也裝不下 300 份文件。RAG 的思路很優雅:先檢索出相關段落,再讓模型「開卷作答」。DocMind 從一個會聊天的模型,變成客戶的知識助理。",
  contribution: "導入案的核心功能誕生:文件上傳 → 切塊 → 向量化 → 檢索 → 有憑有據、附來源的回答。客服不再靠猜,新人也不用翻 300 份 PDF。",
  goals: [
    "掌握 RAG 的完整流程與每個環節",
    "理解 chunking 切塊策略的取捨",
    "學會評估檢索品質",
    "設計引用來源與防幻覺機制"
  ],
  concepts: [
    { t: "RAG", en: "Retrieval-Augmented Generation", d: "檢索增強生成:先從知識庫撈出相關內容,塞進提示詞,讓模型據此回答。" },
    { t: "為什麼需要 RAG", en: "Why RAG", d: "模型沒看過客戶的私有資料、知識有截止日期;微調又貴又不擅長「背事實」。RAG 便宜、可即時更新、答案可溯源 — 這三點正是導入案的賣點。" },
    { t: "切塊", en: "Chunking", d: "把長文件切成 200–800 token 的片段(按標題、段落邊界)。太大 → 雜訊多;太小 → 語意斷裂。客戶的文件品質,會在這裡直接反映到答案品質。" },
    { t: "檢索", en: "Retrieval", d: "把使用者的問題也變成向量,找出最相近的文件片段。品質決定 RAG 的上限 — 下一站深入。" },
    { t: "引用與防幻覺", en: "Citations", d: "在提示詞要求「只依據參考資料回答並標註來源」,答不出來就老實說不知道。有來源,客戶才敢把答案轉給客戶。" }
  ],
  code: [{
    lang: "python",
    name: "mini_rag.py",
    desc: "最小可用 RAG:不到 30 行,DocMind 的心臟就此誕生。",
    src: `from openai import OpenAI
import numpy as np

client = OpenAI()
chunks = [
    "退貨需在 14 天內完成,並附上發票。",
    "產品保固期兩年,人為損壞除外。",
    "門市營業時間為 9:00 至 18:00。",
]

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
    model="gpt-6-luna",
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
  project: "挑一份 10 頁的文件(公司的退貨政策最合適),實作完整 RAG:切塊 → embedding → 檢索 top-3 → 生成帶來源標註的回答。然後自己當客戶,問 10 個「文件裡其實沒有」的問題,記錄 DocMind 有沒有老實說不知道。",
  resources: [
    { n: "LangChain RAG 官方教學", u: "https://python.langchain.com/docs/tutorials/rag/" },
    { n: "LlamaIndex 文件", u: "https://docs.llamaindex.ai/" }
  ],
  next: "檢索的靈魂藏在那一行「向量內積」裡。下一站拆解它:Embeddings 與向量資料庫。"
}

];
