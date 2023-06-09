# 我的餐廳清單
![1](https://raw.githubusercontent.com/Sawd1208/restaurant-list/main/public/image/1.png)
![2](https://raw.githubusercontent.com/Sawd1208/restaurant-list/main/public/image/2.png)
![3](https://raw.githubusercontent.com/Sawd1208/restaurant-list/main/public/image/3.png)



## 介紹
這是一個可以註冊帳號並且可以登入的美食收藏網站，你可以搜尋、瀏覽、新增、編輯餐廳資料以及連結地圖位置的餐廳清單網站。

## 特點
- 註冊、登入帳號
- 可以使用臉書帳號登入
- 查看自己帳號收藏的餐廳
- 使用關鍵字查找餐廳名稱及類別
- 自定義排序餐廳
- 瀏覽更詳細的餐廳資料
- 連結餐廳位置地圖
- 可以新增餐廳、編輯餐廳和刪除餐廳

## 使用
1. 先確認是否有安裝 npm和 Node.js
2. 將專案clone 到 local server
3. local server開啟後，透過終端機入進資料夾，輸入：
```
npm install
```
4. 安裝完畢之後，繼續輸入：
```
npm run start
```
5. 看見這行訊息代表可以順利運行，打開瀏覽器輸入以下網址：
```
Express is listening on http://localhost:3000
```
6. 暫停使用，請輸入：
```
ctrl + c
```
6. 製作種子資料：
```
npm run seed
```

## 開發工具
- node.js 18.15.0
- express 4.18.2
- express-handlebars 5.3.5
- express-session 1.17.1
- handlebars-helpers 0.10.0
- bootstrap 5.1.3
- font-awesome 5.8.1
- body-parser 1.20.2
- dotenv 16.0.3
- mongoose 7.1.0
- method-override 3.0.0
- bcryptjs 2.4.3
- connect-flash 0.1.1
- passport 0.4.1,
- passport-facebook 3.0.0
- passport-local 1.0.0