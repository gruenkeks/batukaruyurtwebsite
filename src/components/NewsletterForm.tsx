"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function NewsletterForm({ compact = false, showText = true }: { compact?: boolean; showText?: boolean }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (window as any).ml_webform_success_30581134 = () => {
      setIsLoading(false);
      setIsSuccess(true);
    };
  }, []);

  return (
    <div id="mlb2-30581134" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-30581134">
      <Script src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" strategy="afterInteractive" />

      {!isSuccess ? (
        <div className={`rounded-lg border border-white/15 bg-black/50 text-white/90 shadow-sm backdrop-blur-md ${compact ? "p-3" : "p-4"}`}>
          {showText && (
            compact ? (
              <div className="mb-2">
                <h4 className="text-[12px] font-medium leading-tight text-white/85">Newsletter</h4>
                <p className="mt-1 text-[11px] leading-snug text-white/70">If you are interested in this project, sign up for important development news.</p>
              </div>
            ) : (
              <div className="mb-3">
                <h4 className="text-lg font-medium tracking-tight">Newsletter</h4>
                <p className="mt-1 text-sm text-white/70">If you are interested in this project, sign up for important development news.</p>
              </div>
            )
          )}
          <form
            className="ml-block-form"
            action="https://assets.mailerlite.com/jsonp/1782534/forms/164857781543765338/subscribe"
            method="post"
            onSubmit={() => setIsLoading(true)}
          >
            <div className={`flex items-stretch gap-2 ${compact ? "" : "md:flex-row flex-col md:items-center"}`}>
              <input
                aria-label="email"
                aria-required="true"
                type="email"
                name="fields[email]"
                placeholder="Email"
                autoComplete="email"
                inputMode="email"
                required
                className={`${compact ? "h-9 text-sm" : "py-2"} min-w-0 flex-1 rounded-md border border-white/20 bg-white/5 px-3 text-white placeholder-white/60 outline-none ring-0 focus:border-white/40 caret-white`}
                style={{ WebkitTextFillColor: "#ffffff" }}
              />
              <button
                type="submit"
                className={`${compact ? "h-9 px-3 text-xs" : "px-4 py-2 text-sm"} inline-flex items-center justify-center rounded-md bg-white/90 font-medium text-black hover:bg-white`}
                disabled={isLoading}
              >
                {isLoading ? "Subscribing…" : "Subscribe"}
              </button>
            </div>
            <input type="hidden" name="ml-submit" value="1" />
            <input type="hidden" name="anticsrf" value="true" />
          </form>
        </div>
      ) : (
        <div className="rounded-lg border border-white/15 bg-black/40 p-4 text-white/90 backdrop-blur-md">
          <h4 className="text-lg font-medium">Thank you!</h4>
          <p className="mt-1 text-sm text-white/75">You have successfully joined our subscriber list.</p>
        </div>
      )}
    </div>
  );
}


