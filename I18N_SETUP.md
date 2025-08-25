# 🌐 Internationalization (i18n) Setup

This Angular application supports multiple languages using Angular's built-in i18n features.

## 🎯 **Supported Languages**
- 🇺🇸 **English (en)** - Default language
- 🇻🇳 **Vietnamese (vi)** - Tiếng Việt
- 🇯🇵 **Japanese (ja)** - 日本語  
- 🇫🇷 **French (fr)** - Français

## 🚀 **Available Commands**

### Development
```bash
# Start development server (English - default)
npm start

# Start development server with specific language
npm run serve:vi    # Vietnamese
npm run serve:ja    # Japanese
npm run serve:fr    # French
```

### Building
```bash
# Build all language versions
npm run build:i18n

# Build specific language versions
npm run build:en    # English
npm run build:vi    # Vietnamese  
npm run build:ja    # Japanese
npm run build:fr    # French
```

### Translation Management
```bash
# Extract translatable text from templates
npm run extract-i18n
```

## 📁 **Translation Files**
Translation files are located in `src/locale/`:
- `messages.xlf` - Base English messages
- `messages.vi.xlf` - Vietnamese translations
- `messages.ja.xlf` - Japanese translations
- `messages.fr.xlf` - French translations

## 🔧 **Key Features Implemented**

### ✅ **Language Switcher Component**
- Dropdown component with flag icons
- Smooth transitions between languages
- Persistent language selection

### ✅ **Translated Components**
- **Login Page**: Welcome messages, form labels, buttons
- **Register Page**: Form titles, input placeholders
- **Dashboard**: Welcome messages, navigation

### ✅ **i18n Attributes Used**
```html
<!-- Text content translation -->
<h1 i18n="@@auth.login.welcome">Welcome Back</h1>

<!-- Input attributes translation -->
<input 
  placeholder="Enter your email"
  i18n-placeholder="@@auth.email.placeholder"
>
```

## 🎨 **Language-Specific Styling**
The language switcher includes:
- Country flag emojis for visual identification
- Proper RTL support (ready for Arabic/Hebrew)
- Responsive dropdown design with Tailwind CSS

## 🔄 **How Language Switching Works**
1. User clicks the language switcher dropdown
2. Selects desired language
3. Application redirects to the localized version
4. All text content appears in selected language

## 🏗️ **Technical Implementation**

### Angular Configuration (`angular.json`)
```json
{
  "i18n": {
    "sourceLocale": "en",
    "locales": {
      "vi": {
        "translation": "src/locale/messages.vi.xlf",
        "baseHref": "/vi/"
      }
    }
  }
}
```

### Language Service (`language.service.ts`)
- Manages current language state using Angular signals
- Provides language switching functionality
- Handles language persistence

### Translation Keys Used
- `@@auth.login.welcome` - Login page title
- `@@auth.email.label` - Email field label
- `@@auth.password.placeholder` - Password placeholder
- `@@dashboard.title` - Dashboard title
- And many more...

## 🌟 **Best Practices Implemented**

1. **Semantic Translation Keys**: Using descriptive IDs like `auth.login.welcome`
2. **Proper XLIFF Format**: Standard translation file format
3. **Component Isolation**: Language switcher as reusable component
4. **Signal-Based State**: Modern Angular reactive programming
5. **Build Optimization**: Separate builds for each language

## 🚦 **Next Steps**

To add more languages:
1. Add the locale to `angular.json` i18n configuration
2. Create new translation file in `src/locale/`
3. Add language to `LanguageService.supportedLanguages`
4. Add build script to `package.json`

## 🎯 **Usage Examples**

### In Templates
```html
<!-- Simple text -->
<p i18n="@@welcome.message">Welcome to our app!</p>

<!-- With placeholder attributes -->
<input 
  placeholder="Enter name"
  i18n-placeholder="@@form.name.placeholder"
>

<!-- With descriptions -->
<button i18n="@@button.save|Save button text">Save</button>
```

### In Components
```typescript
// Use the LanguageService
constructor(private languageService: LanguageService) {}

getCurrentLang() {
  return this.languageService.getCurrentLanguageCode();
}
```

---

The i18n setup is now complete and ready for production use! 🎉
