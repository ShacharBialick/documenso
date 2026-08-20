import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { i18n, type MessageDescriptor } from '@lingui/core';

export const appMetaTags = (title?: MessageDescriptor) => {
  const description =
    'TheOSCompany Signing Service — send, sign and manage documents securely online.';

  return [
    {
      title: title ? `${i18n._(title)} - TheOSCompany Signing Service` : 'TheOSCompany Signing Service',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content:
        'TheOSCompany Signing Service, document signing, electronic signature, sign documents online',
    },
    {
      name: 'author',
      content: 'The OS Company',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'TheOSCompany Signing Service',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};
