/**
 * 読み取り実行画面用コンポーネント
 */

import { ReactElement, useState, useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UseStyles from '../common/UseStyles';
import '../../App.css';
// WebサーバーのURL
const baseUrl = "http://localhost:3001";

/**
 * 言語用の列挙型変数
 */
enum Lang {
    JPN = 'jpn',
    ENG = 'eng',
}

/**
 * 読み取り言語プルダウン用の配列
 */
const langs:string[] = [
    Lang.JPN, 
    Lang.ENG,
    Lang.JPN + '+' + Lang.ENG,
];

/**
 * Executeコンポーネント
 */
function Execute():ReactElement {
    // ステート変数を用意
    const [ text, setText ] = useState('Recognizing...');
    const [ lang, setLang ] = useState('');
    const [ fileName, setFileName ] = useState('');
    const [ fileNames, setFileNames ] = useState([]);
    const classes = UseStyles();

    // 副作用フック
    useEffect(() => {
        // 初期化関数
        const init = async () => {
            try {
                // GETメソッドで送信
                const res = await axios.get(baseUrl + '/api/getFiles', {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },  
                });
                // jsonを文字列化してparse
                const items = JSON.parse(JSON.stringify(res.data));
                console.log("取得結果：", items);
                // ファイル名を格納する配列
                const files:any = [];

                for (let item of items["result"]) {
                    var file = item["filename"];
                    console.log("取得結果：", file);
                    files.push(file)
                };
                setFileNames(files);
            } catch (e) {
                console.error("ファイル取得失敗：", e);
            }
        };
        init();
    }, []);

    /**
     * doAction関数
     */
     const doAction = async () => {
        //送信用のデータを用意する。
        let postData = new FormData();
        // 送信データを作成する。
        postData.append('fileName', fileName);
        postData.append('lang', lang);
        console.log("postData:", postData);

        try {
            // POSTメソッドで送信
            const res = await axios.post(baseUrl + '/api/execute', postData , {
                headers: {
                    'accept': 'application/json',
                },  
            });
            console.log("取得結果：", res.data);
            setText(res.data);
            alert("ファイル読み取り成功！");
        } catch (e) {
            console.error("ファイル読み取り失敗：", e);
            alert("ファイル読み取り失敗");
        }
    }

    return (
        <div className="App">
            <p>読み取り実行画面</p>
            <FormControl size="medium" sx={{ m: 1, width: 400 }}>
                <InputLabel id="lang">読み取りたい言語を選んでください</InputLabel>
                <Select
                    labelId="lang"
                    id="lang2"
                    value={lang}
                    label="読み取りたい言語を選んでください"
                    input={<OutlinedInput id="select-Lang" label="読み取りたい言語を選んでください" />}
                    onChange={(e:any) => { setLang(e.target.value) }}
                >
                    { langs.map((lan, index) => (
                        <MenuItem key={index} value={lan}>{lan}</MenuItem>
                    ))}   
                </Select>
            </FormControl><br/>
            <FormControl size="medium" sx={{ m: 1, width: 300 }}>
                <InputLabel id="file">ファイル名</InputLabel>
                <Select
                    labelId="file"
                    id="file2"
                    value={fileName}
                    label="file"
                    input={<OutlinedInput id="select-prepay" label="ファイル名" />}
                    onChange={(e:any) => { setFileName(e.target.value) }}
                >
                    { fileNames.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl><br/>
            <Button variant="contained" onClick={doAction} color="primary">
                読み取り実行
            </Button>
            <p>読み取り結果：{text}</p>
            <Button variant="contained" color="success">
                <Link className="donation-receipt-link" to={{ pathname: '/'}}>
                    Homeへ戻る
                </Link>
            </Button>
        </div>
    );
}

export default Execute;