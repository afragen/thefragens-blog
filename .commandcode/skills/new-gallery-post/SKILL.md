---
name: new-gallery-post
description: "Create a new draft gallery blog post with an images directory. Usage: /new-gallery-post Post Title Here"
allowed-tools: Bash(node new-post.mjs *)
argument-hint: Post title
---

Create a new draft gallery blog post by running:

```
node new-post.mjs --gallery "$ARGUMENTS"
```

Report the file path and images directory that were created.
