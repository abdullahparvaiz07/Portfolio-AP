export {};

declare module "*.jsx" {
  const content: any;
  export default content;
}

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    ScrollSmoother: any;
    ScrollToPlugin: any;
    SplitText: any;
    chroma: any;
  }
}
