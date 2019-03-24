import * as faceapi from 'face-api.js/dist/face-api';

class Recog {
    constructor(){
        // Load models here
        this.configure();
        
    }
    /**
     * 
     * @param {Array} urls Array of github profile photos to run recognition on.
     * @param {Function} counter Callback to run for each image proccessed.
     */
    detect(urls, counter){
        return new Promise(async (resolve, reject)=>{
            this.detectedUrls = [];
            for(let i = 0; i < urls.length; i++){
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