// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Alex Ilin Knowledge Base',
  tagline: 'Knowledge is power',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://engilyin.github.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'engilyin', // Usually your GitHub org/user name.
  projectName: 'kb', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  deploymentBranch: "gh-pages",
  githubHost: "https://github.com/engilyin",
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins:
  [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        // Options here
        indexDocs: true,
        indexPages: true,
        indexBlog: false,
      },
    ]
  ],


  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          editUrl: 'https://github.com/engilyin/kb',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
          sidebarItemsGenerator: async function ({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            return processSideBar(sidebarItems)
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',  // Default theme
        disableSwitch: false,  // Allow switching between dark and light themes
        respectPrefersColorScheme: true,  // Uses system's preference
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: 'Alex Ilin Knowledge Base',
        logo: {
          alt: 'Alex Ilin KB Logo',
          src: 'img/logo.jpg',
        },
        items: [
          {
            type: 'search', // Add search to the navbar
            position: 'right',
          },
          {
            href: 'https://github.com/engilyin/kb',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Alex Ilin. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['powershell','java', 'csharp', 'cpp', 'c', 'cmake', 'css-extras', 'dart', 'diff', 'docker', 'sass', 'sql', 'typescript', 'yaml', 'git', 'makefile', 'log', 'json', 'javastacktrace', 'graphql', 'gradle', 'plsql', 'properties', 'python', 'regex', 'hcl', 'groovy'],
      },
    }),
};

function processSideBar(items) {
  // const r = items.map( i => {
  //   if( i.type = 'category') {
  //     return { ...i, items: processSideBar(i.items)}
  //   } else {
  //     return i
  //   }
  // })
  return items
}

export default config;
