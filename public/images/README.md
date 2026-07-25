# Images

Drop real photos here and they appear automatically — no code changes.
Until a file exists, a styled placeholder (with a caption) is shown instead.

## Where each image goes

| File | Shows up on |
| --- | --- |
| `hero-pouch.jpg` | Landing hero pouch shot |
| `story.jpg` | Landing "Our story" image |
| `products/<slug>.jpg` | Product cards, carousel & quick-view |

The product `<slug>` and filename come from `src/content/products.ts`
(the `image` field of each product). For example, the "Red Chilli" product
has `image: "red-chilli.jpg"`, so its photo goes at
`public/images/products/red-chilli.jpg`.

Any web image format works (`.jpg`, `.png`, `.webp`); just keep the filename
matching the `image` value in the content file. Landscape/portrait both fine —
images are cropped to fill (object-fit: cover).
