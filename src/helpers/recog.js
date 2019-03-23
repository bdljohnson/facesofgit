import * as faceapi from 'face-api.js/dist/face-api';

class Recog {
    constructor(){
        // Load models here
        this.configure();
    }
    detect(urls){
        console.log('Here with urls')
        return new Promise(async (resolve, reject)=>{
            console.log('Am I alive')
            this.detectedUrls = [];
            for(let i = 0; i < urls.length; i++){
                console.log('Inside promise loop')
                await new Promise((resolve, reject)=>{
                    this.image(urls[i], resolve)
                })
            }
            resolve(this.detectedUrls);
        })
    }
    async image(uri, resolve){
                let face = await faceapi.fetchImage(uri);
                let detected = await faceapi.detectSingleFace(face);
                console.log(detected);
                if(!!detected){
                    this.detectedUrls.push(uri)
                }
                resolve(detected);
        
    }
    async configure(){
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    }
}

export default Recog;