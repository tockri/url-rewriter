# プロジェクト技術知識

## WXTフレームワーク特有の知識

### Background Script
- `defineBackground()` を使用してバックグラウンドスクリプトを定義
- TypeScriptの型安全性とWXTの便利な機能を活用

### Chrome Extension APIs
- `browser.tabs.onCreated` - 新しいタブ作成時のイベント
- `browser.tabs.onUpdated` - タブ更新（URL変更含む）時のイベント
- `browser.storage.sync` - Chrome Storage Sync API
- `browser.runtime.onInstalled` - 拡張機能インストール時のイベント

## アーキテクチャパターン

### URL置換ロジック
```typescript
// 純粋関数として実装可能な部分
const rewriteUrl = async (url: string): Promise<string> => {
  // ルール取得とURL変換ロジック
}
```

### データ構造
```typescript
interface UrlRewriteRule {
  fromHost: string;
  toHost: string;
  enabled: boolean;
}
```

## テスト戦略
- 純粋関数を分離してテスト可能にする
- URL変換ロジックは副作用を持たない関数として実装
- vitestを使用した単体テスト（モック不使用）

## パフォーマンス考慮事項
- Storage APIの非同期呼び出しを最小限にする
- URL変換は軽量な処理として実装
- 無限ループを避けるためのURL変更チェック

## セキュリティ考慮事項
- URLの妥当性チェック（try-catch でURL constructor使用）
- 悪意のあるURL置換を防ぐためのホスト名検証

## 開発ツール
- WXT dev サーバーでの開発
- TypeScriptコンパイラでの型チェック
- Chrome Developer Toolsでのデバッグ