class DropBoxController{

    constructor(){
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snakeBarEL = document.querySelector('#react-snackbar-root');
        
        this.progressBarEl = this.snakeBarEL.querySelector('.mc-progress-bar-fg');
        this.namefileEL = this.snakeBarEL.querySelector('.filename');
        this.timeleftEL = this.snakeBarEL.querySelector('.timeleft');


        this.initEvents();
    }

    initEvents(){  
        this.btnSendFileEl.addEventListener('click', (e) =>{
            this.inputFilesEl.click();
        });

        this.inputFilesEl.addEventListener('change', event =>{

            this.uploadTask(event.target.files);
            this.snakeBarEL.style.display='block';

        })
    }

    uploadTask(files){

        let promises = [];
        [...files].forEach( file =>{
            promises.push(new Promise((resolve, reject) =>{
                let ajax = new XMLHttpRequest();
                ajax.open('POST','/upload');
                
                //function will be done in the send
                ajax.onload = event =>{
                    try {
                        resolve (JSON.parse((ajax.responseText)));
                    }catch(error){
                        reject(error);
                    }
                }

                ajax.onerror= e => {
                    reject(e)
                }

                ajax.upload.onprogress = event => {
                    this.uploadProgress(event,file);
                }

                let formData = new FormData();
                formData.append('input-file',file);

                this.startUploadTime = Date.now();
                
                ajax.send(formData);
                
            }));
        })

        return Promise.all(promises);
    }

    uploadProgress(event,file){

        let limespent = Date.now() - this.startUploadTime;

        let loaded = event.loaded;
        let total = event.total;
        let porcent = parseInt( (loaded / total) * 100);

        let timeleft = ((100 - porcent) * limespent) / porcent;

        this.progressBarEl.style.width = `${porcent}%`;
        this.namefileEL.innerHTML = file.name;
        this.timeleftEL.innerHTML = this.formatTimeToHuman(timeleft);

        if (this.progressBarEl.style.width == '100%'){
            this.snakeBarEL.style.display='none';
            this.progressBarEl.style.width ='0%';
        }        
    }

    formatTimeToHuman(duration){

        let seconds = parseInt( (duration/1000) % 60);
        let minutes =parseInt ((duration /(1000*60)) %60);
        let hours = parseInt ((duration /(1000*60 *60)) %24);
        
        if(hours >0){

            return `${hours} horas, ${minutes} minutos e ${seconds} segundos restantes`
        };

        if(minutes >0){

            return `${minutes} minutos e ${seconds} segundos restantes`
        };

        if(seconds >0){
            return `${seconds} segundos restantes`
        };

        return '0 segundos restantes';
    }

}