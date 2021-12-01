import React from 'react'
import {useSelector} from "react-redux"
import {getScreenType} from "../../../../../redux/states/settings/getters"
import SortingDesktop from "./sorting-desktop"
import SortingMobile from "./sorting-mobile"
import {SCREEN_TYPE} from "../../../../../enums"

interface ISortingProps {
    ordering: string,
    onSelectOrder: (ordering: string) => void
}


function Sorting({ ordering, onSelectOrder }: ISortingProps) {

    const screenType = useSelector(getScreenType)

    return (
        <>
            {
                screenType === SCREEN_TYPE.DESKTOP ?
                    <SortingDesktop ordering={ordering} onSelectOrder={onSelectOrder}/> :
                    <SortingMobile ordering={ordering} onSelectOrder={onSelectOrder}/>
            }
        </>
    )
}

export default Sorting
