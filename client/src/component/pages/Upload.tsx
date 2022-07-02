/**
 * 画像データアップロード画面用コンポーネント
 */

import { ReactElement, useState } from "react";
import { Button, Input } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from 'axios'
import FormData from 'form-data'
import UseStyles from '../common/UseStyles';
import '../../App.css'
// WebサーバーのURL
const baseUrl = "http://localhost:3001";

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
            <Button variant="contained" color="success">
                <Link className="donation-receipt-link" to={{ pathname: '/'}}>
                    Homeへ戻る
                </Link>
            </Button>
        </div>
    );
}

export default Upload;