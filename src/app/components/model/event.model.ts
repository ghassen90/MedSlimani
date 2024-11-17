import { Time } from "@angular/common";

export interface EventModel{
    id_event?: number;
	titre?: any;
	description?: any;
    time?:Date;
	imageFile?: any;
    id_maisonjeunes?:any;
    id_user?:any;
}