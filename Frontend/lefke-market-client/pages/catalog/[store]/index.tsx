import {useRouter} from "next/router"
import Catalog from "../../../src/components/common/catalog"

export default function Store() {
    const router = useRouter()
    const { store } = router.query

    return <>
        <Catalog
            context={'store'}
            store={typeof store === 'string' ? store : ''}
        />
    </>
}

export const getStaticProps = async ({ locale }: any) => {
    return {
        props: {
            ...(await (locale, ['common', 'footer']))
        }
    }
}

export const getStaticPaths = async (par: any) => {
    return {
        paths: [
            { params: { store: 'global' }},
            { params: { store: 'global' }},
        ],
        fallback: true,
    }
}


