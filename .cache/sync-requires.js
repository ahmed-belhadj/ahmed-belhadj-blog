// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-blog-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/src/templates/Blog.tsx")),
  "component---src-templates-all-category-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/src/templates/AllCategory.tsx")),
  "component---src-templates-category-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/src/templates/Category.tsx")),
  "component---src-templates-all-tag-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/src/templates/AllTag.tsx")),
  "component---src-templates-tag-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/src/templates/Tag.tsx")),
  "component---src-templates-post-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/src/templates/Post.tsx")),
  "component---cache-dev-404-page-js": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/.cache/dev-404-page.js")),
  "component---src-pages-404-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/src/pages/404.tsx")),
  "component---src-pages-contact-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/src/pages/contact.tsx")),
  "component---src-pages-index-tsx": preferDefault(require("/Users/ahmedbelhadj/Documents/GitHub/ahmed-belhadj-blog/src/pages/index.tsx"))
}

