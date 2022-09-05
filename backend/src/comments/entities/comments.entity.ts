import { UsersEntity } from "src/users/entities/users.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { PostsEntity } from '../../posts/entities/posts.entity';

@Entity()
export class CommentsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ default: 0 })
    likeCount: number;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updateAt: Date;

    @ManyToOne(() => UsersEntity, { nullable: false })
    user: UsersEntity

    @ManyToMany(() => UsersEntity, { nullable: false })
    @JoinTable({ name: 'list_like_comment_entity', joinColumn: { name: "commentId" }, inverseJoinColumn: { name: "userId", } })
    listLike: UsersEntity[]

    @ManyToOne(() => PostsEntity, ({ comments }) => comments, { nullable: false })
    post: PostsEntity

}
