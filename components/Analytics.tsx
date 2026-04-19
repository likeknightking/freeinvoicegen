'use client';

import Script from 'next/script';

/**
 * Analytics
 *
 * Injects Google Analytics 4 (GA4) and Microsoft Clarity, both gated by
 * environment variables. When neither env var is set, this component is a
 * no-op and renders nothing — zero runtime cost.
 *
 * GDPR-friendly defaults:
 *  - GA4 is configured with `anonymize_ip: true`
 *  - Clarity has built-in PII masking on by default
 *
 * Required env vars (any/all optional):
 *  - NEXT_PUBLIC_GA_ID       e.g. "G-XXXXXXXXXX"
 *  - NEXT_PUBLIC_CLARITY_ID  e.g. "abcdefghij"
 *
 * IMPORTANT: This file is meant to be IDENTICAL across all 5 MicroSaaS
 * projects. Do not customize per project — keep copy-paste friendly.
 */
export default function Analytics(): JSX.Element | null {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!gaId && !clarityId) {
    return null;
  }

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                send_page_view: true
              });
            `}
          </Script>
        </>
      ) : null}

      {clarityId ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
