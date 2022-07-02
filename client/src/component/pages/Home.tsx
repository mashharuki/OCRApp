/**
 * ホーム画面用コンポーネントファイル
 */

import { ReactElement, useState } from "react";
import { Button, Input } from "@mui/material";
import { createWorker } from 'tesseract.js';
import test from '../../images/test.png'
import axios from 'axios'
import FormData from 'form-data'
import UseStyles from '../common/UseStyles';
import '../../App.css'
// WebサーバーのURL
const baseUrl = "http://localhost:3001";

/**
 * Homeコンポーネント
 */
function Home():ReactElement {

    // tesseract.jsのオブジェクトを生成する。
    const worker = createWorker({
        logger: m => console.error(m),
    });
    // ステート変数を用意
    const [ text, setText ] = useState('Recognizing...')
    const [ fileName, setFileName ] = useState('ファイルアップロード')
    const [ file, setFile] = useState({})
    const classes = UseStyles()
    
    return (
        <div className="App">
            <h1>ようこそ、OCRデモアプリへ！</h1>
            <h4>ファイルアップロード機能と読み取り機能があります！</h4>
        </div>
    );
}

export default Home;