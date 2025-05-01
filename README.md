# 🎮 Sound Clash Arena

一款使用 React、PixiJS 和 Web Audio API 開發的聲控打怪遊戲！

玩家透過 **聲音音量來蓄力攻擊怪物**，並能使用鍵盤移動角色，擊殺越多波怪物，難度越高！

---

## 🚀 技術架構

| 技術          | 說明                                         |
| ------------- | -------------------------------------------- |
| React         | 前端框架                                     |
| Redux Toolkit | 狀態管理（管理玩家資訊、蓄力、波數等）       |
| @pixi/react   | 渲染 Canvas 畫面，管理角色、怪物、攻擊等動畫 |
| Web Audio API | 即時偵測麥克風音量，轉換為蓄力               |
| Vite          | 開發與打包工具                               |
| TypeScript    | 型別安全強化                                 |

---

## 🎯 遊戲特色

- 🎤 **聲音即蓄力**：透過麥克風音量控制攻擊蓄力
- 🕹️ **左右移動操作**：使用 ← → 鍵移動角色
- ⚡ **蓄滿即攻擊**：蓄力達 100 可發射攻擊
- 🧟 **怪物波數遞增**：每波怪物增加數量與難度
- ❤️ **玩家血量**：受到怪物碰撞會扣血，血量歸零即 Game Over

---

## 🛠️ 本地啟動

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

### 3. 打包部署（如部署到 Vercel）

```bash
npm run build
```

---

## 🧪 快速測試

1. 打開麥克風權限 ✅
2. 對著麥克風說話或大喊 🔊
3. 蓄力滿格後點擊【發射】即可攻擊怪物 🎯
4. 每波怪物越來越強，挑戰你的極限！🔥

---

## 📁 專案結構

```
src/
├── components/
│   ├── GameCanvas.tsx     # 遊戲主畫面邏輯
│   ├── Monster.tsx        # 怪物邏輯與血條繪製
│   ├── PowerBar.tsx       # 蓄力條 UI
│   ├── VoiceBar.tsx       # 音量條 UI
│   └── PlayerCard.tsx     # 玩家資訊面板
├── features/
│   └── game/              # Redux slice（volume, power, currentPlayer）
├── hooks/
│   └── useVoiceVolume.ts  # 麥克風音量監聽 hook
└── app/
    └── store.ts           # Redux 設定
```

---

## 📦 部署方式

建議使用 [Vercel](https://vercel.com/) 快速部署：

```bash
npm install -g vercel
vercel
```

---

## 📌 TODO 功能清單

- [ ] 爆炸 / 閃爍動畫效果
- [ ] 攻擊與擊殺音效
- [ ] 怪物生成延遲與更自然排列
- [ ] 多人對戰（WebSocket）
- [ ] 玩家排行榜 / 分數統計
- [ ] 技能冷卻時間與升級機制

---

## 🙌 作者

開發者：**Herry**  
技術協助：ChatGPT  
歡迎 Star ⭐️、Fork 🍴 或交流想法！
