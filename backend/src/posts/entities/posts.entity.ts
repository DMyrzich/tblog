import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, ManyToMany, RelationId, JoinColumn, OneToMany } from 'typeorm';
import { OutputBlockData } from "../dto/create-post.dto";
import { UsersEntity } from '../../users/entities/users.entity';
import { CommentsEntity } from 'src/comments/entities/comments.entity';

@Entity()
export class PostsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'jsonb' })
    body: OutputBlockData[];

    @Column()
    description: string;

    @Column({ nullable: true })
    tags?: string;

    @Column({ default: 0 })
    views: number;

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;

    @ManyToOne(() => UsersEntity, { nullable: false })
    author: UsersEntity;

    @OneToMany(() => CommentsEntity, ({ post }) => post, { nullable: false })
    comments: CommentsEntity[];
}
