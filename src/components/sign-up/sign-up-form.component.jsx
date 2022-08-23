import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.scss';
import Button from '../button/button.component';

const defaultFormField = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formField, setFormField] = useState(defaultFormField);
    const {displayName, email, password, confirmPassword} = formField;

    console.log(formField);

    const resetFormField = () => {
        setFormField(defaultFormField);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        if(password !== confirmPassword) {
            alert("Password do not match");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormField();
        } catch(err) {
            if(err.code === 'auth/email-already-in-use'){
                alert('Cannot create user. Email already in use');
            }
            console.log(err.message);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        // ... only update the approriate field
        setFormField({...formField, [name]: value});
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" required type="text" onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password}/>

                <FormInput label="Confirm Password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                
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
                <Button type="submit">Sign up</Button> 
            </form>
        </div>
    );
}
export default SignUpForm;