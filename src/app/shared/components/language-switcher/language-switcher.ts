import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left">
      <button
        type="button"
        class="inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        (click)="toggleDropdown()"
        [attr.aria-expanded]="isOpen()"
        aria-haspopup="true"
      >
        <span class="mr-2">{{ currentLanguage().flag }}</span>
        <span>{{ currentLanguage().name }}</span>
        <svg
          class="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      @if (isOpen()) {
      <div
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          @for (language of languages(); track language.code) {
          <button
            type="button"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
            [class.bg-gray-100]="languageService.isCurrentLanguage(language.code)"
            [class.font-semibold]="languageService.isCurrentLanguage(language.code)"
            (click)="selectLanguage(language)"
          >
            <span class="mr-3">{{ language.flag }}</span>
            <span>{{ language.name }}</span>
            @if (languageService.isCurrentLanguage(language.code)) {
            <svg class="ml-auto h-4 w-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            }
          </button>
          }
        </div>
      </div>
      }
    </div>
  `,
  standalone: true,
})
export class LanguageSwitcherComponent {
  protected readonly languageService = inject(LanguageService);
  protected readonly currentLanguage = this.languageService.currentLanguage;
  protected readonly languages = this.languageService.languages;
  protected readonly isOpen = signal(false);

  protected toggleDropdown(): void {
    this.isOpen.update((open) => !open);
  }

  protected selectLanguage(language: Language): void {
    this.isOpen.set(false);
    this.languageService.changeLanguage(language.code);
  }
}
