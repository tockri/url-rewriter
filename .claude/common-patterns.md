# よく使用するコマンドパターン

## 開発コマンド

### WXT開発サーバー
```bash
npm run dev              # Chrome用開発サーバー
npm run dev:firefox      # Firefox用開発サーバー
```

### ビルド
```bash
npm run build            # Chrome用ビルド
npm run build:firefox    # Firefox用ビルド
```

### パッケージング
```bash
npm run zip              # Chrome用ZIP作成
npm run zip:firefox      # Firefox用ZIP作成
```

### 型チェック
```bash
npm run compile          # TypeScript型チェック
```

## デバッグパターン

### Chrome Extension開発
1. `chrome://extensions/` で拡張機能管理
2. 「パッケージ化されていない拡張機能を読み込む」で開発版読み込み
3. Background scriptのログは Chrome DevTools > Extensions で確認

### Storage確認
```javascript
// Chrome DevTools Console で実行
chrome.storage.sync.get('urlRewriteRules', console.log)
```

## コード検索パターン

### 関数定義検索
```bash
grep -r "rewriteUrl" entrypoints/
```

### 型定義検索
```bash
grep -r "interface.*Rule" entrypoints/
```

### イベントリスナー検索
```bash
grep -r "addEventListener\|onCreated\|onUpdated" entrypoints/
```

## テスト実行（予定）
```bash
npm test                 # 単体テスト実行
npm run test:watch       # ウォッチモードでテスト
```