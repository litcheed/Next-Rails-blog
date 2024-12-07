# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


## HOWTO

### model
```rails generate model Post title:string content:text```

### migrate
model作成後はmigrateでDBスキーム化する
```rails db:migrate```

### controller
app./controller/api/v1に作成される
```rails generate controller Api::V1::Posts index show create update destroy```

### 起動ポート番号変更
rails server -p 3001