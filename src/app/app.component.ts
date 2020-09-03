import {Component, HostListener, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Petra Orosz';
  email = 'oroszpetra11@gmail.com';
  phone = '+36 30 2958 122';
  @ViewChild('intro') intro;
  @ViewChild('about_me') aboutMe;
  @ViewChild('companies') companies;
  @ViewChild('skills') skills;
  @ViewChild('contact') contact;
  bgColor: string = 'transparent';
  @HostListener('window:scroll') onScroll(e: Event): void {
    if (this.checkvisible(this.aboutMe)) {
      this.bgColor = '#5B6DA0';
    } else if (this.checkvisible(this.intro)) {
      this.bgColor = 'transparent';
    } else if (this.checkvisible(this.companies)) {
      this.bgColor = '#222127';
    } else if (this.checkvisible(this.skills)) {
      this.bgColor = '#A6BFE0';
    } else if (this.checkvisible(this.contact)) {
      this.bgColor = 'transparent';
    }
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  addClass(clazz) {
    this.document.body.classList.add(clazz);
  }

  removeClass(clazz) {
    if (this.document.body.classList.contains(clazz)) {
      this.document.body.classList.remove(clazz);
    }
  }


  posY(elm) {
    let test = elm.nativeElement, top = 0;

    while(!!test && test.tagName.toLowerCase() !== "body") {
      top += test.offsetTop;
      test = test.offsetParent;
    }

    return top;
  }

  viewPortHeight() {
    const de = document.documentElement;

    if(!!window.innerWidth)
    { return window.innerHeight; }
    else if( de && !isNaN(de.clientHeight) )
    { return de.clientHeight; }

    return 0;
  }

  scrollY() {
    if( window.pageYOffset ) { return window.pageYOffset; }
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  }

  checkvisible(elm) {
    let viewPortHeight = this.viewPortHeight(), // Viewport Height
      scrolledY = this.scrollY(), // Scroll Top
      elementYPos = this.posY(elm);
    return (elementYPos < (scrolledY + (viewPortHeight/2))) && (elementYPos > (scrolledY - (viewPortHeight/2)));
  }
}
