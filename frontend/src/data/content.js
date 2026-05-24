/**
 * Contenu statique du site TESSIPI Foundation.
 * Extrait de l'ancien index.html pour piloter les composants par les données.
 */

export const navLinks = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#apropos', label: 'À propos' },
  { href: '#actions', label: 'Nos actions' },
  { href: '#engager', label: "S'engager" },
  { href: '#transparence', label: 'Transparence' },
  { href: '#actualites', label: 'Actualités' },
  { href: '#contact', label: 'Contact' },
]

export const heroStats = [
  { target: 147000, suffix: 'K+', label: 'Bénéficiaires' },
  { target: 12, label: 'Pays' },
  { target: 89, label: 'Cliniques' },
  { target: 2008, label: 'Création' },
]

export const values = [
  { icon: 'fa-heart', title: 'Humanité', description: 'Agir avec compassion pour soulager la souffrance humaine.' },
  { icon: 'fa-shield-alt', title: 'Protection', description: 'Défendre les plus vulnérables et leurs droits fondamentaux.' },
  { icon: 'fa-users', title: 'Inclusion', description: "Promouvoir l'équité et l'accès pour tous, sans discrimination." },
  { icon: 'fa-hands-helping', title: 'Solidarité', description: 'Unir nos forces pour un impact durable et transformateur.' },
]

export const actions = [
  {
    image: '/images/asset_2.jpg',
    alt: 'Santé & Bien-être',
    badge: '147K+ bénéficiaires',
    title: 'Santé & Bien-être',
    description:
      'Consultations médicales, vaccinations, campagnes de dépistage et mise en place de cliniques mobiles dans les zones reculées. Nous formons des agents de santé communautaires pour assurer un suivi continu.',
  },
  {
    image: '/images/asset_3.jpg',
    alt: 'Nutrition & Alimentation',
    badge: '89 programmes actifs',
    title: 'Nutrition & Alimentation',
    description:
      'Distribution de kits alimentaires, programmes de supplémentation nutritionnelle pour les enfants et les femmes enceintes, et éducation aux pratiques alimentaires saines.',
  },
  {
    image: '/images/asset_4.jpg',
    alt: 'Éducation & Développement',
    badge: '45 écoles soutenues',
    title: 'Éducation & Développement',
    description:
      "Construction d'écoles, formation des enseignants, distribution de fournitures scolaires et programmes d'alphabétisation pour adultes. L'éducation est la clé de l'autonomie.",
  },
  {
    image: '/images/asset_5.jpg',
    alt: 'Protection & Inclusion',
    badge: '12 centres de protection',
    title: 'Protection & Inclusion',
    description:
      "Protection des populations vulnérables, défense des droits humains, accompagnement des réfugiés et des personnes déplacées. Création d'espaces sécurisés pour les femmes et les enfants.",
  },
  {
    image: '/images/asset_6.jpg',
    alt: 'Eau, Hygiène & Assainissement',
    badge: "234 points d'eau créés",
    title: 'Eau, Hygiène & Assainissement',
    description:
      "Forage de puits, installation de pompes à eau, construction de latrines et sensibilisation aux pratiques d'hygiène. L'accès à l'eau potable est un droit fondamental.",
  },
  {
    image: '/images/asset_7.jpg',
    alt: 'Urgence & Réhabilitation',
    badge: '24/7 disponible',
    title: 'Urgence & Réhabilitation',
    description:
      "Intervention rapide en cas de catastrophes naturelles ou de conflits, distribution d'aide d'urgence, et programmes de réhabilitation pour la reconstruction des communautés.",
  },
]

export const engagements = [
  {
    icon: 'fa-heart',
    title: 'Faire un don',
    description:
      'Financez des journées de soins, des repas et du matériel. Chaque contribution atteint directement une famille.',
    cta: { label: 'Donner maintenant', type: 'link', target: '#don' },
  },
  {
    icon: 'fa-handshake',
    title: 'Devenir partenaire',
    description:
      'Institutions, entreprises ou ONG : rejoignez-nous pour amplifier notre impact humanitaire.',
    cta: { label: 'Proposer un partenariat', type: 'modal', target: 'partner' },
  },
  {
    icon: 'fa-user-friends',
    title: 'Devenir bénévole',
    description:
      'Rejoignez une journée clinique ou encadrez un nouvel agent de santé. Votre temps change des vies.',
    cta: { label: "S'inscrire", type: 'modal', target: 'volunteer' },
  },
  {
    icon: 'fa-id-card',
    title: 'Adhérer',
    description:
      'Rejoignez la communauté TESSIPI et participez activement à nos actions humanitaires.',
    cta: { label: 'Devenir membre', type: 'modal', target: 'member' },
  },
]

export const transparencyCards = [
  { icon: 'fa-file-alt', title: "Rapports d'activités", description: 'Consultez nos rapports annuels détaillant nos actions et résultats.', link: 'Télécharger' },
  { icon: 'fa-chart-line', title: 'Rapports financiers', description: 'Transparence totale sur l\'utilisation des fonds collectés.', link: 'Consulter' },
  { icon: 'fa-balance-scale', title: 'Politique éthique', description: 'Nos engagements éthiques et déontologiques.', link: 'Lire' },
  { icon: 'fa-user-shield', title: 'Protection des bénéficiaires', description: 'Notre politique de protection des populations vulnérables.', link: 'Découvrir' },
]

export const transparencyStats = [
  { value: '87%', label: 'Des fonds aux programmes' },
  { value: '13%', label: 'Frais administratifs' },
  { value: '100%', label: 'Transparence fiscale' },
  { value: 'A+', label: 'Rating Charity Navigator', rating: true },
]

export const news = [
  {
    image: '/images/asset_8.jpg',
    alt: 'Nouvelle clinique',
    category: 'Nouveau projet',
    title: "Inauguration d'une nouvelle clinique en Afrique de l'Est",
    excerpt:
      'TESSIPI Foundation inaugure une nouvelle clinique pédiatrique qui permettra de soigner plus de 5 000 enfants par an.',
    date: '10 Fév 2026',
  },
  {
    image: '/images/asset_9.jpg',
    alt: 'Formation agents de santé',
    category: 'Événement',
    title: 'Formation internationale des agents de santé communautaire',
    excerpt:
      'Rejoignez notre programme de formation virtuel pour devenir agent de santé communautaire certifié TESSIPI.',
    date: '4 Mar 2026',
  },
  {
    image: '/images/asset_10.jpg',
    alt: 'Témoignage Amina',
    category: 'Témoignage',
    title: 'Comment un dépistage a sauvé une année scolaire',
    excerpt:
      "L'histoire de Amina, une jeune fille dont la vie a été transformée grâce à un simple dépistage de vue.",
    date: '22 Jan 2026',
  },
]

export const impactItems = [
  { icon: 'fa-users', target: 147000, suffix: '+', label: 'Bénéficiaires', sublabel: 'Personnes aidées' },
  { icon: 'fa-globe', target: 12, label: 'Pays', sublabel: "Zones d'intervention" },
  { icon: 'fa-hospital', target: 89, label: 'Cliniques', sublabel: 'Centres de santé' },
  { icon: 'fa-calendar-alt', target: 18, label: 'Année de création', sublabel: "Années d'expérience" },
  { icon: 'fa-tint', target: 234, label: "Points d'eau", sublabel: 'Forages et pompes' },
  { icon: 'fa-graduation-cap', target: 45, label: 'Écoles', sublabel: 'Établissements soutenus' },
]

// Impacts par palier de montant pour la section don
export const donationImpacts = {
  25: "Kit d'hygiène pour une famille",
  50: 'Consultation médicale de base',
  100: 'Consultation médicale complète',
  250: 'Kit alimentaire pour une famille (1 mois)',
  500: "Scolarisation d'un enfant (1 an)",
}

export const donationAmounts = [25, 50, 100, 250, 500]
