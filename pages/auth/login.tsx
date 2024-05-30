import { sui } from "@/lib/hooks/sui";
import {
  FACEBOOK_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  TWITCH_CLIENT_ID,
} from "@/lib/shared/openid";
import { first } from "@/lib/shared/utils";
import {
  getFacebookAuthUrl,
  getGoogleAuthUrl,
  getTwitchAuthUrl,
  relativeToCurrentEpoch,
  withNewZkLoginSession,
} from "@shinami/nextjs-zklogin/client";
import { useRouter } from "next/router";

// This page should be installed at route "/auth/login".
// If you need to use a different path, set env NEXT_PUBLIC_LOGIN_PAGE_PATH to override the default,
// and update "callbackBaseUrl" accordingly.
export default withNewZkLoginSession(
  () => relativeToCurrentEpoch(sui),
  ({ session }) => {
    const router = useRouter();
    console.log(router.query,"redci")
    // const redirectTo = first(router.query.redirectTo);
    const redirectTo = window.location.origin;
    console.log(redirectTo,"redci")
    const callbackBaseUrl = new URL("auth/", window.location.origin);
    console.log(callbackBaseUrl,"callback")

    const url = getGoogleAuthUrl(
      session,
      GOOGLE_CLIENT_ID!,
      new URL("google", 'http://localhost:3000'),
      redirectTo,
    );

    console.log(url,"url")
    // Render sign-in options based on what's configured.
    return (
      <>
      <div className='relative w-full justify-center items-center flex flex-col xl:pt-25'>
        {GOOGLE_CLIENT_ID && (
          <div>
            <button
              onClick={() => {
                router.replace(
                  getGoogleAuthUrl(
                    session,
                    GOOGLE_CLIENT_ID!,
                    new URL("google", 'http://localhost:3000'),
                    redirectTo,
                  ),
                );
              }}
            >
              Sign in with Google
            </button>
          </div>
        )}
        {FACEBOOK_CLIENT_ID && (
          <div>
            <button
              onClick={() => {
                router.replace(
                  getFacebookAuthUrl(
                    session,
                    FACEBOOK_CLIENT_ID!,
                    new URL("facebook", callbackBaseUrl),
                    redirectTo,
                  ),
                );
              }}
            >
              Sign in with Facebook
            </button>
          </div>
        )}
        {TWITCH_CLIENT_ID && (
          <div>
            <button
              onClick={() => {
                router.replace(
                  getTwitchAuthUrl(
                    session,
                    TWITCH_CLIENT_ID!,
                    new URL("twitch", callbackBaseUrl),
                    redirectTo,
                  ),
                );
              }}
            >
              Sign in with Twitch
            </button>
          </div>
        )}
        </div>
      </>
    );
  },
);
