import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'À propos',
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
};

export const footerData = {
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],

  //TODO AJOUTER LES LIENS DES RESEAUX
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `<p>&copy; 2024 HelloWorld. Tous droits réservés.</p>`,
};
