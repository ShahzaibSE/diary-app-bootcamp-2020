export default function swDev(){
    let sw = `${process.env.PUBLIC_URL}/sw.js`; 
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(sw).then(result=>{
            console.log("Registered service worker", result)
        })
    }else {
        console.log("Service worker not found.")
    }
}