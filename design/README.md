# Design reference

Raw export of the Claude Design project this app implements — kept for
reference only. **Not part of the build** (nothing here is imported by the app).

Source: Claude Design project
`43a4f33e-ebcc-4dc2-9a7d-a5285c528d83` — "Bay n' Basil E-commerce Redesign".

## Contents

- `Bay n Basil Landing.dc.html` — Landing page design → implemented at `/`
- `Bay n Basil Products.dc.html` — Products page design → implemented at `/products`
- `Cart.dc.html` — Cart/checkout drawer design → global cart drawer
- `Bay n Basil Landing-print.dc.html` — print variant of the landing page
- `image-slot.js`, `support.js`, `doc-page.js` — Claude Design canvas runtime
  helpers the design imports (reproduced/translated into React in the app;
  not used directly here)
- `uploads/` — screenshots/reference images used while designing
- `.thumbnail` — project thumbnail

The `.dc.html` files are Claude Design documents; open them in Claude Design (or
a browser with the runtime) to view. The implemented, production version lives
in `app/` and `src/`.
