export class Message {
    message: string;
    timestamp: number;
    userSend: string;
    emoji_confirm: number;
    emoji_handsUp: number;
    emoji_rocked: number;
    emoji_smile: number;
    answers: [];

    constructor(obj?: any) {
        this.message = obj ? obj.message : '';
        this.timestamp = obj ? obj.timestamp : 0;
        this.userSend = obj ? obj.userSend : '';
        this.emoji_confirm = obj ? obj.emoji_confirm || 0 : 0;
        this.emoji_handsUp = obj ? obj.emoji_handsUp || 0 : 0;
        this.emoji_rocked = obj ? obj.emoji_rocked || 0 : 0;
        this.emoji_smile = obj ? obj.emoji_smile || 0 : 0;
        this.answers = obj ? obj.answers : [];
    }

    public toJSON() {
        return {
            message: this.message,
            timestamp: this.timestamp,
            userSend: this.userSend,
            emoji_confirm: this.emoji_confirm,
            emoji_handsUp: this.emoji_handsUp,
            emoji_rocked: this.emoji_rocked,
            emoji_smile: this.emoji_smile,
            answers: this.answers,
        };
    }
}