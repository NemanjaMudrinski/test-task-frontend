import { AbstractEntity } from './abstractEntity';

export class User implements Entity<User> {

    id: number
    email: string;
    password: string;
    name: string;
}