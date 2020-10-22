import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { ApiService } from './api.service';
import { FaceModel } from "./shared/face.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
	constructor(private apiService: ApiService) {}

  title = 'EMOJIFIER';
  url = 'http://localhost:3000';
	imageUrl = '';
	htmlToAdd = '';

	sendFile(imageUrl) {
    this.imageUrl = '';

    const obj = {
      imageUrl: imageUrl,
    };

		this.htmlToAdd = '';
    this.apiService.getImageData(imageUrl, (res) => {
      if (res.error) {
        this.htmlToAdd += `<span style="color: red;">${res.error.message}</span>`;
        return;
      }
      res.forEach((face: FaceModel) => {
      	const { faceRectangle, faceAttributes } = face;
      	const { height, width, left, top } = faceRectangle;
      
      	// TODO: Add image to website here
      
      	const { emotion } = faceAttributes;
       let mainEmotion;
      
      	Object.keys(emotion).forEach(key => {
      		if(!mainEmotion || emotion[key] > emotion[mainEmotion]) {
      			mainEmotion = key
      		}
      	});
      
        // TODO: Add emoji to image here
        const style = `position:absolute; height:${height}px; width:${width}px; left:${left}px; top:${top}px`;
        this.imageUrl = imageUrl;
        this.htmlToAdd += `<img class="emoji" style="${style}" src="/assets/${mainEmotion}.png"/>`;
      })
    });
	}
}
