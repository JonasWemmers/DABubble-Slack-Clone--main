import { DirectMessage } from "./directmessage.class";

export class Accounts {
    name: string;
    email: string;
    password: string;
    channel: string[];
    profilepicture: string;
    uid: string;
    directMessages: { [userId: string]: DirectMessage[] };

    constructor(obj?:any) {
        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.channel = obj ? obj.channel || [] : [];
        this.profilepicture = obj ? obj.profilepicture : '';
        this.uid = obj ? obj.uid : '';
        this.directMessages = obj ? obj.directMessages || {} : {};
    }

    public toJSON() {
        const directMessagesJSON: { [userId: string]: any[] } = {};
        for (const userId in this.directMessages) {
          directMessagesJSON[userId] = this.directMessages[userId].map((message: DirectMessage) => {
            console.log('DirectMessage before toJSON:', message);
            if (message && typeof message.toJSON === 'function') {
              return message.toJSON();
            } else {
              // Handle the case where message.toJSON is not a function
              return message;
            }
          });
        }

        return {
            name: this.name,
            email: this.email,
            password: this.password,
            channel: this.channel,
            profilepicture: this.profilepicture,
            uid: this.uid,
            directMessages: this.directMessages,
        };
    }
}