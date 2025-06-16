# プロジェクトコンテキスト

## プロジェクト背景
url-rewriterは、登録されたURLを新しいタブで開く際に、別のホスト名に置換するChrome拡張機能です。

## 技術スタック
- **フレームワーク**: WXT (Web Extension Toolkit)
- **言語**: TypeScript
- **アーキテクチャ**: Background script only（UIは最小限）
- **popupのUIアーキテクチャ**: React

## アーキテクチャの制約
- backgroundスクリプトとpopupのみを使用
- ブラウザのtabイベント（作成・更新）でURL書き換えを実行
- Chrome Storage Sync APIを使用してルール管理

## 開発方針
- 純粋関数を多用してテスト可能な設計
- vitestによる単体テスト（モック不使用）
- popupにルール設定機能を実装

## 現在の実装状況
- Background scriptでURL置換ルールの管理機能実装済み
- Tab作成・更新イベントの監視機能実装済み
- デフォルトルール設定機能実装済み

## 主要な制約
- WXTフレームワークの規約に従う
- Chrome拡張機能のManifest V3対応
- TypeScriptの型安全性を重視