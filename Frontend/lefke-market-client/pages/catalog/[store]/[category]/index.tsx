import {useRouter} from "next/router"
import Catalog from "../../../../src/components/common/catalog"

export default function Category() {
    const router = useRouter()
    const { store, category } = router.query

    return <>
        <Catalog
            context={'category'}
            store={typeof store === 'string' ? store : ''}
            category={typeof category === 'string' ? category : ''}
        />
    </>
}
