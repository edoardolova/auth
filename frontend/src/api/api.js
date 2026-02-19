const baseUrl = "http://localhost:5500";

export async function login({ username, password }) {

    return fetch(`${baseUrl}/auth/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({username, password})
    })
    .then(res => res.json());
}

export async function signUp(signUpData) {

    return fetch(`${baseUrl}/auth/signUp`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(signUpData)
    })
    .then(res => res.json());
}

export async function logout(token){
        return fetch(`${baseUrl}/auth/logout`, {
        method: "POST",

        headers: {
            "Authorization": token
        },

    })
    .then(res => res.json());
}

export async function getProfile(token){

    const res = await fetch(`${baseUrl}/profile`, {
        headers: {
            Authorization: token
        }
    });

    if (res.status === 401) {
        throw new Error("SESSION_EXPIRED");
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.mess);
    }

    return data;
}





