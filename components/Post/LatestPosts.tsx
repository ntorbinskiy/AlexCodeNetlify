import {
  isPostADraft,
  isPostInTheFuture,
} from "helpers/checkOfDraftOrFuturePost";
import { PostDocumentWithoutContent } from "interfaces";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "redux/typesHooks";

import { resetTags, setTags } from "../../redux/slices/selectedTags";
interface Props {
  latestPosts: PostDocumentWithoutContent[];
}

const LatestPosts = ({ latestPosts }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="related-posts">
      <h2>Latest posts</h2>
      {latestPosts.map((post) => (
        <div className="related-posts-block" key={post.title}>
          <Link href={post.slug} className="image">
            <img
              src={
                `${post.featuredImage}?nf_resize=fit&w=102&h=102` ??
                "/post-images/draft.webp?nf_resize=fit&w=102&h=102"
              }
              alt="blog post image"
              style={{
                filter:
                  isPostADraft(post) || isPostInTheFuture(post)
                    ? "grayscale(50%)"
                    : "none",
              }}
            />
          </Link>
          <div className="inner">
            <Link href={post.slug} className="name">
              {post.title}
            </Link>
            <div className="tags">
              {post.tags.map((tag) => (
                <Link
                  href="/"
                  key={tag}
                  onClick={() => dispatch(setTags([tag]))}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Link href="/" className="btn" onClick={() => dispatch(resetTags())}>
        See all posts
      </Link>
    </div>
  );
};

export default LatestPosts;
