export interface IUser {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    mobileNumber?: string;
    token: string;
    passwordFlag: number;
    emailVerify: number;
    googleAuth: number;
    facebookAuth: number;
    role: string; 
}
