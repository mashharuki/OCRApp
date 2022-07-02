# OCRSample
  TypeScriptとReact.jsとTesseract.jsを使った構築したOCRデモアプリです。

## 起動コマンド(クライアント側)
  1. `cd client`
  2. `npm run start`

## 起動コマンド(APIサーバー側)
  1. `cd backend`
  2. `node server.js` 

## DB設定
   local.yamlファイルに接続先DBの情報を記載しているので必要に応じて変更すること。  

   設定例
   ```yaml
    config:  
      db: 'localhost' 
   ```

## 機械学習を取り入れる際に必要なもの
  1. クライアントアプリ
  2. 機械学習用のAPIを提供するAPI用のサーバー  
  3. trandateを定期的に更新するバッチ処理

## 参考になりそうなサイト

  <a href="https://www.twilio.com/blog/tesseract-js-react-ocr-part-two-jp">Tesseract.jsとReactでOCRコミュニケーションアプリを作る</a>  
  <a href="https://pythonrepo.com/repo/naptha-tesseract-js-python-computer-vision">Pure Javascript OCR for more than 100 Languages</a>  
  <a href="https://github.com/jeromewu/tesseract.js-offline">オフラインバージョン</a>  
  