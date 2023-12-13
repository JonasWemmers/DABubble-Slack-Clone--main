import { DirectMessage } from "./directmessage.class";

export class Accounts {
    name: string;
    email: string;
    password: string;
    channel: string[];
    profilepicture: string;
    uid: string;
    chats: [];

    constructor(obj?:any) {
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.channel = obj ? obj.channel || [] : [];
        this.profilepicture = obj ? obj.profilepicture : '';
        this.uid = obj ? obj.uid : '';
        this.chats = obj ? obj.chats || []: [];
    }

    public toJSON() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            channel: this.channel,
            profilepicture: this.profilepicture,
            uid: this.uid,
            chats: this.chats,
        };
    }
}