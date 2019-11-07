import { Component, OnInit } from '@angular/core';
import {PromotionsService} from "../../services/promotions/promotions.service";

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss'],
})
export class PromotionsPage implements OnInit {
  promotionList: any = [];
  showData: boolean;

  constructor(private promotionService: PromotionsService) {
    this.showData = true;
  }

  ngOnInit() {
    this.getPromotions();
  }
  getPromotions() {
    this.promotionService.getPromotions().subscribe(
        (resp) => {
          this.promotionList = resp;
          if(this.promotionList.length) {
            this.showData = true;
          } else {
            this.showData = false
          }
        },
        (error) => {
          this.showData = false;
        }
    )
  }

}
