import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-gsap-example-2',
  templateUrl: './gsap-example-2.component.html',
  styleUrls: ['./gsap-example-2.component.css']
})
export class GsapExample2Component implements AfterViewInit {
  @ViewChildren('box') boxes!: QueryList<ElementRef>;
  boxesArray = Array(10).fill(null); // Generate 10 box elements

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    this.animateTitle();
    this.animateBoxesOnScroll();
  }

  private animateTitle(): void {
    gsap.from('.title', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power2.out',
    });
  }

  private animateBoxesOnScroll(): void {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.box-container',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      }
    });

    // Ensure boxes are rendered before animation
    timeline.from(this.boxes.map(box => box.nativeElement), {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'back.out(1.7)',
    });
  }
}