import SignUpForm from '../../components/sign-up/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './Authentication.scss';

const Authentication = () => {
    //signin with google redirect
    // useEffect(() => {
    //     // const response = await getRedirectResult(auth);
    //     // console.log(response);
    //     const response = async () => {
    //         const data = await getRedirectResult(auth);
    //         console.log(data);
    //     }
    //     const callResponse = response();
    //     if(callResponse){
    //         const userDocRef = createUserDocumentFromAuth(response.user);
    //     }
    // }, [])

    return (
        <div className='authentication-container'>
            {/* <h1>Sign in page</h1> */}
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
}

export default Authentication;