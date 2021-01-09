export interface IPost {
    postid: number;
    userid: number;
    content: string;
    title: string;
    tagids: number[];
}
export interface ITags {
    tagid: number;
    name: string;
}
export interface ITagBox {
    tagid: number;
    name: string;
    active: boolean;
}
export interface IUser {
    userid: number;
    accountid: number;
    profiledescription: string;
    phone: string;
    email: string;
}
export interface IUserPOST {
    profileDescription: string,
    visibleName: string,
    telephone: string,
    contactEmail: string,
    tagIDs: number[]
}
export interface IPostPOST {
    content: string,
    title: string,
    tagids: number[]
}
export interface ILoginPOST {
    username: string,
    password: string
}