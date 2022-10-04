import '../styles/globals.css'
import { useEffect } from 'react'
import { Firebase } from '../services/firebase'; // Firebase SDKs


function AYRSPortfolio({ Component, pageProps }) {
  
  useEffect(() => {
    //Activación del Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/PWAYRSPortfoliosw.js")
      .then((registered)=>{
        // console.log("SW registered scope: ", registered.scope)
      })
      .catch((err)=>{
        // console.log('SW NOT registered error', err, err.message)
      })
    }
    // window.addEventListener("load", async function () {
    // }
  }, [])
  
  return(
    <Component {...pageProps} />
  ) 
}

export default AYRSPortfolio