import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


const config: Config = {
  title: 'Technical Writer Portfolio - Silvana Morera Claramunt',
  tagline: 'I document APIs, SDKs, Docker, CLI workflows, and developer onboarding paths using real hands-on testing. API documentation, developer tools, and docs-as-code workflows for modern engineering teams.',
  future: {
    v4: true, 
  },
  url: 'https://silvanaMorera.github.io',
  baseUrl: '/tech-writer-portfolio/',
  organizationName: 'silvanaMorera', 
  projectName: 'tech-writer-portfolio', 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Portfolio',
      /*logo: {
        alt: 'Silvana Morera Logo',
        src: 'img/logo.svg',
      },
      */
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Samples',
        },
        {
          href: 'https://github.com/silvanaMorera/tech-writer-portfolio.git',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Silvana Morera Claramunt`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
