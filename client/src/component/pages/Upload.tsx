/**
 * 画像データアップロード画面用コンポーネント
 */

import { Button } from "@mui/material";
import axios from 'axios';
import FormData from 'form-data';
import { ReactElement, useState } from "react";
import { Link } from 'react-router-dom';
import '../../App.css';
import UseStyles from '../common/UseStyles';
// WebサーバーのURL
const baseUrl = "http://localhost:3001";
const fs = require('fs');

// 設定ファイルから値を読み取る
const {
    REACT_APP_API_Key,
    REACT_APP_API_Secret
} = process.env;

/**
 * Uploadコンポーネント
 */
function Upload():ReactElement {

    // ステート変数を用意
    const [ fileName, setFileName ] = useState('ファイルアップロード')
    const [ file, setFile] = useState({})
    const classes = UseStyles()
    
    /**
     * ファイル名とファイル本体を保存するための関数
     */
    const saveFile = (e:any) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };
    
    /**
     * ファイルがアップロードされた時の処理
     */
    const changeUploadFile = async (event:any) => {
        const { name, files } = event.target;
        event.target.value = '';
        //送信用のデータを用意する。
        let postData = new FormData();
        // 送信データを作成する。
        postData.append('fileName',fileName);
        postData.append('file',file);
        console.log("postData:", postData);
        try {
            // POSTメソッドで送信
            const res = await axios.post(baseUrl + '/api/upload', postData , {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': `multipart/form-data; boundary=${postData}`,
                },  
            });
            console.log(res);
            alert("ファイルアップロード成功！");
        } catch (e) {
            console.error("ファイルアップロード失敗：", e);
            alert("ファイルアップロード失敗");
        }
    };

    /**
     * Pinataへアップロードする際に実行する関数
     */
    const pintaUploadFile = async (event:any) => {
        // リクエストパラメータに詰める名前とデータ本体
        const { name, files } = event.target;
        event.target.value = '';

        // APIエンドポイントのベースURL
        const baseAPIUrl = "https://api.pinata.cloud";

        //送信用のデータを用意する。
        let postData = new FormData();
        // 送信データを作成する。
        /*
        postData.append('fileName',fileName);
        postData.append('file',file);
        console.log("postData:", postData);
        */
        postData.append('file', file);
        postData.append('pinataOptions', '{"cidVersion": 1}');
        postData.append('pinataMetadata', `{"name": "${fileName}", "keyvalues": {"company": "Pinata"}}`);
        

        try {
            // POSTメソッドで送信
            const res = await axios.post(baseAPIUrl + '/pinning/pinFileToIPFS', postData , {
                headers: {
                    'accept': 'application/json',
                    'pinata_api_key': `${REACT_APP_API_Key}`,
                    'pinata_secret_api_key': `${REACT_APP_API_Secret}`,
                    'Content-Type': `multipart/form-data; boundary=${postData}`,
                },  
            });
            console.log(res);
            alert("ファイルアップロード成功！");
        } catch (e) {
            console.error("ファイルアップロード失敗：", e);
            alert("ファイルアップロード失敗");
        }
    };

    return (
        <div className="App">
            <p>ファイルアップロード画面</p>
            <label id="fileUpload" htmlFor="{input:inputFileBtnHide}">
                <Button LinkComponent="label" variant="outlined">
                    {fileName}
                    <input type="file" className={classes.inputFileBtnHide} onChange={saveFile}/>
                </Button>
            </label>
            <br/><br/>
            <Button variant="contained" onClick={changeUploadFile} color="secondary">
                アップロード
            </Button>
            <br/><br/>
            <Button variant="outlined" onClick={pintaUploadFile} color="secondary">
                Pinataへアップロード
            </Button>
            <br/><br/>
            <Button variant="contained" color="success">
                <Link className="donation-receipt-link" to={{ pathname: '/'}}>
                    Homeへ戻る
                </Link>
            </Button>
        </div>
    );
}

export default Upload;