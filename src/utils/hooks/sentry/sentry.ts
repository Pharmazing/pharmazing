import * as Sentry from "@sentry/react-native";
import { NavigationContainerRef } from "@react-navigation/core";
import { isRunningInExpoGo } from "expo";
import { isWeb } from "../usePlatform";
import { RefObject } from "react";
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

!isWeb
  ? Sentry.init({
      dsn: "https://3555aa46162c3f2476b5db54c5fdce83@o4507655177895936.ingest.us.sentry.io/4507655191724032",
      debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
      integrations: [
        new Sentry.ReactNativeTracing({
          // Pass instrumentation to be used as `routingInstrumentation`
          routingInstrumentation,
          enableNativeFramesTracking: !isRunningInExpoGo(),

          // ...
        }),
      ],
    })
  : () => null;

export const addBreadcrumbNative = Sentry.addBreadcrumb;
export const captureExceptionNative = Sentry.captureException;
export const ErrorBoundaryNative = Sentry.ErrorBoundary;

export function registerNavigationContainerNative(
  navigation: RefObject<NavigationContainerRef<any>>,
): void {
  routingInstrumentation.registerNavigationContainer(navigation);
}
