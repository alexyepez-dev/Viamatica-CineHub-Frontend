import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

@Component({
  selector: 'movie-carousel',
  imports: [],
  template: `
    <div class="swiper shadow-2xl rounded-2xl overflow-hidden" #swiperRef>
      <div class="swiper-wrapper">
        @for (image of images(); track $index) {
          <div class="swiper-slide flex justify-center items-center bg-black/5">
            <img
              [src]="image"
              alt="Movie poster"
              class="h-full rounded-xl object-cover transition-all duration-500"
            />
          </div>
        }
      </div>

      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev "></div>
      <div class="swiper-button-next "></div>
    </div>
  `,
  styles: `
    .swiper {
      height: 500px;
    }

    .swiper-slide {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
})
export class MovieCarousel implements AfterViewInit {
  readonly images = input.required<string[]>();
  readonly swiperRef = viewChild.required<ElementRef>('swiperRef');

  ngAfterViewInit(): void {
    const element = this.swiperRef().nativeElement;
    if (!element) return;

    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
