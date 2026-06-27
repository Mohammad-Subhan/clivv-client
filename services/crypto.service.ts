import { getSession } from "./session.service"

const IV_LENGTH = 12;
const ALGORITHM = "AES-GCM";

export const deriveKey = async (masterPassword: string, salt: string): Promise<CryptoKey> => {

    const passwordKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(masterPassword),
        "PBKDF2",
        false,
        ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: new TextEncoder().encode(salt),
            iterations: 100000,
            hash: "SHA-256"
        },
        passwordKey,
        {
            name: "AES-GCM",
            length: 256
        },
        false,
        ["encrypt", "decrypt"]
    );
};

const generateIV = (): Uint8Array<ArrayBuffer> => {
    return crypto.getRandomValues(
        new Uint8Array(IV_LENGTH)
    );
};

const encrypt = async (
    plainData: string,
    key: CryptoKey,
    iv: Uint8Array<ArrayBuffer>
): Promise<{ encryptedData: string }> => {
    const encodedData = new TextEncoder().encode(plainData);
    const encryptedData = await crypto.subtle.encrypt(
        { name: ALGORITHM, iv: iv },
        key,
        encodedData
    );

    return {
        encryptedData: Buffer.from(encryptedData).toString("base64"),
    }
}

const decrypt = async (
    encryptedData: string,
    iv: Uint8Array<ArrayBuffer>,
    key: CryptoKey
): Promise<string> => {
    try {
        const decodedData = await crypto.subtle.decrypt(
            { name: ALGORITHM, iv: iv },
            key,
            new Uint8Array(Buffer.from(encryptedData, "base64"))
        );

        return new TextDecoder().decode(decodedData);
    } catch (error) {
        throw new Error("Failed to decrypt data");
    }

}

export const encryptData = async (plainData: string): Promise<{ encryptedData: string, iv: string }> => {
    const encryptionKey = getSession();

    if (!encryptionKey) {
        throw new Error("Session expired");
    }

    const iv = generateIV();
    const { encryptedData } = await encrypt(plainData, encryptionKey, iv);

    return {
        encryptedData,
        iv: Buffer.from(iv).toString("base64")
    }
}

export const decryptData = async ({ iv, encryptedData }: { iv: string, encryptedData: string }): Promise<string> => {
    const encryptionKey = getSession();

    if (!encryptionKey) {
        throw new Error("Session expired");
    }

    return await decrypt(encryptedData, new Uint8Array(Buffer.from(iv, "base64")), encryptionKey);
}