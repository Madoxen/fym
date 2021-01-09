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
export interface IUser{
    userid: number;
    accountid: number;
    profiledescription: string;
    phone: string;
    email: string;
    tagids: number[];
}