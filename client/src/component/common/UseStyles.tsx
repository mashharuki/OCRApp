/**
 * 共通のスタイルを定義するコンポーネント
 */

import { makeStyles } from "@material-ui/core";

/**
 * UseStylesコンポーネント
 */
const UseStyles:any = makeStyles((theme:any) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        display: 'table-cell'
    },
    root: {
        flexGrow: 1
    },
    navLink: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    inputFileBtnHide: {
        opacity: 0,
        appearance: 'none',
        position: 'absolute'
    },
}));

export default UseStyles