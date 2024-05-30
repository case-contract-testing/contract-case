// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ContractCase Contract Testing',
  tagline: 'Contracts by Example',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://case.contract-testing.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'case-contract-testing', // Usually your GitHub org/user name.
  projectName: 'case', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',*
        },
        blog: false,
        /*     blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },*/
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ContractCase-social-card.jpg',
      navbar: {
        title: 'ContractCase',
        logo: {
          alt: 'ContractCase Contract Testing',
          src: 'assets/suitcase.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/case-contract-testing/case',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
              {
                label: 'What is contract testing?',
                to: '/docs/what-is-contract-testing',
              },
              {
                label: 'Defining contracts',
                to: '/docs/defining-contracts/',
              },
              {
                label: 'Verifying contracts',
                to: '/docs/verifying-contracts/',
              },
              {
                label: 'Reference',
                to: '/docs/category/reference',
              },
            ],
          },
          {
            title: 'Download',
            items: [
              {
                label: 'npm',
                href: 'https://www.npmjs.com/package/@case-contract-testing/case',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Report a bug',
                href: 'https://github.com/case-contract-testing/case/issues/new',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/case-contract-testing/case',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Timothy Jones and the ContractCase Contract Testing authors`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
        themeConfig: {
          additionalLanguages: ['bash', 'java', 'gradle', 'xml', 'typescript'],
        },
      },
    }),
};

module.exports = config;
