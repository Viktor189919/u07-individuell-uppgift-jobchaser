import { createClient } from "@supabase/supabase-js";
import { FormInputs } from "@/types/formTypes"
// import { User } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const signup = async (newUser : FormInputs) => {
    const { data, error } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
    });

    if (error) {
        throw new Error("Error signin up, please try again", error)
    }

    if (data.user) {
        const { error: profileError } = await supabase
            .from("profiles")
            .insert([{id: data.user.id, name: newUser.name}])

        if (profileError) {
            throw new Error("Error setting up profile", profileError)
        }
    }

    
};

export const signin = async (user : FormInputs) => {
    console.log("From supabase sign in function", user.email, user.password)
    const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
    });
    if (error) {
        throw new Error("Error signing in, please try again", error);
    } 

    if (data.user) {
        try {
            const userName = getUserData(data.user.id);  
            return userName;
        } catch (error) {
            console.error("Error fetching user data", error)
            return
        }
        
    }

};

export const signout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error("Error signing out", error);
    }

    return;
}

export const getUserData = async (userId : string) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userId);

    if (error) {
        throw new Error(error.message)
    }

    if (data) {
        return data;
    }
}