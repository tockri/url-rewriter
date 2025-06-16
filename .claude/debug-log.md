# 重要なデバッグログ

## 初期設定完了 (2025-06-16)

### プロジェクト構成
- WXTフレームワークを使用したChrome拡張機能プロジェクト
- Background scriptでURL置換機能を実装
- TypeScriptで型安全な実装

### 実装済み機能
- URL置換ルールの管理（Chrome Storage Sync）
- タブ作成・更新イベントの監視
- デフォルトルールの自動設定

### ログ出力パターン
```javascript
console.log('URL Rewriter background started', { id: browser.runtime.id });
console.log(`Rewriting URL: ${tab.url} -> ${newUrl}`);
console.log('Default URL rewrite rules set');
console.error('Invalid URL:', url, error);
```

## デバッグ情報

### 確認すべきポイント
1. Background scriptの起動確認
2. Storage内のルール設定状況
3. タブイベントの正常な検知
4. URL変換の実行結果

### よくある問題
- URL constructor でのパースエラー
- Storage API の非同期処理タイミング
- 無限ループによるタブ更新

### 解決済み問題
（今後記録していく）