import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <ul>
    <li>
      <Link to={post.frontmatter.path} className="post-link">
        {post.frontmatter.title}
      </Link>
    </li>
  </ul>
)
export default PostLink
