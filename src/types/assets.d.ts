declare module "*.lottie" {
  const src: string;
  export default src;
}

// Side-effect imports of global stylesheets (e.g. `import "./globals.css"`).
// Without this, the TS language server flags ts(2882): "Cannot find module
// or type declarations for side-effect import".
declare module "*.css";
declare module "*.scss";

