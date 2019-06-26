import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtensionsService {
  message: string;
  imagePath;

  constructor() { }

  preview(files) {
    
    let UserImg;
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);

    return new Promise(function(resolve, reject){
      reader.onload = (_event) => {
        UserImg = reader.result;
        resolve(UserImg);
      }
    })
  }
}
