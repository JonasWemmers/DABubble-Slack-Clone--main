export class Message {
    message: string;
    timestamp: number;
    userSend: string;
    emojisByUser: { [userId: string]: { confirm: number; handsUp: number; rocket: number; nerd: number } };
    answers: any[];

    constructor(obj?: any) {
        this.message = obj ? obj.message : '';
        this.timestamp = obj ? obj.timestamp : 0;
        this.userSend = obj ? obj.userSend : '';
        this.emojisByUser = obj ? obj.emojisByUser || {} : {};
        this.answers = obj ? obj.answers || [] : [];
    }

    public toJSON() {
        return {
            message: this.message,
            timestamp: this.timestamp,
            userSend: this.userSend,
            emojisByUser: this.emojisByUser,
            answers: this.answers,
        };
    }
}