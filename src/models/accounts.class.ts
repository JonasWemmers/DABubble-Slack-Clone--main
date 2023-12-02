import { DirectMessage } from "./directmessage.class";

export class Accounts {
    name: string;
    email: string;
    password: string;
    channel: string[];
    profilpicture: string;
    uid: string;
    directMessages: { [userId: string]: DirectMessage[] };

    constructor(obj?:any) {
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.channel = obj ? obj.channel || [] : [];
        this.profilpicture = obj ? obj.profilpicture : '';
        this.uid = obj ? obj.uid : '';
        this.directMessages = obj ? obj.directMessages || {} : {};
    }

    public toJSON() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            channel: this.channel,
            profilpicture: this.profilpicture,
            uid: this.uid,
            directMessages: this.directMessages,
        };
    }
}