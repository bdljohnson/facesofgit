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
    detect(urls, counter, hitcounter, updateUrls){
        for(let i = 0; i < urls.length; i++){
                this.image(urls[i], counter, hitcounter, updateUrls)
        }
    }
    async image(uri, counter, hitcounter, updateUrls){
                let face = await faceapi.fetchImage(uri);
                let detected = await faceapi.detectSingleFace(face, this.options);
                console.log(detected);
                if(!!detected){
                    updateUrls(uri);
                    hitcounter();
                }
                counter();
        
    }
    async configure(){
        await faceapi.loadTinyFaceDetectorModel('/models')
        this.options = new faceapi.TinyFaceDetectorOptions({minConfidence: 0.3});
    }
}

export default Recog;