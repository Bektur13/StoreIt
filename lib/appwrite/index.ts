import { Client } from 'node-appwrite';
import { appwriteConfig } from './config';

const createSessionClient = async () => {
const client = new Client()
.setEndpoint(appwriteConfig.endPointUrl)
.setProject(appwriteConfig.projectId);
}