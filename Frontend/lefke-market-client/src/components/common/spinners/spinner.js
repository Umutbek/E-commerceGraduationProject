import {CircularProgress} from "@mui/material"
import {COLOR} from "../../../enums"

export default function Spinner(){
    return <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress style={{ color: COLOR.MAIN }}/>
    </div>
}

export const FullContentSpinner = () => {
    return <div style={{ width: '100%', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress style={{ color: COLOR.MAIN }}/>
    </div>
}
