import ResultsContent from "../../src/components/pages/resuts"
import {useRouter} from "next/router"

export default function SearchText() {
    const router = useRouter()

    return <>
        <ResultsContent
            // @ts-ignore
            searchText={router.query.searchText}
        />
    </>
}
