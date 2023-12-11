export class DirectMessage {
    receiverId: string;
    senderId: string;
    timestamp: number;
    message: string;
    emojis: string[];
    messageId: string;

    constructor(obj?: any) {
        this.receiverId = obj ? obj.receiverId : '';
        this.timestamp = obj ? obj.timestamp : 0;
        this.message = obj ? obj.message : '';
        this.senderId = obj ? obj.senderId : '';
        this.emojis = obj ? obj.emojis || [] : [];
        this.messageId = obj ? obj.messageId : '';
    }

    public toJSON() {
        return {
            receiverId: this.receiverId,
            timestamp: this.timestamp,
            message: this.message,
            senderId: this.senderId,
            emojis: this.emojis,
            messageId: this.messageId,
        };
    }

    static fromJSON(obj: any): DirectMessage {
        return new DirectMessage({
            receiverId: obj.receiverId,
            timestamp: obj.timestamp,
            message: obj.message,
            senderId: obj.senderId,
            emojis: obj.emojis,
            messageId: obj.messageId,
          });
    }
}