class DropBoxController{

    constructor(){
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snakeBarEL = document.querySelector('#react-snackbar-root')


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

                let formData = new FormData();
                formData.append('input-file',file);
                ajax.send(formData);
                
            }));
        })

        return Promise.all(promises);
    }

}