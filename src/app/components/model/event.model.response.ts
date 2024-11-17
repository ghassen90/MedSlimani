export interface EventResponseModel{
    likeNumber: any;
    userCommentNumber: any;
    id_event?: any;
    titre?: any;
    description?: any;
    time?: any;
    image?: any;
    nameMaisonjeunes?: any;
    userComments?: UserCommentModel[];
    userLikes?: any;
    usercommentsCount?: any;
}

export interface UserCommentModel{
    id_userComment?: any;
    description?: any;
    time?: any;
    nameUser?: any;
}