import { Component, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SITE_CONFIG, type Theme, type Culture } from './config/site.config';
import { TRANSLATIONS } from './config/translations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  readonly config = SITE_CONFIG;

  isScrolled = false;
  menuOpen = false;
  theme: Theme = SITE_CONFIG.theme.default;
  culture: Culture = 'el';

  reservation = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: SITE_CONFIG.reservation.defaultTime,
    partySize: SITE_CONFIG.reservation.defaultPartySize,
    notes: '',
    culture: 'el' as Culture,
  };

  @ViewChild('f') private readonly resForm!: NgForm;

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  reviews: any[] = [];
  reviewsLoading = false;
  reviewsError = false;

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedCulture = localStorage.getItem('culture') as Culture;
    if (savedTheme === 'dark' || savedTheme === 'light') this.theme = savedTheme;
    if (savedCulture === 'el' || savedCulture === 'en') {
      this.culture = savedCulture;
      this.reservation.culture = savedCulture;
    }
    this.applyTheme();
    this.loadReviews();
  }

  get t() { return TRANSLATIONS[this.culture]; }
  get themeIcon() { return this.theme === 'dark' ? '☀️' : '🌙'; }
  get cultureLabel() { return this.culture === 'el' ? 'EN' : 'ΕΛ'; }

  applyTheme() {
    const colors = SITE_CONFIG.theme.colors[this.theme];
    const root = document.documentElement;
    (Object.keys(colors) as Array<keyof typeof colors>).forEach(key => {
      root.style.setProperty(
        `--${(key as string).replace(/([A-Z])/g, '-$1').toLowerCase()}`,
        colors[key],
      );
    });
    this.renderer.setAttribute(document.documentElement, 'data-theme', this.theme);
  }

  get mapEmbedUrl(): SafeResourceUrl {
    const { lat, lng } = this.config.location;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
    );
  }

  openMap() {
    window.open(this.config.location.mapsUrl, '_blank', 'noopener');
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  toggleCulture() {
    this.culture = this.culture === 'el' ? 'en' : 'el';
    this.reservation.culture = this.culture;
    localStorage.setItem('culture', this.culture);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 60;
  }

  scrollTo(id: string) {
    this.menuOpen = false;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  getStars(rating: number): number[] {
    return [1, 2, 3, 4, 5];
  }

  loadReviews() {
    this.reviewsLoading = true;
    this.reviewsError = false;
    const market = this.config.api.market;
    this.http.get<any[]>(`${this.config.api.baseUrl}/SerpAPI?market=${market}`)
      .subscribe({
        next: data => { this.reviews = data; this.reviewsLoading = false; },
        error: () => { this.reviewsError = true; this.reviewsLoading = false; },
      });
  }

  submitReservation() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Market': this.config.api.market,
    });
    this.http.post(`${this.config.api.baseUrl}/api/Reservations/CreateReservation`, this.reservation, { headers })
      .subscribe({
        next: () => { this.submitSuccess = true; this.isSubmitting = false; this.resetForm(); },
        error: () => { this.submitError = true; this.isSubmitting = false; },
      });
  }

  resetForm() {
    this.reservation = {
      name: '', email: '', phone: '', date: '',
      time: SITE_CONFIG.reservation.defaultTime,
      partySize: SITE_CONFIG.reservation.defaultPartySize,
      notes: '', culture: this.culture,
    };
    this.resForm?.resetForm(this.reservation);
  }
}
