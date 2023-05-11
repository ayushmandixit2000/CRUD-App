import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('feed_comment')
export class FeedCommentEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column( {default: 0})
    postid: number;

    @Column( {default: ''})
    text: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}