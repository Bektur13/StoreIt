"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { string } from "zod";
import { avatarPlaceholderUrl } from "@/constants";
import { parseStringify } from "../utils";


const getUserByEmail = async (email: string) => {
    const {database} = await createAdminClient();

    const result = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userTableId,
        [Query.equal("email", [email])],
    );

    return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
    console.log(error);
    throw error;
}

export const sendEmailOTP = async ({email}: {email: string}) => {
    const {account} = await createAdminClient();

    try {
        const session = await account.createEmailToken(ID.unique(), email);

        return session.userId;
    } catch(error) {
        handleError(error, "Failed to send email OTP");
    }
};

export const createAccount = async ({
    fullName, 
    email,
}: {
    fullName: string,
    email: string
}) => {
    const existingUser = await getUserByEmail(email);

    const accountId = await sendEmailOTP({ email });
    if(!accountId) throw new Error("Failed to send an OTP");

    if(!existingUser) {
        const { database } = await createAdminClient();

        await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userTableId,
            ID.unique(),
            {
                fullName,
                email,
                avatar: avatarPlaceholderUrl,
                accountId,
            },
        );
    }

    return parseStringify({accountId});
};

export const

// import { Query } from "node-appwrite";
// import { createAdminClient } from "../appwrite";
// import { appwriteConfig } from "../appwrite/config";

// const getUserByEmail =  async (email: string) => {
//     const { database } = await createAdminClient();
//     const result = database.listDocuments(
//         appwriteConfig.,
//         appwriteConfig.collectionsId,
//         [Query.equal('email', [email])]
//     );

//     return result.total > 0? (await result).documents[0] : null;
// };

// const createAccount = async ({fullName, email}: {fullName: string; email: string}) => {
//     const existingUser = await getUserByEmail();
// }