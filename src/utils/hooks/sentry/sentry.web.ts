import * as Sentry from '@sentry/react';
import { isWeb } from '../usePlatform';

// Sentry.init({
//   dsn: "https://1da2829fe68218bfe795f83b61931515@o4507655177895936.ingest.us.sentry.io/4507663472590848",
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration(),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: ["localhost:8081", /^https:\/\/yourserver\.io\/api/],
//   // Session Replay
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

isWeb
  ? () =>
      Sentry.init({
        dsn: 'https://1da2829fe68218bfe795f83b61931515@o4507655177895936.ingest.us.sentry.io/4507663472590848',
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: [
          'localhost',
          /^https:\/\/yourserver\.io\/api/,
        ],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
      })
  : () => null;

export const addBreadcrumb = Sentry.addBreadcrumb;
export const captureException = Sentry.captureException;
export const ErrorBoundary = Sentry.ErrorBoundary;

export function registerNavigationContainerWeb(_: any): void {}
