export class Accounts {
    name: string;
    lastName: string;
    email: string;
    password: string;
    channel: string[];
    profilpicture: File;
    id: string;

    constructor(obj?:any) {

        this.name = obj ? obj.name : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.password = obj ? obj.password : '';
        this.channel = obj ? obj.channel || [] : [];
        this.profilpicture = obj ? obj.profilpicture : null;
        this.id = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            channel: this.channel,
            profilpicture: this.profilpicture,
        };
    }
}