import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';
import { BookCourseService } from '../../services/book-course/book-course.service';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TokenService } from '../../services/auth/token.service';
import { ApiService } from '../../services/api.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ToastService } from '../../services/toast/toast.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss'],
})
export class PaymentStatusComponent implements OnInit {
  status : string;
  userPayments = [];
  showData : boolean = true;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(private loaderService : LoaderService,
              private bookCourseService : BookCourseService,
              private activatedRoute : ActivatedRoute,
              private camera : Camera,
              private tokenService : TokenService,
              private apiService : ApiService,
              private transfer: FileTransfer,
              private toastService : ToastService,
              private actionSheetController : ActionSheetController) {
                this.activatedRoute.url.subscribe(
                  (resp) => {
                    console.log(resp[0]['path']);
                    this.status =resp[0]['path'];
                    if(this.status){
                  this.getUserPayments();
                    }
                  }
                )
               }

  ngOnInit() {
    
  }

  getUserPayments() {
    this.loaderService.presentLoading();
    this.bookCourseService.getUserPayments(this.status)
    .subscribe(
      (resp : any) => {
        this.userPayments = resp;
        this.loaderService.dismissLoading();
        if(this.userPayments.length) {
          this.showData = true;
        }
        else {
          this.showData = false;
        }
       
      },
      (error) => {
        this.loaderService.dismissLoading();
      }
    )
  }

  async presentActionSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose Image',
      buttons: [{
        text: 'Gallery',
        handler: () => {
          this.selectImage(id, 0);
        }
      }, {
        text: 'Camera',
        handler: () => {
          this.selectImage(id, 1);
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  selectImage(id, sourceType) { 
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:sourceType,
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.loaderService.presentLoading();
      let options: FileUploadOptions = {
        fileKey: 'image',
        fileName:  imageData.substr(imageData.lastIndexOf('/') + 1),
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {
          'id' : id
        },
        headers : {
          'Authorization' : 'Bearer ' + this.tokenService.getToken()
        }
     }
   
     this.fileTransfer.upload(imageData, 'http://www.alphazzz.com/tuition/public/api/upload_payment_image', options)
      .then((data) => {
        this.loaderService.dismissLoading();
        this.toastService.presentToast('Image Successfully uploaded');
        this.getUserPayments();
      }, (err) => {
          this.loaderService.dismissLoading();
          // alert(JSON.stringify(err));
          this.toastService.presentToast('Contact support if you face difficulty in uploading. Click chat icon at bottom right corner of app');
      })
    
    }, (err) => {
      this.toastService.presentToast('Please select image');
    });

}
}