import React from 'react';
import { IPost } from '../../interfaces';

interface Props {
  latestPosts: IPost[];
}

export default function LatestPostsSection({ latestPosts }: Props) {
  return (
    <section>
      <h1>Latest Community Posts</h1>

      {latestPosts.map((post) => {
        return (
          <div>
            {post.title}
            {post.approvedAt}
            {post.authorName}
          </div>
        );
      })}
    </section>
  );
}
