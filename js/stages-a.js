/* AI Engineer Roadmap 2026 — 站點資料(第 1–6 站) */
window.STAGES_A = [

{
  id: 1,
  emoji: "🐍",
  title: "Python 程式設計",
  tagline: "一切的地基 — AI 世界的通用語言",
  color: "#3776ab",
  duration: "約 2–3 週",
  connection: "旅程從這裡開始。整條路線圖上的每一站 — 從訓練模型到部署服務 — 都建立在 Python 之上。先把地基打好,後面每一站都會順利十倍。",
  contribution: "用 Python 讀取文件、清理文字、統計內容 — 這些正是未來 DocMind 資料處理管線的雛形。",
  goals: [
    "熟悉變數、資料型別、流程控制與函式",
    "會用 list / dict / tuple / set 處理資料",
    "學會 pip、虛擬環境(venv)與套件管理",
    "能讀寫檔案、處理 JSON 文字資料"
  ],
  concepts: [
    { t: "變數與資料型別", en: "Variables & Types", d: "int、float、str、bool 是四種基本型別。Python 動態型別,不用事先宣告,寫起來像自然語言。" },
    { t: "容器", en: "Containers", d: "list 有序可變、dict 是鍵值對、tuple 不可變、set 自動去重 — AI 資料處理每天都在用它們。" },
    { t: "函式", en: "Functions", d: "用 def 把可重複使用的邏輯封裝起來。好函式只做一件事,並有清楚的名字。" },
    { t: "虛擬環境", en: "Virtual Environments", d: "每個專案獨立的套件空間,避免 A 專案要新版、B 專案要舊版的衝突。AI 工程師的基本習慣。" },
    { t: "套件生態系", en: "Ecosystem", d: "pip 一行指令就能裝上 NumPy、pandas、PyTorch。Python 統治 AI 的真正原因就是這個生態系。" }
  ],
  code: [{
    lang: "python",
    name: "analyze.py",
    desc: "DocMind 的第一行程式碼:讀取一份文件,統計字數與熱門詞彙。",
    src: `from pathlib import Path
from collections import Counter

def load_document(path: str) -> str:
    """讀取文件內容 — DocMind 的第一步"""
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
      why: "專案 A 可能需要 transformers 4.40、專案 B 要 4.30。venv 讓每個專案有自己的套件空間,彼此不干擾。" }
  ],
  demo: null,
  project: "寫一個 analyze.py:讀取任意 .txt 文件,輸出總字數與最常見的 10 個詞 — 這是 DocMind 文件處理管線的起點。",
  resources: [
    { n: "Python 官方中文教學", u: "https://docs.python.org/zh-tw/3/tutorial/" },
    { n: "Real Python(優質英文教學)", u: "https://realpython.com/" }
  ],
  next: "下一站,你會用 Git 把這些程式碼放進「時光機」— 改壞了也回得去。"
},

{
  id: 2,
  emoji: "🔧",
  title: "Git + GitHub",
  tagline: "給程式碼一台時光機",
  color: "#f05033",
  duration: "約 1 週",
  connection: "上一站你寫出了 DocMind 的第一支程式。但改壞了怎麼辦?想和別人合作怎麼辦?Git 把每一步變成可回溯的快照,GitHub 讓專案被世界看見 — 未來求職時,你的 GitHub 就是你的作品集。",
  contribution: "為 DocMind 建立 Git repo、撰寫 README 與 .gitignore、用分支開發功能 — 專業工作流程從這裡養成。",
  goals: [
    "掌握 add → commit → push 基本流程",
    "用分支(branch)平行開發功能",
    "理解 Pull Request 與程式碼審查",
    "用 .gitignore 保護機密與大檔案"
  ],
  concepts: [
    { t: "版本控制", en: "Version Control", d: "記錄每次變更的快照,隨時可回溯、可比較、可協作 — 給專案一台時光機。" },
    { t: "Commit", en: "Commit", d: "一次有意義的變更快照。好習慣:小步提交、訊息寫清楚做了什麼、為什麼。" },
    { t: "分支", en: "Branch", d: "從主線分出一條平行時空實驗新功能,穩定後再合併回 main,主線永遠保持可用。" },
    { t: "Pull Request", en: "PR", d: "提出變更請求讓他人審查(code review),是團隊協作與品質把關的核心機制。" },
    { t: ".gitignore", en: "Git Ignore", d: "告訴 Git 忽略哪些檔案:.env(API 金鑰!)、模型權重、__pycache__。推錯金鑰是新手最常見的事故。" }
  ],
  code: [{
    lang: "bash",
    name: "terminal",
    desc: "把 DocMind 放進版本控制,並用分支開發新功能。",
    src: `# 初始化 DocMind 專案
git init
echo ".env\\n__pycache__/\\n*.pdf" > .gitignore   # 保護金鑰與大檔案
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
      why: "commit 是本機的快照(可以隨時做),push 才把這些快照同步到 GitHub 等遠端仓库。" },
    { q: "為什麼 .env 一定要放進 .gitignore?",
      opts: ["檔案太大拖慢速度", "裡面有 API 金鑰等機密,推上 GitHub 會外洩", "Git 不支援文字檔", "為了讓 commit 更快"],
      a: 1,
      why: ".env 存放 API 金鑰與密碼。一旦推上公開 repo,爬蟲幾分鐘內就會抓走盜用 — 這是新手最貴的教訓。" },
    { q: "開發一個新功能時,最專業的做法是?",
      opts: ["直接在 main 上邊改邊試", "開一條新分支,完成測試後再合併回 main", "先刪掉舊程式再重寫", "盡量不要用 Git 以免出錯"],
      a: 1,
      why: "feature branch 讓實驗不污染主線,出問題隨時整條丟棄;合併前還能開 PR 讓隊友審查。" }
  ],
  demo: null,
  project: "把上一站的 analyze.py 推上 GitHub,寫一份像樣的 README:專案簡介 + 安裝方式 + 使用範例。",
  resources: [
    { n: "Pro Git 官方中文書", u: "https://git-scm.com/book/zh-tw/v2" },
    { n: "GitHub Skills(互動練習)", u: "https://skills.github.com/" }
  ],
  next: "程式碼進了時光機。下一站,替 DocMind 的資料找一個家:SQL 與資料庫。"
},

{
  id: 3,
  emoji: "🗄️",
  title: "SQL + 資料庫",
  tagline: "幫資料蓋一個整齊的家",
  color: "#336791",
  duration: "約 2 週",
  connection: "程式碼進了時光機,但資料呢?DocMind 之後要存使用者、文件、聊天紀錄 — 關機就消失的變數可不夠用。這一站學會用關聯式資料庫把資料存得整齊、查得飛快、查得精準。",
  contribution: "為 DocMind 設計 documents、chats、messages 三張核心資料表,並用 SQL 查詢歷史對話。",
  goals: [
    "理解關聯式資料庫與資料表設計",
    "熟練 CRUD 四大基本操作(SQL 增刪查改)",
    "用 JOIN 結合多張資料表查詢",
    "知道 SQL 與 NoSQL 各適合什麼場景"
  ],
  concepts: [
    { t: "關聯式資料庫", en: "RDBMS", d: "用「表」組織資料,表與表之間用鍵關聯。PostgreSQL、MySQL、SQLite 都屬於這一類。" },
    { t: "主鍵與外鍵", en: "PK / FK", d: "主鍵唯一識別一列資料;外鍵指向另一張表的主鍵,把資料關聯起來 — 例如訊息屬於哪場對話。" },
    { t: "CRUD", en: "Create Read Update Delete", d: "INSERT、SELECT、UPDATE、DELETE — 對資料的四種基本操作,SQL 的核心。" },
    { t: "JOIN", en: "Join", d: "依外鍵把兩張表「接」起來查詢,例如把 messages 和 chats 接起來,看每場對話的完整訊息。" },
    { t: "SQL vs NoSQL", en: "Database Choice", d: "結構固定、需要複雜查詢 → SQL;彈性 schema、超大規模 → NoSQL。AI 應用常常兩種都用。" }
  ],
  code: [{
    lang: "sql",
    name: "schema.sql",
    desc: "DocMind 的核心資料表:文件、對話、訊息 — 之後第 11 站的 API 會直接使用它。",
    src: `-- DocMind 的核心資料表
CREATE TABLE documents (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    content     TEXT,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chats (
    id         SERIAL PRIMARY KEY,
    user_name  TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
    id       SERIAL PRIMARY KEY,
    chat_id  INTEGER REFERENCES chats(id),
    role     TEXT CHECK (role IN ('user', 'assistant')),
    content  TEXT NOT NULL
);

-- 查詢:每位使用者的對話訊息數排行
SELECT c.user_name, COUNT(m.id) AS msg_count
FROM chats c
JOIN messages m ON m.chat_id = c.id
GROUP BY c.user_name
ORDER BY msg_count DESC;`
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
  project: "用 SQLite 建立上述三張表、插入假資料,寫出「查詢某位使用者的完整對話紀錄」的 SQL。",
  resources: [
    { n: "SQLBolt 互動練習(英文)", u: "https://sqlbolt.com/" },
    { n: "PostgreSQL 官方教學", u: "https://www.postgresqltutorial.com/" }
  ],
  next: "資料有家了。下一站進入第二章:讓機器第一次真的「學習」。"
},

{
  id: 4,
  emoji: "📊",
  title: "機器學習基礎",
  tagline: "讓機器從資料中自己學會規則",
  color: "#8e44ad",
  duration: "約 3–4 週",
  connection: "上一章你把資料存好了 — 但資料只是原料。這一站,機器第一次從資料中自己「學」出規則。你會發現:之後所有炫酷的 LLM,本質上都是在做同一件事,只是規模大了百萬倍。",
  contribution: "為 DocMind 訓練第一個模型:意圖分類器 — 判斷使用者想「摘要文件」、「翻譯」還是「閒聊」。",
  goals: [
    "理解監督式學習的完整流程",
    "掌握 train/test 切分與評估指標",
    "認識過擬合與正則化",
    "用 scikit-learn 訓練第一個文字分類器"
  ],
  concepts: [
    { t: "監督式學習", en: "Supervised Learning", d: "給模型「題目 + 標準答案」(標籤資料)學習映射關係。分類(預測類別)與回歸(預測數值)都屬於這一類。" },
    { t: "特徵", en: "Features", d: "餵給模型的輸入資訊。文字資料要先用 TF-IDF 或 embedding 轉成數字,模型才讀得懂。" },
    { t: "訓練/測試切分", en: "Train / Test Split", d: "用沒看過的資料「考試」,才知道模型是真學會了,還是只是把答案背下來。" },
    { t: "過擬合", en: "Overfitting", d: "訓練分數極高、測試卻很差的「背題型學生」。解方:更多資料、正則化、簡化模型。" },
    { t: "評估指標", en: "Metrics", d: "Accuracy、Precision、Recall、F1。類別不平衡時 accuracy 會騙人 — 99% 都是正常件時,全猜「正常」也有 99%。" }
  ],
  code: [{
    lang: "python",
    name: "intent_classifier.py",
    desc: "DocMind 的意圖分類器:判斷使用者想摘要、翻譯還是閒聊。",
    src: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# DocMind 的意圖分類資料(實務上每類要數十筆以上)
texts = ["幫我摘要這份文件", "總結重點", "把這段翻成英文",
         "translate this", "今天天氣如何", "你好呀"]
labels = ["summarize", "summarize", "translate",
          "translate", "chitchat", "chitchat"]

X_train, X_test, y_train, y_test = train_test_split(
    texts, labels, test_size=0.25, random_state=42)

model = make_pipeline(TfidfVectorizer(), LogisticRegression())
model.fit(X_train, y_train)

print(classification_report(y_test, model.predict(X_test)))
print(model.predict(["幫我總結一下"]))   # -> ['summarize']`
  }],
  quiz: [
    { q: "監督式和非監督式學習最大的差別?",
      opts: ["資料量多寡不同", "有沒有「標準答案」(標籤)", "使用的程式語言不同", "需要的硬體等級不同"],
      a: 1,
      why: "監督式學習的資料帶有標籤(答案);非監督式(如分群)只給資料,讓模型自己找出結構。" },
    { q: "訓練集準確率 99%,測試集卻只有 60%,這是?",
      opts: ["欠擬合(underfitting)", "過擬合 — 把訓練資料背下來了", "資料集太大造成的", "完全正常的現象"],
      a: 1,
      why: "模型把訓練題「背下來」而不是學會規律。解方:更多資料、正則化、簡化模型、資料增強。" },
    { q: "為什麼一定要切 train / test 兩份資料?",
      opts: ["節省訓練時間", "用沒看過的資料公平評估泛化能力", "資料太多記憶體裝不下", "讓報告數字更好看"],
      a: 1,
      why: "用訓練時看過的資料評分,就像用考過的原題考試 — 分數高不代表真的會。測試集就是模擬考。" }
  ],
  demo: null,
  project: "擴充意圖分類器:每類收集至少 20 筆句子,讓它辨識「摘要 / 翻譯 / 問答 / 閒聊」四種意圖。",
  resources: [
    { n: "scikit-learn 官方入門教學", u: "https://scikit-learn.org/stable/tutorial/index.html" },
    { n: "Kaggle Learn 免費課程", u: "https://www.kaggle.com/learn" }
  ],
  next: "分類器背後只是冰山一角。下一站放大看:神經網路 — 所有現代 AI 的引擎。"
},

{
  id: 5,
  emoji: "🧠",
  title: "深度學習 · PyTorch",
  tagline: "神經網路 — LLM 的心臟",
  color: "#ee4c2c",
  duration: "約 4–6 週",
  connection: "上一站的邏輯迴歸只有一層。把幾百萬層堆起來、用 GPU 加速,就是深度學習 — ChatGPT 的 Transformer 也是這樣長出來的。這一站親手訓練神經網路,之後看任何模型架構圖都不再害怕。",
  contribution: "用 PyTorch 親手跑訓練迴圈,理解 loss、epoch、optimizer — 這是讀懂 LLM 訓練與微調(fine-tuning)的門票。",
  goals: [
    "理解張量(Tensor)與自動微分",
    "用 nn.Module 建構神經網路",
    "掌握訓練迴圈:前向 → loss → 反向 → 更新",
    "認識 CNN / RNN / Transformer 的角色分工"
  ],
  concepts: [
    { t: "張量", en: "Tensor", d: "多維陣列 + GPU 加速能力。PyTorch 的一切資料 — 文字、圖片、權重 — 都是 tensor。" },
    { t: "自動微分", en: "Autograd", d: "自動算出每個參數對 loss 的影響(梯度)。有了它,「學習」才能自動化。" },
    { t: "訓練迴圈", en: "Training Loop", d: "預測 → 算 loss → 反向傳播 → 更新參數,反覆幾千次。所有深度學習訓練都是這個節奏。" },
    { t: "損失函數", en: "Loss Function", d: "衡量「錯多少」的尺:分類用 CrossEntropy、回歸用 MSE。訓練的目標就是不斷把 loss 變小。" },
    { t: "Transformer", en: "Attention Is All You Need", d: "2017 年的架構革命:注意力機制讓模型看懂長文本的關聯。GPT 的 T 就是它。" }
  ],
  code: [{
    lang: "python",
    name: "train_loop.py",
    desc: "親手寫一次神經網路訓練迴圈 — 這五行節奏,就是所有 LLM 訓練的縮影。",
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
  }],
  quiz: [
    { q: "神經網路為什麼需要啟動函式(如 ReLU)?",
      opts: ["為了加快運算速度", "引入非線性,否則疊再深也只是一條直線", "為了節省記憶體", "為了把輸出變成機率"],
      a: 1,
      why: "沒有非線性,多層線性變換疊起來仍等於一層線性變換 — 網路再深也學不會複雜的模式。" },
    { q: "一個 epoch 代表什麼?",
      opts: ["訓練一小批資料(batch)", "完整看過整個訓練集一次", "執行一次反向傳播", "模型收斂的時刻"],
      a: 1,
      why: "epoch = 整份訓練資料完整過一遍。batch 是其中一小口,多個 batch 組成一個 epoch。" },
    { q: "loss 一直不下降,工程師的第一步應該是?",
      opts: ["直接改用最強的閉源模型", "檢查資料品質與學習率等基本設定", "立刻買更貴的 GPU", "把網路加深 100 層"],
      a: 1,
      why: "九成的問題出在資料或超參數:資料標錯、學習率太大/太小、輸入沒正規化。先排查,再談加大模型。" }
  ],
  demo: null,
  project: "把第 4 站的意圖分類資料改用 PyTorch 神經網路訓練,並畫出 loss 下降曲線。",
  resources: [
    { n: "PyTorch 官方教學(60 min blitz)", u: "https://pytorch.org/tutorials/" },
    { n: "3Blue1Brown 神經網路系列", u: "https://www.3blue1brown.com/topics/neural-networks" }
  ],
  next: "引擎造好了。下一站把它放大一千倍、餵它讀完整個網際網路 — 進入 LLM 的世界。"
},

{
  id: 6,
  emoji: "🤖",
  title: "LLM 基礎",
  tagline: "大型語言模型到底怎麼運作?",
  color: "#10a37f",
  duration: "約 2 週",
  connection: "上一站你懂了神經網路。LLM 就是「超大型 + 讀過整個網際網路的文字預測神經網路」。這一站拆開黑盒子:token、context window、temperature — 從此你呼叫 API 時,知道自己正在操作什麼。",
  contribution: "為 DocMind 接上 LLM API,讓助理第一次「開口說話」— 並理解每個參數對回答的影響。",
  goals: [
    "理解 token 與詞元化(tokenization)",
    "掌握 context window 的限制與影響",
    "熟練 temperature / top_p 等生成參數",
    "認識主流 API 模型與開源模型(Llama、Qwen)"
  ],
  concepts: [
    { t: "詞元", en: "Token", d: "模型讀文字的最小單位,可能是詞、子詞或標點。計費與 context 上限都以 token 計算。" },
    { t: "下一詞預測", en: "Next-token Prediction", d: "LLM 的本質:根據前文預測最可能的下一個 token,不斷重複,生成整段文字。" },
    { t: "上下文視窗", en: "Context Window", d: "模型一次能「看到」的 token 上限。超出就會截斷 — 這正是第 8 章 RAG 存在的關鍵原因。" },
    { t: "溫度", en: "Temperature", d: "控制隨機度:低溫 = 穩定可預測(適合資料抽取);高溫 = 多樣有創意(適合腦力激盪)。" },
    { t: "預訓練 vs 微調", en: "Pre-training / Fine-tuning", d: "先用海量文字學會語言,再用少量資料調整行為。多數應用其實只需要好提示詞 + RAG。" }
  ],
  code: [{
    lang: "python",
    name: "ask_llm.py",
    desc: "DocMind 第一次開口說話:呼叫 LLM API 並觀察參數與 token 用量。",
    src: `from openai import OpenAI

client = OpenAI()   # 自動讀取環境變數 OPENAI_API_KEY

resp = client.chat.completions.create(
    model="gpt-4o-mini",
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
  project: "寫一個 ask_docmind(question) 函式:串上 LLM API,設定 system prompt 與 temperature,並印出 token 用量。",
  resources: [
    { n: "OpenAI API 官方文件", u: "https://platform.openai.com/docs" },
    { n: "Hugging Face LLM 課程", u: "https://huggingface.co/learn" }
  ],
  next: "模型會說話了,但怎麼讓它「聽話」?下一站:提示詞工程 — 投資報酬率最高的技能。"
}

];
