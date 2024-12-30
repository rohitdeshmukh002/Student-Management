import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-gsap-example-1',
  template: `
    <button (click)="animate()">Click Me</button>
    <div #box class="box">Hello GSAP!</div>
  `,
  styles: [`
    .box {
      width: 100px;
      height: 100px;
      background-color: green;
      margin: 50px auto;
    }
  `]
})
export class GsapExample1Component implements OnInit {
  @ViewChild('box') box!: ElementRef;

  animate(): void {
    gsap.to(this.box.nativeElement, { scale: 1.5, rotation: 360, duration: 2 });
  }

  ngOnInit(): void {
    const timeline = gsap.timeline();
    timeline
      .to('.box', { x: 100, duration: 1 })
      .to('.box', { y: 100, duration: 1 })
      .to('.box', { opacity: 0.5, duration: 1 });
  }
}
