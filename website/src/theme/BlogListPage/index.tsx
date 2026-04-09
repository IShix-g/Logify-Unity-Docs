import React, {type ReactNode} from 'react';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import {useLocation} from "@docusaurus/router";

function BlogListPageMetadata(props: Props): ReactNode {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): ReactNode {
    const {metadata, items, sidebar} = props;
    const {pathname} = useLocation();
    const isChangelogPage = pathname.includes('/changelog');
    const isFirstPage = metadata.page === 1;

    return (
        <BlogLayout sidebar={sidebar}>
            {isChangelogPage && isFirstPage && (
                <header className="margin-bottom--lg">
                    <h1 className="margin-bottom--lg">🕒 Changelog</h1>
                    <h2>🚧 Next Release in Progress</h2>
                    <p>
                        To see what we are currently working on for the next update, including live progress and planned fixes, please visit our <a href="https://github.com/IShix-g/Logify-Unity-Docs/milestones" target="_blank" rel="noopener noreferrer">Upcoming Milestones on GitHub</a>
                    </p>
                </header>
            )}
            <BlogPostItems items={items} />
            <BlogListPaginator metadata={metadata} />
        </BlogLayout>
    );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
