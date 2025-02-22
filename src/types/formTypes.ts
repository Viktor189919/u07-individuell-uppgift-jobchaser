export type FormProps = {
    isSignup : boolean;
    authUser : (userInfo : FormInputs) => void;
}

export type FormInputs = {
    name? : string;
    email : string;
    password : string;
    error: {
        message: string;
    }
}


