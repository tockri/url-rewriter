# url-rewriter
## 概要
登録されたURLを新しいタブで開く際に、別のホスト名に置換するChrome拡張機能

## フレームワーク
WXT

## 言語
TypeScript

## 実装方針
backgroundのみ使用する。browserにtabが追加、変更されたイベントでtabのURLを書き換える。

## 実装上の注意
できるだけ純粋関数を多用し、モックを使わずvitestによる単体テストができるようにする。