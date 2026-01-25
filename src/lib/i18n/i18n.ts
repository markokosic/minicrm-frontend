import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import deAuth from '@/locales/de/auth.json';
import deCommon from '@/locales/de/common.json';
import deDashboard from '@/locales/de/dashboard.json';
import deErrors from '@/locales/de/errors.json';
import deForm from '@/locales/de/form.json';
import deNotifications from '@/locales/de/notifications.json';
import enAuth from '@/locales/en/auth.json';
import enCommon from '@/locales/en/common.json';
import enDashboard from '@/locales/en/dashboard.json';
import enErrors from '@/locales/en/errors.json';
import enForm from '@/locales/en/form.json';
import enNotifications from '@/locales/en/notifications.json';
import srAuth from '@/locales/sr/auth.json';
import srCommon from '@/locales/sr/common.json';
import srDashboard from '@/locales/sr/dashboard.json';
import srErrors from '@/locales/sr/errors.json';
import srForm from '@/locales/sr/form.json';
import srNotifications from '@/locales/sr/notifications.json';
import { DEFAULT_LANGUAGE } from './languages';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: DEFAULT_LANGUAGE.code,
    supportedLngs: ['de', 'sr', 'en'],
    interpolation: {
      escapeValue: false,
    },
    resources: {
      de: {
        common: deCommon,
        auth: deAuth,
        dashboard: deDashboard,
        errors: deErrors,
        form: deForm,
        notifications: deNotifications,
      },
      sr: {
        common: srCommon,
        auth: srAuth,
        dashboard: srDashboard,
        errors: srErrors,
        form: srForm,
        notifications: srNotifications,
      },
      en: {
        common: enCommon,
        auth: enAuth,
        dashboard: enDashboard,
        errors: enErrors,
        form: enForm,
        notifications: enNotifications,
      },
    },
    ns: ['common', 'auth', 'dashboard', 'errors', 'form', 'notifications'],
    defaultNS: 'common',
  });

export default i18n;
