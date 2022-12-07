import User from '../../../db/models/user.model';


export class ProfileDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;

    constructor(data: User) {
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.email = data.email;
        this.role = data.role;
    }
}