
import ProfileContent from "../../src/components/common/profile/profile-content"
import withAuth from "../../src/components/common/auth/with-auth-hoc/with-auth"

function ProfilePage(){

    return <div style={{ minHeight: '80vh', paddingTop: 120 }}>
        <ProfileContent/>
    </div>
}

export const getStaticProps = async (params: any) => ({
    props: {
        ...(await (params.locale, ['common', 'footer']))
    }
})

export default withAuth(ProfilePage)
