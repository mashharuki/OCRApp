/**
 * 画面毎のルーティングを制御するためのコンポーネントファイル
 */

import React from 'react';
import { Route } from 'react-router-dom';
import nprogress, { render } from 'nprogress';
import 'nprogress/nprogress.css';
// プログレスバーの設定
nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 })

/**
 * Routersコンポーネント
 */
class Routers extends React.Component {

    /**
     * コンストラクター
     * @param props Routeコンポーネント用の引数
     */
    constructor(props: any) {
        super(props)
        nprogress.start()
    }

    // 表示が終わったタイミングで実行される。
    componentDidMount() {
        nprogress.done()
    }

   render() {
        return <Route {...this.props} />
   }
}

export default Routers;