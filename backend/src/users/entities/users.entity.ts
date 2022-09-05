import { PostsEntity } from "src/posts/entities/posts.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { CommentsEntity } from '../../comments/entities/comments.entity';

@Entity()
export class UsersEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({ default: 'https://i.ya-webdesign.com/images/placeholder-image-png-19.png' })
    avatarUrl: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAlt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAlt: Date

    @Column({ default: 0 })
    followersCount: number;

    @ManyToMany(() => UsersEntity, ({ followers }) => followers, { nullable: false, cascade: ['soft-remove'] })
    @JoinTable({ name: 'followers_entity', joinColumn: { name: "userId" }, inverseJoinColumn: { name: "followerId" } })
    followers: UsersEntity[]

    @ManyToMany(() => CommentsEntity, ({ listLike }) => { listLike }, { nullable: false })
    @JoinTable({ name: 'list_like_comment_entity', joinColumn: { name: "userId" }, inverseJoinColumn: { name: "commentId" } })
    listLike: CommentsEntity[]

    @OneToMany(() => PostsEntity, ({ author }) => author, { nullable: false })
    posts: PostsEntity[]

    addFollower(user: UsersEntity) {

        this.followers.push(user);
    }

    deleteFollower(idx: number) {

        this.followers.splice(idx, 1);
    }

    findFollower(userId: number) {

        const idx = this.followers.findIndex(el => el.id == userId);
        return { idx, isFollower: idx != -1 }
    }

    getIsFollower(idx: number) {
        if (!idx) return false;
        const idFollow = this.followers.find(el => el.id == idx);
        if (idFollow) {
            return true
        }
        return false
    }
}
