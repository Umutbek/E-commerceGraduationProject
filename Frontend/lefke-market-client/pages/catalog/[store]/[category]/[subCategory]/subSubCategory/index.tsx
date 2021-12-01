import {useRouter} from "next/router"
import Catalog from "../../../../../../src/components/common/catalog"

export default function SubSubCategory() {
    const router = useRouter()
    const { store, category, subCategory, subSubCategory } = router.query

    return <>
        <Catalog
            context={'subSubCategory'}
            store={typeof store === 'string' ? store : ''}
            category={typeof category === 'string' ? category : ''}
            subCategory={typeof subCategory === 'string' ? subCategory : ''}
            subSubCategory={typeof subSubCategory === 'string' ? subSubCategory : ''}
        />
    </>
}
