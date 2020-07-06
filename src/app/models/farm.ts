import { User } from './user';

export class Farm implements Entity<Farm> {
    id: number;
    farmName: string
    user: User;

    constructor(){

    }
}