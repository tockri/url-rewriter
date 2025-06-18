# プロジェクト改善履歴

## 改善済み項目

- [x] Background scriptでのURL置換機能実装
- [x] Chrome Storage Sync APIでのルール管理
- [x] タブイベント監視による自動URL書き換え
- [x] popupでルール管理UIを表示する
    - [x] 現在設定されているルールを表示する
    - [x] ルールの有効・無効を切り替える
    - [x] ルールを削除する
    - [x] ルールを追加する

## 今後の改善予定

### 品質向上
- [ ] イベントのたびにsession storageにアクセスするのではなく、起動時にUrlRewriteRule一覧をメモリ上に取得する。tabsのイベントハンドラをasyncではなくすことでもとのURLに全くアクセスせずにホストを置換する。
- [ ] UrlRewriteRuleの型定義を別ファイルに切り出し、backgroundとpopup側で共通に読み込む。
