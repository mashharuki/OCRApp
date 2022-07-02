/**
 * ExpressによるWebサーバー設定ファイル
 */

// 必要なモジュールを読み込む
const fs = require('fs');
var log4js = require('log4js');
const bodyParser = require('body-parser');
const path = require('path');
require('date-utils');
const fileupload = require("express-fileupload");
const cors = require("cors");
const Tesseract = require("tesseract.js");
const express = require('express');
const app = express();
// CORSの設定をする
app.use(cors());
app.use(fileupload());
app.use(express.static('./server/images/uploads/'));
// log4jsの設定
log4js.configure('./server/log/log4js_setting.json');
const logger = log4js.getLogger("server");
// ポート番号
const portNo = 3001;
// 接続するデータベース名
const database = 'postgres';
// ベースとなるパス情報
const basePath = "./server/images/uploads/";
// ファイル格納先フォルダパスを定義する。
const target_path = './server/images/uploads/';
// DB接続用のモジュールを読みこむ
const pgHelper = require('./server/db/pgHelper');
// 初期化する。
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// 起動
app.listen(portNo, () => {
    logger.debug('起動しました', `http://localhost:${portNo}`)
});

// 以下、APIの定義

/**
 * アップロードされたファイルデータをすべて取得するためのAPI
 */
app.get('/api/getFiles', (req, res) => {
    logger.debug("ファイル取得API開始");
    // 実行するSQL
    const query = 'SELECT fu.filename FROM fileupload fu ORDER BY fu.no DESC';
    // パラメータ用の配列を作成する。
    var values;
    try {
        // DBの実行
        pgHelper.execute(database, query, values, logger,(err, docs) => {
            if (err) {
                logger.error(err.toString());
                res.status(501).send("DB接続中にエラーが発生しました");
                return;
            }
            logger.debug("取得結果：", docs.rows);
            res.json({ result: docs.rows });
        });
    } catch(err) {
        logger.error("DB接続中にエラーが発生しました", err);
        console.log(err);
    }
    logger.debug("ファイル取得API終了");
});

/**
 * ファイルをアップロードするためのAPI定義
 */
app.post('/api/upload', (req, res) => {
    // パラメータ情報からファイル名とファイル本体、サイズを取得する。
    const file = req.files.file;
    const filename = file.name;
    const filesize = file.size;

    logger.debug("ファイル情報:", req.body);
    logger.debug("ファイル情報(詳細):", req.files.file);

    try {
        logger.debug(`ファイルまでのフォルダパス：${target_path}${filename}`)
        // ファイルの名前を更新してフォルダに格納する。
        file.mv(`${target_path}${filename}`, (err) => {
            if (err) {
                res.status(500).send({ message: "File upload failed", code: 500 });
            }
            logger.debug('ファイルアップロード成功')
            res.status(200).send({ message: "File Uploaded", code: 200 });
        });
        
        // 現在時刻を取得する。
        var dt = new Date();
        var uploaddate = dt.toFormat("YYYY/MM/DD HH24:MI:SS");
        // 実行するSQL
        const query = "INSERT INTO fileupload(filename, filesize, uploaddate) VALUES ($1, $2, $3)";
        // パラメータ
        const values = [filename, filesize, uploaddate];
        // DBの実行
        pgHelper.execute(database, query, values, logger,(err, docs) => {
            if (err) {
                logger.error(err.toString());
                res.status(501).send("DB接続中にエラーが発生しました");
                return;
            }
        });
    } catch(e) {
        logger.error("File upload failed：", e);
        res.status(500).send({ message: "File upload failed", code: 500 });
    }
});

/**
 * ファイルの読み取り結果を取得するためのAPI
 */
app.post('/api/execute', async (req, res) => {
    logger.debug("クエリ情報:", req.body);
    // 言語を取得する。
    let lang = req.body.lang;
    // ファイル名を取得する。
    const fileName = req.body.fileName;
    // ファイル名を取得する。
    const image = path.resolve(__dirname, basePath + fileName);
    logger.debug("image:", image);

    try {
        // 読み取り実行
        const result = await Tesseract.recognize(image, lang, {
            langPath: path.join(__dirname, './server', 'lang-data'), 
            logger: (m) => logger.debug(m),
        });
        
        logger.debug('ファイル読み取り成功')
        logger.debug('ファイル読み取り結果：', result.data.text);
        res.status(200).send(result.data.text);
    } catch(e) {
        logger.error("File recognize failed：", e);
        res.status(500).send({ message: "File recognize failed", code: 500 });
    }
});

// 静的ファイルを自動的に返すようルーティングする。
app.use('/', express.static('./../client/build'));
app.use('/Upload', express.static('./../client/build'));
app.use('/Execute', express.static('./../client/build'));
app.use('*', express.static('./../client/build'));