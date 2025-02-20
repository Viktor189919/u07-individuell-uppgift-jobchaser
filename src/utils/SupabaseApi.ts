import { createClient } from "@supabase/supabase-js";
import { FormInputs } from "@/types/formTypes"
// import { User } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export async function signup(newUser : FormInputs) {
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

export async function signin(user : FormInputs) : Promise<string | undefined> {
    console.log("From supabase sign in function", user.email, user.password)
    const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
    });
    if (error) {
        throw new Error("Error signing in, please try again", error);
    } 

    if (data.user.id) {
        return data.user.id
    }
};

export async function signout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error("Error signing out", error);
    }

    return;
}

export async function getUserData(userId : string) {
    const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userId);

    if (error) {
        throw new Error(error.message)
    }

    if (data) {
        return data[0].name;
    }
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
        throw new Error("Error fetching session")
        return
    }

    if (data.session?.access_token) {
        return data.session.access_token
    }
}
