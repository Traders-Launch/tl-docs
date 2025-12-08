import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Traders Launch Docs',
  tagline: 'Documentation for Traders Launch',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.traderslaunch.com',
  baseUrl: '/',

  organizationName: 'Traders-Launch',
  projectName: 'tl-docs',

  onBrokenLinks: 'throw',

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
          editUrl: 'https://github.com/Traders-Launch/tl-docs/tree/main/',
          routeBasePath: '/', // Docs at root
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/Traders-Launch/tl-docs/tree/main/',
          path: 'changelog',
          routeBasePath: 'changelog',
          blogTitle: 'Changelog',
          blogDescription: 'Latest updates and changes to Traders Launch',
          blogSidebarTitle: 'Recent Updates',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/tl-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Traders Launch',
      logo: {
        alt: 'Traders Launch Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/api/overview',
          label: 'API',
          position: 'left',
        },
        {
          to: '/changelog',
          label: 'Changelog',
          position: 'left',
        },
        {
          href: 'https://traderslaunch.com',
          label: 'App',
          position: 'right',
        },
        {
          href: 'https://github.com/Traders-Launch/tl-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'API Reference',
              to: '/api/overview',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Traders Launch',
              href: 'https://traderslaunch.com',
            },
            {
              label: 'Changelog',
              to: '/changelog',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/traderslaunch',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/traderslaunch',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Traders Launch. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
