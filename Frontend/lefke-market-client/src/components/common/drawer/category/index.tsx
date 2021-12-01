import {getScreenType} from "../../../../redux/states/settings/getters"
import {SCREEN_TYPE} from "../../../../enums"
import {useSelector} from "react-redux"
import DesktopCategoryDrawer from "./desktop-drawer"
import MobileCategoryDrawer from "./mobile-drawer"

interface ICategoryDrawer {
    storeName: string,
}

export default function CategoryDrawer({storeName = 'global'}: ICategoryDrawer) {

    const screenType = useSelector(getScreenType)

    return (<>
            { screenType === SCREEN_TYPE.DESKTOP ?
                    <DesktopCategoryDrawer storeName={storeName}/> :
                    <MobileCategoryDrawer storeName={storeName}/>
            }
        </>
    )
}
