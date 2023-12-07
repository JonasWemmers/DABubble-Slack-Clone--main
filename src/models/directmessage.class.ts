export class DirectMessage {
    userId: string;
    timestamp: number;
    message: string;
    senderId: string;
    emojis: string[];

    constructor(obj?: any) {
        this.userId = obj ? obj.userId : '';
        this.timestamp = obj ? obj.timestamp : 0;
        this.message = obj ? obj.message : '';
        this.senderId = obj ? obj.senderId : '';
        this.emojis = obj ? obj.emojis || [] : [];
    }

    public toJSON() {
        return {
            userId: this.userId,
            timestamp: this.timestamp,
            messageText: this.message,
            senderId: this.senderId,
            emojis: this.emojis,
        };
    }
}