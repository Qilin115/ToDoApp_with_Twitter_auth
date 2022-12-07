# ToDoApp_with_Twitter_auth
nodejsのexpressライブラリで作成したToDoアプリにTwitter認証を追加したもの



## 起動準備

passport-twitter.jsの8,9,10行目の変数であるTwitterのAPIキーは以下から取得&設定

https://developer.twitter.com/en

APIキー、APIキーシークレットを使う

![スクリーンショット 2022-12-07 16 43 03](https://user-images.githubusercontent.com/103504603/206120142-6812ca2b-afd6-4792-9936-321c43a9fc51.png)


アプリの設定でCallback URIはhttp://127.0.0.1:3000/oauth/callback

Website URLはhttps://example.com
を追加





## 起動方法

./mysql/docker-compose.ymlを立ち上げてmysqlを起動
`docker-compose up -d`

初期テーブルを作成
`sh init-mysql.sh`

localで起動するportは3000

`npm start`

コンテナが停止している場合

`docker start mysql_container`


