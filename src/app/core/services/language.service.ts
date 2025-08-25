import { Injectable, inject } from '@angular/core';
import { TranslationService } from './translation.service';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly translationService = inject(TranslationService);

  public readonly currentLanguage = this.translationService.currentLanguage;
  public readonly languages = this.translationService.languages;

  changeLanguage(languageCode: string): void {
    this.translationService.changeLanguage(languageCode);
  }

  getCurrentLanguageCode(): string {
    return this.translationService.getCurrentLanguageCode();
  }

  isCurrentLanguage(languageCode: string): boolean {
    return this.translationService.isCurrentLanguage(languageCode);
  }
}
