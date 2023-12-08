export class DirectMessage {
    receiverId: string;
    senderId: string;
    timestamp: number;
    message: string;
    emojis: string[];

    constructor(obj?: any) {
        this.receiverId = obj ? obj.userId : '';
        this.timestamp = obj ? obj.timestamp : 0;
        this.message = obj ? obj.message : '';
        this.senderId = obj ? obj.senderId : '';
        this.emojis = obj ? obj.emojis || [] : [];
    }

    public toJSON() {
        return {
            userId: this.receiverId,
            timestamp: this.timestamp,
            messageText: this.message,
            senderId: this.senderId,
            emojis: this.emojis,
        };
    }
}