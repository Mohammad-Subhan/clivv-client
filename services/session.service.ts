let masterPassword = "";
let salt = "";

export const setSession = ({ pass, saltValue }: { pass: string, saltValue: string }) => {
    masterPassword = pass;
    salt = saltValue;
}

export const getSession = () => {
    return { masterPassword, salt }
}

export const clearSession = () => {
    masterPassword = "";
    salt = "";
}