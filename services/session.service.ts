import { deriveKey } from "./crypto.service";

let encryptionKey: CryptoKey | null = null;

export const setSession = async ({ pass, saltValue }: { pass: string, saltValue: string }) => {
    const key = await deriveKey(pass, saltValue);
    encryptionKey = key;
}

export const getSession = () => {
    return encryptionKey;
}

export const clearSession = () => {
    encryptionKey = null;
}