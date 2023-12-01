export class DirectMessage {
    userId: string;
    messageText: string;
    senderId: string;
    emojis: string[];
  
    constructor(obj?: any) {
      this.userId = obj ? obj.userId : '';
      this.messageText = obj ? obj.messageText : '';
      this.senderId = obj ? obj.senderId : '';
      this.emojis = obj ? obj.emojis || [] : [];
    }
  
    public toJSON() {
      return {
        userId: this.userId,
        messageText: this.messageText,
        senderId: this.senderId,
        emojis: this.emojis,
      };
    }
  }