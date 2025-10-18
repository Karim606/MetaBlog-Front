export interface StoredAuth{
accessToken:string;
expiresAt?: number; // epoch ms
user?: any;
}