/**
 * PostgresDB接続用のモジュール
 */

/**
 * DB接続＆SQL実行関数
 * @param {*} database 接続先DB
 * @param {*} query SQL文
 * @param {*} values パラメータ
 * @param {*} logger ロガーオブジェクト
 * @param {*} callback コールバック関数
 */
const execute = function (database, query, values, logger, callback) {

    const { Client } = require('pg');
    // 設定ファイルの読み込み
    const ConfigFile = require('config');
    logger.debug("接続先DBのIPアドレス：", ConfigFile.config.db);
    // DB接続用の初期設定
    const client = new Client({
        user: 'postgres',
        host: ConfigFile.config.db,
        database: database,
        password: 'postgres',
        port: 5432,
    });
    
    client.connect();

    logger.debug('SQL文：', query);
    logger.debug('パラメータの中身：', values);

    // パラメータの変数の有無で処理を分岐する。
    if (typeof values === "undefined") {
        client.query(query)
            .then((res) => {
                callback(null, res)
            })
            .catch((e) => {
                callback(e.stack, null);
            }).finally( () => {
                client.end();
            });
    } else {
        client.query(query, values)
            .then((res) => {
                callback(null, res)
            })
            .catch((e) => {          
                callback(e.stack, null);
            }).finally( () => {
                client.end();
            });
    }
}

module.exports = { execute };