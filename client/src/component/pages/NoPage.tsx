/**
 * 存在しないパスにアクセスしたときのコンポーネント
 */
import { ReactElement } from "react";
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';

/**
 * NoPageコンポーネント
 */
 function NoPage():ReactElement {
    return (
        <div className="App">
            <p>存在しないページです！</p>
            <br/><br/>
            <Button variant="contained" color="success">
                <Link className="donation-receipt-link" to={{ pathname: '/'}}>
                    Homeへ戻る
                </Link>
            </Button>
        </div>
    );
}

export default NoPage;