/**
 * lib/track.ts — analytics event tracking helper
 *
 * Tiny wrapper over `window.gtag` for custom GA4 events. All calls are
 * SSR-safe and dev-safe: if `window.gtag` is not present (because GA isn't
 * loaded, or we're rendering on the server), every helper is a no-op.
 *
 * IMPORTANT: This file is meant to be IDENTICAL across all 5 MicroSaaS
 * projects (only the canonical-tool-names comment block below differs).
 *
 * ----------------------------------------------------------------------
 * Canonical tool names for THIS project (invoice-generator / freeinvoicegen.app):
 *   - 'invoice_create'
 *   - 'invoice_pdf'
 *   - 'receipt_create'
 *   - 'receipt_pdf'
 *   - 'quote_create'
 *   - 'quote_pdf'
 * ----------------------------------------------------------------------
 *
 * Reference for the other projects (do not call these here):
 *   emi-calculator     : 'emi' | 'mortgage' | 'car_loan' | 'personal_loan' |
 *                        'education_loan'
 *   password-generator : 'password' | 'passphrase' | 'pin' | 'strength_check'
 *   json-formatter     : 'json_format' | 'xml_format' | 'json_to_xml' |
 *                        'xml_to_json' | 'json_to_yaml' | 'json_to_csv' |
 *                        'base64_encode' | 'base64_decode'
 *   compound-interest  : 'compound' | 'simple_interest' | 'savings' |
 *                        'investment'
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params?: GtagParams) => void;
  }
}

/**
 * Send a custom event to GA4. No-op if `window.gtag` isn't available.
 */
export function track(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  try {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params);
  } catch {
    // Swallow — analytics must never break the app.
  }
}

/** Fired when a user actively uses one of the project's tools. */
export function trackToolUsed(toolName: string): void {
  track('tool_used', { tool: toolName });
}

/** Fired when the user copies a result to the clipboard. */
export function trackCopyResult(toolName: string): void {
  track('copy_result', { tool: toolName });
}

/** Fired when the user downloads output (PDF, CSV, image, etc.). */
export function trackDownload(toolName: string, format?: string): void {
  const params: Record<string, string | number | boolean> = { tool: toolName };
  if (format) params.format = format;
  track('download', params);
}

/** Fired when a tool surfaces an error to the user. */
export function trackError(toolName: string, message: string): void {
  track('tool_error', { tool: toolName, message });
}
