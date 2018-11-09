// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-blog-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/src/templates/Blog.tsx")),
  "component---src-templates-all-category-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/src/templates/AllCategory.tsx")),
  "component---src-templates-category-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/src/templates/Category.tsx")),
  "component---src-templates-all-tag-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/src/templates/AllTag.tsx")),
  "component---src-templates-tag-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/src/templates/Tag.tsx")),
  "component---src-templates-post-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/src/templates/Post.tsx")),
  "component---cache-dev-404-page-js": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/.cache/dev-404-page.js")),
  "component---src-pages-404-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/src/pages/404.tsx")),
  "component---src-pages-contact-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/src/pages/contact.tsx")),
  "component---src-pages-index-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/client/src/pages/index.tsx"))
}

