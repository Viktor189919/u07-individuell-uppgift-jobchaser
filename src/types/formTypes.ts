export interface FormProps {
    isSignup : boolean;
    authUser : (userInfo : FormInputs) => void;
}

export interface FormInputs {
    name? : string;
    email : string;
    password : string;
}


