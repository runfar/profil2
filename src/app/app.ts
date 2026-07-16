import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  @ViewChild('greeting') greeting!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.renderGreeting();
  }

  // ⚠️ CodeQL 탐지 테스트용 의도적 취약점 (DOM 기반 XSS).
  // location.hash(사용자가 제어 가능한 소스)를 sanitize 없이 innerHTML(위험한 sink)에
  // 직접 대입합니다. CodeQL 기본 쿼리(js/xss-through-dom)가 이 흐름을 탐지해야 합니다.
  // 실제 서비스 코드에서는 절대 사용하면 안 됩니다.
  renderGreeting(): void {
    const name = decodeURIComponent(window.location.hash.slice(1));
    this.greeting.nativeElement.innerHTML = 'Hello, ' + name + '!';
  }
}
