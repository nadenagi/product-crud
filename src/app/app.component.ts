import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kashier-task';

  constructor(private store: StoreService) {
    this.store.productList.subscribe((res: any) => {
      console.log(res);
    });
  }

  ngOnInit() {}
}
