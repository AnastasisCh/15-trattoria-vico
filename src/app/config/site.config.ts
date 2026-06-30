export type Theme = 'dark' | 'light';
export type Culture = 'el' | 'en';

export const SITE_CONFIG = {
  api: {
    baseUrl: 'https://cafebarrestaurantapi-gjagh7csarhjaxd7.italynorth-01.azurewebsites.net',
    market: 'TrattoriaVico',
  },
  theme: {
    default: 'light' as Theme,
    colors: {
      light: {
        background: '#fdf6ee',
        surface: '#ffffff',
        surfaceAlt: '#f5ebe0',
        text: '#2d1a0e',
        textMuted: '#7a5c3e',
        accent: '#c0392b',
        accentHover: '#a02e22',
        border: '#e8d5c0',
        navBg: 'rgba(253,246,238,0.95)',
        overlay: 'rgba(45,26,14,0.45)',
      },
      dark: {
        background: '#1a0f08',
        surface: '#251509',
        surfaceAlt: '#2e1c0d',
        text: '#f0e0cc',
        textMuted: '#b09070',
        accent: '#e05540',
        accentHover: '#f07060',
        border: '#3d2510',
        navBg: 'rgba(26,15,8,0.95)',
        overlay: 'rgba(0,0,0,0.55)',
      },
    },
  },
  images: {
    hero: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1800&q=85',
    about: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1481070414801-51fd732d7184?w=600&q=80',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80',
    ],
  },
  business: {
    name: 'Trattoria Vico',
    address: 'Βικτωρίας 18, Κολωνάκι, Αθήνα 106 79',
    addressEn: '18 Viktorias St, Kolonaki, Athens 106 79',
    phone: '+30 210 3612 890',
    email: 'ciao@trattoriavico.gr',
    hours: 'Δε–Σα 12:00–15:30, 19:00–23:00 | Κυ 12:00–16:00',
    hoursEn: 'Mon–Sat 12:00–15:30, 19:00–23:00 | Sun 12:00–16:00',
    social: {
      instagram: 'https://www.instagram.com/trattoriavico/',
      facebook: 'https://www.facebook.com/trattoriavico',
    },
  },
  reservation: {
    defaultTime: '13:00',
    defaultPartySize: 2,
  },
  location: {
    lat: 37.9782,
    lng: 23.7429,
    zoom: 15,
    mapsUrl: 'https://www.google.com/maps?q=37.9782,23.7429',
  },
};
