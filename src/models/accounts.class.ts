import { DirectMessage } from "./directmessage.class";

export class Accounts {
    name: string;
    email: string;
    password: string;
    channel: string[];
    profilpicture: string;
    id: string;
    directMessages: { [userId: string]: DirectMessage[] };

    constructor(obj?:any) {
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.channel = obj ? obj.channel || [] : [];
        this.profilpicture = obj ? obj.profilpicture : '';
        this.id = obj ? obj.id : '';
        this.directMessages = obj ? obj.directMessages || {} : {};
    }

    public toJSON() {
        return {
            name: this.name,
            email: this.email,
            password: this.password,
            channel: this.channel,
            profilpicture: this.profilpicture,
            directMessages: this.directMessages,
        };
    }
}