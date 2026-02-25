import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const organizationName = 'IShix-g';
const projectName = 'Logify-Unity-Docs';

const config: Config = {
  title: 'Logify-Unity',
  tagline: 'Real-time in-game debug monitor for faster development.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://ishix-g.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: `/${projectName}/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: organizationName, // Usually your GitHub org/user name.
  projectName: projectName, // Usually your repo name.
  // GitHub Pages is sensitive to trailing slashes, so it's safer to set this explicitly
  trailingSlash: false,
  
  onBrokenLinks: 'throw',

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '4BC6A0EBE2CC89F5',
      },
    },
  ],
  
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja'],
    localeConfigs: {
      ja: {
        label: '日本語',
        direction: 'ltr',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsed: false,
          sidebarCollapsible: false,
          routeBasePath: '/',
          // editUrl: 'https://github.com/ishix-g/Logify-Unity-Docs/tree/main/website/',
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        blog: {
          path: 'changelog',
          routeBasePath: 'changelog',
          blogTitle: 'Changelog',
          blogDescription: 'Update history for Logify Unity',
          postsPerPage: 10,
          showReadingTime: false,
          blogSidebarTitle: 'Changelog',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} ${organizationName}`,
            createFeedItems: async (params) => {
              const { blogPosts, defaultCreateFeedItems, ...rest } = params;
              return defaultCreateFeedItems({
                blogPosts: blogPosts.filter((item, index) => index < 10),
                ...rest,
              });
            },
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Logify-Unity',
      logo: {
        alt: 'Logify Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://assetstore.unity.com/packages/slug/360718',
          label: 'BUY NOW',
          position: 'right',
          className: 'navbar-buy-button',
        },
        {
          href: 'https://github.com/IShix-g/Logify-Unity-Docs/discussions',
          label: 'Support',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
            {
              label: 'Installation',
              to: '/getting-started/installation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Support (Discussions)',
              href: 'https://github.com/IShix-g/Logify-Unity-Docs/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Changelog',
              to: '/changelog',
            },
            {
              label: 'Buy Now (Asset Store)',
              href: 'https://assetstore.unity.com/packages/slug/360718',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} ${organizationName}.`,
    },
    algolia: {
      appId: 'FNXGVHVVH7',
      apiKey: '6c150111371a604b65d7788039d747e6',
      indexName: 'Logify-Unity Docs',
      contextualSearch: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp']
    },
    announcementBar: {
      id: 'v1_release_wait',
      content: '🚀 Logify-Unity is coming soon. Stay tuned!',
      backgroundColor: '#321F41',
      textColor: '#E6C8FF',
      isCloseable: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
