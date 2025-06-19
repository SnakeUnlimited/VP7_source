/// <reference types="vite/client" />

// Fix für TS7016 
// https://www.perplexity.ai/search/error-ts7016-could-not-find-a-eh03N0.JSCeeFhuT8NnCnA
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}