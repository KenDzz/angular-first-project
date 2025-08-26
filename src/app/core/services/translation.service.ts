import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TranslationData {
  [key: string]: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly supportedLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  private readonly translations = signal<TranslationData>({});
  public readonly currentLanguage = signal<Language>(this.supportedLanguages[0]);
  public readonly languages = signal<Language[]>(this.supportedLanguages);

  // Define all translations inline for runtime switching
  private readonly translationData: Record<string, TranslationData> = {
    en: {
      // Login
      'auth.login.welcome': 'Welcome Back',
      'auth.login.subtitle': 'Sign in to your account to continue',
      'auth.email.label': 'Email Address',
      'auth.email.placeholder': 'Enter your email',
      'auth.password.label': 'Password',
      'auth.password.placeholder': 'Enter your password',
      'auth.login.signing-in': 'Signing in...',
      'auth.login.sign-in': 'Sign In',
      'auth.login.no-account': "Don't have an account?",
      'auth.login.create-account': 'Create one here',

      // Register
      'auth.register.title': 'Create Account',
      'auth.register.subtitle': 'Sign up to get started with your account',
      'auth.register.first-name': 'First Name',
      'auth.register.first-name-placeholder': 'Enter your first name',
      'auth.register.last-name': 'Last Name',
      'auth.register.last-name-placeholder': 'Enter your last name',
      'auth.register.confirm-password': 'Confirm Password',
      'auth.register.confirm-password-placeholder': 'Confirm your password',
      'auth.register.password-requirements': 'Password Requirements:',
      'auth.register.requirement1': 'At least 8 characters long',
      'auth.register.requirement2': 'Contains uppercase and lowercase letters',
      'auth.register.requirement3': 'Contains at least one number',
      'auth.register.requirement4': 'Contains at least one special character',
      'auth.register.creating': 'Creating Account...',
      'auth.register.create-button': 'Create Account',
      'auth.register.already-have': 'Already have an account?',
      'auth.register.sign-in-here': 'Sign in here',
      'auth.register.password-strong': 'Create a strong password',

      // Dashboard
      'dashboard.title': 'Dashboard',
      'dashboard.welcome': 'Welcome back, {{firstName}}!',
      'dashboard.sign-out': 'Sign Out',
      'dashboard.welcome-message': 'Welcome to your Dashboard',
      'dashboard.description':
        'You have successfully logged in! This is a protected route that can only be accessed by authenticated users.',

      // Profile
      'profile.member-since': 'Member since',
      'profile.personal-info': 'Personal Information',
      'profile.first-name': 'First Name',
      'profile.last-name': 'Last Name',
      'profile.email': 'Email',
      'profile.user-id': 'User ID',
      'profile.account-actions': 'Account Actions',
      'profile.edit-profile': 'Edit Profile',
      'profile.change-password': 'Change Password',

      // Settings
      'settings.title': 'Settings',
      'settings.personal-info': 'Personal Information',
      'settings.first-name': 'First Name',
      'settings.first-name-placeholder': 'Enter your first name',
      'settings.last-name': 'Last Name',
      'settings.last-name-placeholder': 'Enter your last name',
      'settings.email': 'Email',
      'settings.email-placeholder': 'Enter your email',
      'settings.language-preferences': 'Language Preferences',
      'settings.language': 'Language',
      'settings.account-actions': 'Account Actions',
      'settings.change-password': 'Change Password',
      'settings.export-data': 'Export Data',
      'settings.delete-account': 'Delete Account',
      'settings.saving': 'Saving...',
      'settings.save-changes': 'Save Changes',

      // Analytics
      'analytics.dashboard.title': 'Analytics Dashboard',
      'analytics.dashboard.last-updated': 'Last updated',
      'analytics.dashboard.refresh': 'Refresh',
      'analytics.dashboard.total-users': 'Total Users',
      'analytics.dashboard.active-users': 'Active Users',
      'analytics.dashboard.revenue': 'Revenue',
      'analytics.dashboard.conversion-rate': 'Conversion Rate',
      'analytics.dashboard.user-growth': 'User Growth',
      'analytics.dashboard.revenue-trend': 'Revenue Trend',
      'analytics.dashboard.chart-placeholder': 'Chart will be displayed here',
      'analytics.dashboard.recent-activity': 'Recent Activity',

      // Reports
      'reports.title': 'Reports',
      'reports.user-analytics': 'User Analytics',
      'reports.user-analytics-desc': 'Detailed analysis of user behavior',
      'reports.revenue-report': 'Revenue Report',
      'reports.revenue-report-desc': 'Financial performance overview',
      'reports.performance-report': 'Performance Report',
      'reports.performance-report-desc': 'System and app performance metrics',
      'reports.generate': 'Generate',
      'reports.recent-reports': 'Recent Reports',
      'reports.download': 'Download',
    },
    vi: {
      // Login
      'auth.login.welcome': 'Chào Mừng Trở Lại',
      'auth.login.subtitle': 'Đăng nhập vào tài khoản của bạn để tiếp tục',
      'auth.email.label': 'Địa Chỉ Email',
      'auth.email.placeholder': 'Nhập email của bạn',
      'auth.password.label': 'Mật Khẩu',
      'auth.password.placeholder': 'Nhập mật khẩu của bạn',
      'auth.login.signing-in': 'Đang đăng nhập...',
      'auth.login.sign-in': 'Đăng Nhập',
      'auth.login.no-account': 'Chưa có tài khoản?',
      'auth.login.create-account': 'Tạo tài khoản tại đây',

      // Register
      'auth.register.title': 'Tạo Tài Khoản',
      'auth.register.subtitle': 'Đăng ký để bắt đầu với tài khoản của bạn',
      'auth.register.first-name': 'Tên',
      'auth.register.first-name-placeholder': 'Nhập tên của bạn',
      'auth.register.last-name': 'Họ',
      'auth.register.last-name-placeholder': 'Nhập họ của bạn',
      'auth.register.confirm-password': 'Xác Nhận Mật Khẩu',
      'auth.register.confirm-password-placeholder': 'Xác nhận mật khẩu của bạn',
      'auth.register.password-requirements': 'Yêu Cầu Mật Khẩu:',
      'auth.register.requirement1': 'Ít nhất 8 ký tự',
      'auth.register.requirement2': 'Chứa chữ hoa và chữ thường',
      'auth.register.requirement3': 'Chứa ít nhất một số',
      'auth.register.requirement4': 'Chứa ít nhất một ký tự đặc biệt',
      'auth.register.creating': 'Đang tạo tài khoản...',
      'auth.register.create-button': 'Tạo Tài Khoản',
      'auth.register.already-have': 'Đã có tài khoản?',
      'auth.register.sign-in-here': 'Đăng nhập tại đây',
      'auth.register.password-strong': 'Tạo mật khẩu mạnh',

      // Dashboard
      'dashboard.title': 'Bảng Điều Khiển',
      'dashboard.welcome': 'Chào mừng trở lại, {{firstName}}!',
      'dashboard.sign-out': 'Đăng Xuất',
      'dashboard.welcome-message': 'Chào Mừng Đến Với Bảng Điều Khiển',
      'dashboard.description':
        'Bạn đã đăng nhập thành công! Đây là trang được bảo vệ chỉ có thể truy cập bởi người dùng đã xác thực.',

      // Profile
      'profile.member-since': 'Thành viên từ',
      'profile.personal-info': 'Thông Tin Cá Nhân',
      'profile.first-name': 'Tên',
      'profile.last-name': 'Họ',
      'profile.email': 'Email',
      'profile.user-id': 'ID Người Dùng',
      'profile.account-actions': 'Hành Động Tài Khoản',
      'profile.edit-profile': 'Chỉnh Sửa Hồ Sơ',
      'profile.change-password': 'Đổi Mật Khẩu',

      // Settings
      'settings.title': 'Cài Đặt',
      'settings.personal-info': 'Thông Tin Cá Nhân',
      'settings.first-name': 'Tên',
      'settings.first-name-placeholder': 'Nhập tên của bạn',
      'settings.last-name': 'Họ',
      'settings.last-name-placeholder': 'Nhập họ của bạn',
      'settings.email': 'Email',
      'settings.email-placeholder': 'Nhập email của bạn',
      'settings.language-preferences': 'Tùy Chọn Ngôn Ngữ',
      'settings.language': 'Ngôn Ngữ',
      'settings.account-actions': 'Hành Động Tài Khoản',
      'settings.change-password': 'Đổi Mật Khẩu',
      'settings.export-data': 'Xuất Dữ Liệu',
      'settings.delete-account': 'Xóa Tài Khoản',
      'settings.saving': 'Đang lưu...',
      'settings.save-changes': 'Lưu Thay Đổi',

      // Analytics
      'analytics.dashboard.title': 'Bảng Điều Khiển Phân Tích',
      'analytics.dashboard.last-updated': 'Cập nhật cuối',
      'analytics.dashboard.refresh': 'Làm mới',
      'analytics.dashboard.total-users': 'Tổng Người Dùng',
      'analytics.dashboard.active-users': 'Người Dùng Hoạt Động',
      'analytics.dashboard.revenue': 'Doanh Thu',
      'analytics.dashboard.conversion-rate': 'Tỷ Lệ Chuyển Đổi',
      'analytics.dashboard.user-growth': 'Tăng Trưởng Người Dùng',
      'analytics.dashboard.revenue-trend': 'Xu Hướng Doanh Thu',
      'analytics.dashboard.chart-placeholder': 'Biểu đồ sẽ hiển thị tại đây',
      'analytics.dashboard.recent-activity': 'Hoạt Động Gần Đây',

      // Reports
      'reports.title': 'Báo Cáo',
      'reports.user-analytics': 'Phân Tích Người Dùng',
      'reports.user-analytics-desc': 'Phân tích chi tiết hành vi người dùng',
      'reports.revenue-report': 'Báo Cáo Doanh Thu',
      'reports.revenue-report-desc': 'Tổng quan hiệu suất tài chính',
      'reports.performance-report': 'Báo Cáo Hiệu Suất',
      'reports.performance-report-desc': 'Số liệu hiệu suất hệ thống và ứng dụng',
      'reports.generate': 'Tạo',
      'reports.recent-reports': 'Báo Cáo Gần Đây',
      'reports.download': 'Tải xuống',
    },
    ja: {
      // Login
      'auth.login.welcome': 'おかえりなさい',
      'auth.login.subtitle': 'アカウントにサインインして続行してください',
      'auth.email.label': 'メールアドレス',
      'auth.email.placeholder': 'メールアドレスを入力',
      'auth.password.label': 'パスワード',
      'auth.password.placeholder': 'パスワードを入力',
      'auth.login.signing-in': 'サインイン中...',
      'auth.login.sign-in': 'サインイン',
      'auth.login.no-account': 'アカウントをお持ちでないですか？',
      'auth.login.create-account': 'こちらで作成',

      // Register
      'auth.register.title': 'アカウント作成',
      'auth.register.subtitle': 'アカウントの利用を開始するためにサインアップしてください',
      'auth.register.first-name': '名前',
      'auth.register.first-name-placeholder': '名前を入力',
      'auth.register.last-name': '姓',
      'auth.register.last-name-placeholder': '姓を入力',
      'auth.register.confirm-password': 'パスワード確認',
      'auth.register.confirm-password-placeholder': 'パスワードを確認',
      'auth.register.password-requirements': 'パスワード要件：',
      'auth.register.requirement1': '8文字以上',
      'auth.register.requirement2': '大文字と小文字を含む',
      'auth.register.requirement3': '少なくとも1つの数字を含む',
      'auth.register.requirement4': '少なくとも1つの特殊文字を含む',
      'auth.register.creating': 'アカウント作成中...',
      'auth.register.create-button': 'アカウント作成',
      'auth.register.already-have': 'すでにアカウントをお持ちですか？',
      'auth.register.sign-in-here': 'こちらでサインイン',
      'auth.register.password-strong': '強いパスワードを作成',

      // Dashboard
      'dashboard.title': 'ダッシュボード',
      'dashboard.welcome': 'おかえりなさい、{{firstName}}さん！',
      'dashboard.sign-out': 'サインアウト',
      'dashboard.welcome-message': 'ダッシュボードへようこそ',
      'dashboard.description':
        'ログインが成功しました！これは認証されたユーザーのみがアクセスできる保護されたルートです。',

      // Profile
      'profile.member-since': 'メンバー歴',
      'profile.personal-info': '個人情報',
      'profile.first-name': '名前',
      'profile.last-name': '姓',
      'profile.email': 'メール',
      'profile.user-id': 'ユーザーID',
      'profile.account-actions': 'アカウント操作',
      'profile.edit-profile': 'プロフィール編集',
      'profile.change-password': 'パスワード変更',

      // Settings
      'settings.title': '設定',
      'settings.personal-info': '個人情報',
      'settings.first-name': '名前',
      'settings.first-name-placeholder': '名前を入力',
      'settings.last-name': '姓',
      'settings.last-name-placeholder': '姓を入力',
      'settings.email': 'メール',
      'settings.email-placeholder': 'メールを入力',
      'settings.language-preferences': '言語設定',
      'settings.language': '言語',
      'settings.account-actions': 'アカウント操作',
      'settings.change-password': 'パスワード変更',
      'settings.export-data': 'データエクスポート',
      'settings.delete-account': 'アカウント削除',
      'settings.saving': '保存中...',
      'settings.save-changes': '変更を保存',

      // Analytics
      'analytics.dashboard.title': '分析ダッシュボード',
      'analytics.dashboard.last-updated': '最終更新',
      'analytics.dashboard.refresh': '更新',
      'analytics.dashboard.total-users': '総ユーザー数',
      'analytics.dashboard.active-users': 'アクティブユーザー',
      'analytics.dashboard.revenue': '収益',
      'analytics.dashboard.conversion-rate': 'コンバージョン率',
      'analytics.dashboard.user-growth': 'ユーザー成長',
      'analytics.dashboard.revenue-trend': '収益トレンド',
      'analytics.dashboard.chart-placeholder': 'ここにチャートが表示されます',
      'analytics.dashboard.recent-activity': '最近のアクティビティ',

      // Reports
      'reports.title': 'レポート',
      'reports.user-analytics': 'ユーザー分析',
      'reports.user-analytics-desc': 'ユーザー行動の詳細分析',
      'reports.revenue-report': '収益レポート',
      'reports.revenue-report-desc': '財務パフォーマンス概要',
      'reports.performance-report': 'パフォーマンスレポート',
      'reports.performance-report-desc': 'システムとアプリのパフォーマンス指標',
      'reports.generate': '生成',
      'reports.recent-reports': '最近のレポート',
      'reports.download': 'ダウンロード',
    },
    fr: {
      // Login
      'auth.login.welcome': 'Bon Retour',
      'auth.login.subtitle': 'Connectez-vous à votre compte pour continuer',
      'auth.email.label': 'Adresse Email',
      'auth.email.placeholder': 'Entrez votre email',
      'auth.password.label': 'Mot de Passe',
      'auth.password.placeholder': 'Entrez votre mot de passe',
      'auth.login.signing-in': 'Connexion en cours...',
      'auth.login.sign-in': 'Se Connecter',
      'auth.login.no-account': "Vous n'avez pas de compte?",
      'auth.login.create-account': 'Créez-en un ici',

      // Register
      'auth.register.title': 'Créer un Compte',
      'auth.register.subtitle': 'Inscrivez-vous pour commencer avec votre compte',
      'auth.register.first-name': 'Prénom',
      'auth.register.first-name-placeholder': 'Entrez votre prénom',
      'auth.register.last-name': 'Nom',
      'auth.register.last-name-placeholder': 'Entrez votre nom',
      'auth.register.confirm-password': 'Confirmer le Mot de Passe',
      'auth.register.confirm-password-placeholder': 'Confirmez votre mot de passe',
      'auth.register.password-requirements': 'Exigences du Mot de Passe:',
      'auth.register.requirement1': 'Au moins 8 caractères',
      'auth.register.requirement2': 'Contient des majuscules et minuscules',
      'auth.register.requirement3': 'Contient au moins un chiffre',
      'auth.register.requirement4': 'Contient au moins un caractère spécial',
      'auth.register.creating': 'Création du compte...',
      'auth.register.create-button': 'Créer un Compte',
      'auth.register.already-have': 'Vous avez déjà un compte?',
      'auth.register.sign-in-here': 'Connectez-vous ici',
      'auth.register.password-strong': 'Créez un mot de passe fort',

      // Dashboard
      'dashboard.title': 'Tableau de Bord',
      'dashboard.welcome': 'Bon retour, {{firstName}}!',
      'dashboard.sign-out': 'Se Déconnecter',
      'dashboard.welcome-message': 'Bienvenue sur votre Tableau de Bord',
      'dashboard.description':
        'Vous vous êtes connecté avec succès! Ceci est une route protégée qui ne peut être accessible que par des utilisateurs authentifiés.',

      // Profile
      'profile.member-since': 'Membre depuis',
      'profile.personal-info': 'Informations Personnelles',
      'profile.first-name': 'Prénom',
      'profile.last-name': 'Nom',
      'profile.email': 'Email',
      'profile.user-id': 'ID Utilisateur',
      'profile.account-actions': 'Actions du Compte',
      'profile.edit-profile': 'Modifier le Profil',
      'profile.change-password': 'Changer le Mot de Passe',

      // Settings
      'settings.title': 'Paramètres',
      'settings.personal-info': 'Informations Personnelles',
      'settings.first-name': 'Prénom',
      'settings.first-name-placeholder': 'Entrez votre prénom',
      'settings.last-name': 'Nom',
      'settings.last-name-placeholder': 'Entrez votre nom',
      'settings.email': 'Email',
      'settings.email-placeholder': 'Entrez votre email',
      'settings.language-preferences': 'Préférences de Langue',
      'settings.language': 'Langue',
      'settings.account-actions': 'Actions du Compte',
      'settings.change-password': 'Changer le Mot de Passe',
      'settings.export-data': 'Exporter les Données',
      'settings.delete-account': 'Supprimer le Compte',
      'settings.saving': 'Sauvegarde...',
      'settings.save-changes': 'Sauvegarder les Modifications',

      // Analytics
      'analytics.dashboard.title': 'Tableau de Bord Analytique',
      'analytics.dashboard.last-updated': 'Dernière mise à jour',
      'analytics.dashboard.refresh': 'Actualiser',
      'analytics.dashboard.total-users': 'Utilisateurs Totaux',
      'analytics.dashboard.active-users': 'Utilisateurs Actifs',
      'analytics.dashboard.revenue': 'Revenus',
      'analytics.dashboard.conversion-rate': 'Taux de Conversion',
      'analytics.dashboard.user-growth': 'Croissance des Utilisateurs',
      'analytics.dashboard.revenue-trend': 'Tendance des Revenus',
      'analytics.dashboard.chart-placeholder': 'Le graphique sera affiché ici',
      'analytics.dashboard.recent-activity': 'Activité Récente',

      // Reports
      'reports.title': 'Rapports',
      'reports.user-analytics': 'Analyse des Utilisateurs',
      'reports.user-analytics-desc': 'Analyse détaillée du comportement des utilisateurs',
      'reports.revenue-report': 'Rapport de Revenus',
      'reports.revenue-report-desc': "Vue d'ensemble des performances financières",
      'reports.performance-report': 'Rapport de Performance',
      'reports.performance-report-desc': 'Métriques de performance système et application',
      'reports.generate': 'Générer',
      'reports.recent-reports': 'Rapports Récents',
      'reports.download': 'Télécharger',
    },
  };

  constructor() {
    // Initialize with saved language or default to English
    const savedLanguage = this.getSavedLanguage();
    this.changeLanguage(savedLanguage);

    // Save language preference when it changes
    effect(() => {
      this.saveLanguage(this.currentLanguage().code);
    });
  }

  changeLanguage(languageCode: string): void {
    const language = this.supportedLanguages.find((lang) => lang.code === languageCode);
    if (language && this.translationData[languageCode]) {
      this.currentLanguage.set(language);
      this.translations.set(this.translationData[languageCode]);
    }
  }

  translate(key: string, params?: Record<string, string>): string {
    let translation = this.translations()[key] || key;

    // Handle parameter substitution
    if (params) {
      Object.keys(params).forEach((param) => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }

    return translation;
  }

  getCurrentLanguageCode(): string {
    return this.currentLanguage().code;
  }

  isCurrentLanguage(languageCode: string): boolean {
    return this.currentLanguage().code === languageCode;
  }

  private getSavedLanguage(): string {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLanguage') || 'en';
    }
    return 'en';
  }

  private saveLanguage(languageCode: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', languageCode);
    }
  }
}
