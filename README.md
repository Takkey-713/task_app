# 概要

## アプリケーション名
「task_app」
<br>本アプリケーションはReactを用いたタスク管理アプリです。</br>
<br>公開先: http://task-app-demo.com/</br>

## 作成背景
ReactとTypeSxcriptを学んだアウトプットのためにTrelloを参考として作成しました。

## アプリケーションについて
本アプリケーションは、用途によってボードを使い分け、タスクの洗い出しや進捗の管理をすることができます。忘れ物をしないためのメモ帳として使用することが可能です。
<br>※個人のタスクを管理するアプリケーションとなっておりますので、チームでの使用はできません。</br>

※アプリケーション動作GIF
![TaskApp](https://user-images.githubusercontent.com/70302566/112268899-01afbf00-8cbb-11eb-938a-135829f6cf84.gif)


## 使用した技術
<ul>
  <li>TypeScript</li>
  <li>React-Hooks</li>
  <li>useReducer、useState,useContext、useHistory</li>
  <li>React-Modal</li>
  <li>React-Router</li>
</ul>
<br>関数コンポーネントとReact-Hooksを用いて実装しております。</br>


## アプリケーションの機能

◎ユーザー認証(新規登録)
<ul>
  <li>新規登録/ログイン/ログアウト</li>
  <li>ボード登録/更新/削除</li>
  <li>リスト登録/更新/削除</li>
  <li>タスク登録/更新/削除</li>
</ul>

<br>※テストアカウント
email :test@gmail.com　passwoerd: test1234 
</br>

◎ボード選択 or ボード作成
<br>ログインもしくは新規登録後にボード選択画面へ</br>

<img width="1430" alt="スクリーンショット 2021-03-24 15 57 41" src="https://user-images.githubusercontent.com/70302566/112268021-ad580f80-8cb9-11eb-8b05-a821ab3d572b.png">

ボードの新規作成、ボードの選択することでメイン画面へ遷移します。

<img width="1296" alt="スクリーンショット 2021-03-24 16 00 22" src="https://user-images.githubusercontent.com/70302566/112268264-0b84f280-8cba-11eb-84cc-aab8bc474d64.png">


◎リストの作成
<br>メイン画面で「＋リストを追加する」をクリックするとテキストフォームが展開されるのでリストの名前を入力して追加するをクリックすると作成することができます。</br>
<img width="1390" alt="スクリーンショット 2021-03-24 16 26 38" src="https://user-images.githubusercontent.com/70302566/112271157-edb98c80-8cbd-11eb-8773-3e80af42e0bf.png">



◎タスクの作成
<br>作成したリスト要素にはタスクを作成するフォームがあり、クリックするとタスク作成フォームに切り替わります。</br>
<img width="524" alt="スクリーンショット 2021-03-24 16 27 11" src="https://user-images.githubusercontent.com/70302566/112271292-1a6da400-8cbe-11eb-90e0-0ae8c4f66d00.png">

タスク内容を入力して「タスクを追加する」をクリックすると新規タスクが作成されます。

◎タスクの編集&削除
先ほど作成したタスクをクリックするとモーダル画面が展開されるので、作成したタスクの情報を編集することができます。

<img width="1193" alt="スクリーンショット 2021-03-05 22 59 54" src="https://user-images.githubusercontent.com/70302566/110125288-828b4180-7e06-11eb-831b-9341a7dcf0ca.png">

・内容を変更した後に、再度タスクを確認すると変更されていることが確認できます。

・モーダルにある削除ボタンをクリックすると該当するタスクが削除されます。
<img width="1196" alt="スクリーンショット 2021-03-05 23 01 19" src="https://user-images.githubusercontent.com/70302566/110125594-d26a0880-7e06-11eb-88d7-c74c4dcdf958.png">


◎リストの削除&タスクのリストの更新
<ber>リストとタスクが2つ以上ある状態にします。</br>

<img width="1003" alt="スクリーンショット 2021-03-05 23 05 39" src="https://user-images.githubusercontent.com/70302566/110126118-6f2ca600-7e07-11eb-91a0-f4ca20a1b668.png">

<br>タスクのモーダルを開くとタスクが所属するリストの情報が表示されるので、リストを変更するとタスクが所属するリストを変更することができます。</br>

<img width="1004" alt="スクリーンショット 2021-03-05 23 08 28" src="https://user-images.githubusercontent.com/70302566/110126381-b61a9b80-7e07-11eb-9e56-ea120305c16b.png">

・「リスト１」から「リスト2」を選んで更新するとタスクの所属するリストが更新されます。

<img width="1002" alt="スクリーンショット 2021-03-05 23 09 58" src="https://user-images.githubusercontent.com/70302566/110126588-ea8e5780-7e07-11eb-8229-2c4310769a6b.png">

リストにある「:アイコン」をクリックすると、モーダルが展開されます。そこでタスクの更新、削除、追加、リストの削除が可能です。
<img width="524" alt="スクリーンショット 2021-03-24 16 27 11" src="https://user-images.githubusercontent.com/70302566/112272293-5e14dd80-8cbf-11eb-8a6e-f32554afb327.png">

リストを削除するボタンをクリックすると該当するリストとタスクが削除されます。

◎期限が過ぎたタスクの色を変更されます。
期限がすぎるとタスク要素の表示が赤くなり、モーダルでは「期限が過ぎている」と表示されます。
<img width="1008" alt="スクリーンショット 2021-03-05 23 15 24" src="https://user-images.githubusercontent.com/70302566/110127318-d860e900-7e08-11eb-8198-d95275e3f783.png">



<img width="998" alt="スクリーンショット 2021-03-05 23 15 31" src="https://user-images.githubusercontent.com/70302566/110127365-e44cab00-7e08-11eb-912d-db49d7dd9559.png">
※本日が3/5なので期限が3/5までのタスクは全て表示が赤くなります。

以上が本アプリケーションの使い方になります。

