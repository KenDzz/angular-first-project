import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type()"
      [class]="buttonClasses()"
      [disabled]="disabled() || loading()"
      (click)="handleClick()"
    >
      @if (loading()) {
      <span
        class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
      ></span>
      }
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  // Inputs
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);

  // Outputs
  readonly clickEvent = output<void>();

  // Computed properties
  readonly buttonClasses = computed(() => {
    let baseClasses =
      'inline-flex items-center justify-center gap-2 border border-transparent font-semibold text-center no-underline cursor-pointer transition-all duration-200 ease-in-out rounded-lg focus:outline-none focus:ring-3';

    // Variant styles
    let variantClasses = '';
    switch (this.variant()) {
      case 'primary':
        variantClasses =
          'bg-primary-500 border-primary-500 text-white hover:bg-primary-600 hover:border-primary-600 focus:ring-primary-200 disabled:opacity-50';
        break;
      case 'secondary':
        variantClasses =
          'bg-gray-600 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-700 focus:ring-gray-200 disabled:opacity-50';
        break;
      case 'danger':
        variantClasses =
          'bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 focus:ring-red-200 disabled:opacity-50';
        break;
      case 'ghost':
        variantClasses =
          'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-200 disabled:opacity-50';
        break;
    }

    // Size styles
    let sizeClasses = '';
    switch (this.size()) {
      case 'sm':
        sizeClasses = 'px-4 py-2 text-sm leading-5';
        break;
      case 'md':
        sizeClasses = 'px-6 py-3 text-base leading-6';
        break;
      case 'lg':
        sizeClasses = 'px-8 py-4 text-lg leading-7';
        break;
    }

    // Additional modifiers
    let modifierClasses = '';
    if (this.fullWidth()) {
      modifierClasses += ' w-full';
    }
    if (this.disabled() || this.loading()) {
      modifierClasses += ' cursor-not-allowed';
    }
    if (this.loading()) {
      modifierClasses += ' cursor-wait';
    }

    return `${baseClasses} ${variantClasses} ${sizeClasses} ${modifierClasses}`.trim();
  });

  handleClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.clickEvent.emit();
    }
  }
}
