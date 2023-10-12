import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  animationStart: boolean = false;
  animationLogo: boolean = false;
  d_none: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.animationStart = true;
      setTimeout(() => {
        this.animationLogo = true;
        setTimeout(() => {
          this.d_none = true; // Setze d_none auf true, um auszublenden und es dauerhaft so zu belassen
        }, 100);
      }, 1000);
    }, 1000);
  }

}
