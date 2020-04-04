export const delay = () => 
  process.env.NODE_ENV === 'test'
  ? {}
  : new Promise(res => setTimeout(res, 1000))