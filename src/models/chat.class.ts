export class Chats {
    chatId: string;
    messages: {};


    constructor(obj?: any) {
        this.chatId = obj ? obj.timestamp : '';
        this.messages = obj ? obj.messages || {} : {};
    }

    public toJSON() {
        return {
            chatId: this.chatId,
            messages: this.messages,
        }
    }
}