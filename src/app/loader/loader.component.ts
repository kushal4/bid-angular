import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {


  @Input() color = 'primary';
  @Input() mode = 'indeterminate';
  @Input() value = 50;
  @Input('show') show=false;

  constructor() { }

  ngOnInit() {
  }

}
