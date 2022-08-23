import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase.utils.js";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.scss';
import Button from '../button/button.component';

const defaultFormField = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const {email, password} = formField;

    const resetFormField = () => {
        setFormField(defaultFormField);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormField();
        } catch(err) {
            switch(err.code){
                case 'auth/wrong-password':
                    alert ('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('No user found');
                    break;
                default:
                    console.log(err.message)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        // ... only update the approriate field
        setFormField({...formField, [name]: value});
    }
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password}/>
                
                {/* <FormInput 
                    label="Confirm Password" 
                    inputOptions={{
                        required: true,
                        type: "password",
                        onChange: handleChange,
                        name: "confirmPassword",
                        value: confirmPassword
                    }}
                /> */}
                <div className="buttons-container">
                    <Button type="submit">Sign in</Button> 
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign in</Button> 
                </div>
            </form>
        </div>
    );
}
export default SignInForm;