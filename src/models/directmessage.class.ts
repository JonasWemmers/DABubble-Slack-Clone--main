export class DirectMessage {
    userId: string;
    message: string;
    senderId: string;
    emojis: string[];

    constructor(obj?: any) {
        this.userId = obj ? obj.userId : '';
        this.message = obj ? obj.message : '';
        this.senderId = obj ? obj.senderId : '';
        this.emojis = obj ? obj.emojis || [] : [];
    }

    public toJSON() {
        return {
            userId: this.userId,
            messageText: this.message,
            senderId: this.senderId,
            emojis: this.emojis,
        };
    }
}