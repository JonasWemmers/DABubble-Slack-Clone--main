export class DirectMessage {
    messageId: string;
    senderId: string;
    timestamp: number;
    message: string;
    emojis: string[];

    constructor(obj?: any) {
        this.timestamp = obj ? obj.timestamp : 0;
        this.message = obj ? obj.message : '';
        this.senderId = obj ? obj.senderId : '';
        this.emojis = obj ? obj.emojis || [] : [];
        this.messageId = obj ? obj.messageId : '';
    }

    public toJSON() {
        return {
            timestamp: this.timestamp,
            message: this.message,
            senderId: this.senderId,
            emojis: this.emojis,
            messageId: this.messageId
        };
    }
}