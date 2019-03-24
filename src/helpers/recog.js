import * as faceapi from 'face-api.js/dist/face-api';

class Recog {
    constructor(){
        // Load models here
        this.configure();
        
    }
    detect(urls, counter){
        console.log('Here with urls')
        return new Promise(async (resolve, reject)=>{
            console.log('Am I alive')
            this.detectedUrls = [];
            for(let i = 0; i < urls.length; i++){
                console.log('Inside promise loop')
                await new Promise((resolve, reject)=>{
                    this.image(urls[i], resolve, counter)
                })
            }
            resolve(this.detectedUrls);
        })
    }
    async image(uri, resolve, counter){
                let face = await faceapi.fetchImage(uri);
                let detected = await faceapi.detectSingleFace(face, this.options);
                console.log(detected);
                if(!!detected){
                    this.detectedUrls.push(uri)
                }
                counter();
                resolve(detected);
        
    }
    async configure(){
        await faceapi.loadTinyFaceDetectorModel('/models')
        this.options = new faceapi.TinyFaceDetectorOptions();
    }
}

export default Recog;