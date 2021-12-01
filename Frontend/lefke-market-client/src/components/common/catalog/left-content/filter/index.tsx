import React from 'react'
import {useSelector} from "react-redux"
import {getScreenType} from "../../../../../redux/states/settings/getters"
import {SCREEN_TYPE} from "../../../../../enums"
import FilterDesktop from "./desktop/filter-desktop"
import FilterMobile from "./mobile/filter-mobile"

interface IFilterProps {
    costInterval: any,
    setCostInterval: any
}

function Filter(props: IFilterProps) {

    const screenType = useSelector(getScreenType)

    return (
        <>
            { screenType === SCREEN_TYPE.DESKTOP ? <FilterDesktop {...props}/> : <FilterMobile {...props}/> }
        </>
    )
}

export default Filter
