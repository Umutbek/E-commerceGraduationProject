import {useRouter} from "next/router"
import Catalog from "../../../../../src/components/common/catalog"

export default function SubCategory() {
    const router = useRouter()
    const { store, category, subCategory } = router.query

    return <>
        <Catalog
            context={'subCategory'}
            store={typeof store === 'string' ? store : ''}
            category={typeof category === 'string' ? category : ''}
            subCategory={typeof subCategory === 'string' ? subCategory : ''}
        />
    </>
}
