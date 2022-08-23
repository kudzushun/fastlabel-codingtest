# fastlabel-codingtest-todo

## 課題
TODOアプリのAPI側のソースコード（`api/src`以下）をリファクタリングしてください。
また、チェックボックスの挙動に一部バグを含んでいるため、修正してください。

## 提出方法
面接の日までに課題を終わらせ、当日ご自身のソースコードを画面共有しながら、  
どの箇所をどのように修正したかを説明してください。

## ローカルに準備いただくもの
- 必須
  - Docker
- オプション（エディタ上でインストールしたライブラリなどを参照したい場合）
  - Node.js(14.15.3)
  - npm

## API技術スタック
- Node.js
- Express
- TypeORM
- tsoa

## ローカル起動方法

```bash
$ docker network create fastlabel_todo_link
$ docker-compose up --build
# Open another window
$ docker-compose exec api npm run migration:run
```

`http://localhost:3000`にアクセスできます。

## routes.tsファイルの更新

`api/src/controllers`を更新した際は、下記コマンドを実行して`api/src/middlewares/tsoa/routes.ts`ファイルを更新してください.

```bash
$ docker-compose exec api npm run tsoa
```
