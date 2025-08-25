import { Component, ChangeDetectionStrategy, input, output, signal, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  template: `
    <div class="mb-6">
      @if (label()) {
      <label class="block mb-2 text-sm font-semibold text-gray-700" [for]="inputId()">
        {{ label() }}
        @if (required()) {
        <span class="text-red-500 ml-1">*</span>
        }
      </label>
      }

      <div class="relative">
        <input
          [id]="inputId()"
          [type]="actualType()"
          [placeholder]="placeholder()"
          [class]="inputClasses()"
          [disabled]="disabled()"
          [value]="value()"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        />

        @if (type() === 'password') {
        <button
          type="button"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 text-base text-gray-500 transition-colors duration-200 hover:text-gray-700 focus:outline-none focus:text-primary-500"
          (click)="togglePasswordVisibility()"
        >
          {{ showPassword() ? '🙈' : '👁️' }}
        </button>
        }
      </div>

      @if (error() && touched()) {
      <div class="mt-2 text-sm text-red-500 flex items-center gap-1">
        <span class="text-xs">⚠️</span>
        {{ error() }}
      </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormInputComponent,
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  // Inputs
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly error = input<string>('');

  // Outputs
  readonly focusEvent = output<void>();
  readonly blurEvent = output<void>();

  // Internal state
  private readonly _value = signal<string>('');
  private readonly _touched = signal<boolean>(false);
  private readonly _showPassword = signal<boolean>(false);

  // Computed properties
  readonly value = this._value.asReadonly();
  readonly touched = this._touched.asReadonly();
  readonly showPassword = this._showPassword.asReadonly();

  readonly inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);

  readonly actualType = computed(() =>
    this.type() === 'password' && this.showPassword() ? 'text' : this.type()
  );

  readonly inputClasses = computed(() => {
    let classes =
      'w-full px-4 py-3 border rounded-lg text-base leading-6 transition-all duration-200 ease-in-out focus:outline-none focus:ring-3 focus:ring-primary-100 focus:border-primary-500 placeholder-gray-400';

    if (this.error() && this.touched()) {
      classes += ' border-red-500 focus:border-red-500 focus:ring-red-100';
    } else {
      classes += ' border-gray-300';
    }

    if (this.disabled()) {
      classes += ' bg-gray-50 text-gray-600 cursor-not-allowed';
    }

    return classes;
  }); // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this._value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handled through input property
  }

  // Event handlers
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this._value.set(value);
    this.onChange(value);
  }

  onBlur(): void {
    this._touched.set(true);
    this.onTouched();
    this.blurEvent.emit();
  }

  onFocus(): void {
    this.focusEvent.emit();
  }

  togglePasswordVisibility(): void {
    this._showPassword.update((show) => !show);
  }
}
