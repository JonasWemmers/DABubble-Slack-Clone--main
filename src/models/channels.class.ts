export class Channels {
    message: string;
    timestamp: number;
    userSend: string;
    emoji_confirm: boolean;
    emoji_handsUp: boolean;
    emoji_rocked: boolean;
    emoji_smile: boolean;
    id: string;

    constructor(obj?: any) {

        this.message = obj ? obj.message : '';
        this.timestamp = obj ? obj.timestamp : 0;
        this.userSend = obj ? obj.userSend : '';
        this.emoji_confirm = obj ? obj.emoji_confirm || false : false;
        this.emoji_handsUp = obj ? obj.emoji_handsUp || false : false;
        this.emoji_rocked = obj ? obj.emoji_rocked || false : false;
        this.emoji_smile = obj ? obj.emoji_smile || false : false;
        this.id = obj ? obj.id : '';
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
        };
    }
}