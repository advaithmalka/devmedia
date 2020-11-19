export interface CardProps {
  img?: string;
	id: string;
	date: string | number;
	description: string;
	postUser?: string;
	title: string;
	date2?: string;
	commentCount?: number;
	likeCount?: number;
	noLikes?: boolean;
	styles?: string;
	noComments?: boolean;
	deletable?: boolean;
	deletePost?: any;
	likeData?: {
		username: string;
		dateCreated: string;
		id: string | number;
	};
	noLinks?: boolean;
}