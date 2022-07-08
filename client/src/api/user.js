export const login = async ({email, password} = {}) => {
    const user = {email, password};
    try {
        const res = await fetch('http://localhost:3001/api/v1/users/login', {
            method: 'POST',
            /*credentials: "include",*/
            headers: {
                Accept: 'application/json',
                "content-type": 'application/json'
            },
            body: JSON.stringify(user)

        });

        return await res.json();
    } catch(err) {
        throw new Error(err);
    }
}

export const logout = () => {
    console.log("do the logout");
    const res = {};
    res.message = "fake logout message";
    return res;
}

export const register = async ({email, password, passwordConfirmation} = {}) => {
    const user = {email, password, passwordConfirmation};
    try {
        const res = await fetch('http://localhost:3001/api/v1/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "content-type": 'application/json'
            },
            body: JSON.stringify(user),
            credentials: "include"

        });

        return await res.json();
    } catch(err) {
        throw new Error(err);
    }
}

export const forgotPassword = async ({email} = {}) => {
    const user = {email};
    try {
        const res = await fetch('http://localhost:3001/api/v1/users/forgotpassword', {
            method: 'POST',
            /*credentials: "include",*/
            headers: {
                Accept: 'application/json',
                "content-type": 'application/json'
            },
            body: JSON.stringify(user)

        });

        return await res.json();
    } catch(err) {
        throw new Error(err);
    }
}

export const resetPassword = async ({token, password, passwordConfirmation} = {}) => {
    const user = {password, passwordConfirmation};
    
    try {
        const res = await fetch(`http://localhost:3001/api/v1/users/resetpassword/${token}`, {
            method: 'POST',
            /*credentials: "include",*/
            headers: {
                Accept: 'application/json',
                "content-type": 'application/json'
            },
            body: JSON.stringify(user)

        });

        return await res.json();
    } catch(err) {
        throw new Error(err);
    }
}