import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { getImageeUrl } from '../../../shared/constants/serverapis';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  imageUrl = getImageeUrl;
  pictureTaken = new EventEmitter<WebcamImage>();

  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId!: string;
  videoOptions: MediaTrackConstraints = {};
  errors: WebcamInitError[] = [];

  private trigger = new Subject<void>();
  private nextWebcam = new Subject<boolean | string>();

  constructor(private route: Router, private http: HttpClient) {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.pictureTaken.emit(webcamImage);

    //! Convert base64 image to file
    const imageBlob = this.dataURItoBlob(webcamImage.imageAsDataUrl);
    const imageFile = new File([imageBlob], 'image.jpg', {
      type: 'image/jpeg',
    });

    this.cloudinary(imageFile).subscribe(
      (response) => console.log(response),
      (error) => console.error(error)
    );
  }

  //! convert base64 to Blob
  dataURItoBlob(dataURI: string) {
    const byteString = window.atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  cloudinary(imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.post(
      'https://easy-ruby-perch-tie.cyclic.app/upload/image',
      formData
    );
  }
}
