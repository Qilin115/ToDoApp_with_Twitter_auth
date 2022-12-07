# DDLでテーブルを作成する
mysql -u root -proot < "/docker-entrypoint-initdb.d/init.sql"

# データを流し込む
mysql -u root -proot < "/docker-entrypoint-initdb.d/init_todo_app.sql"