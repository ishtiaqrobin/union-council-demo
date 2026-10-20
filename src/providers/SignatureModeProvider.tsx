"use client";

/**
 * ============================================================================
 * DIGITAL OR MANUAL — one switch, one place
 * ============================================================================
 *
 * WHY A CONTEXT RATHER THAN A PROP
 * --------------------------------
 * Eighteen sheet components draw a signature line, and every one of them needs the same answer to
 * the same question. Threading a boolean through eighteen page components and eighteen sheets
 * would mean eighteen places to forget it — and the failure is invisible: a sheet that silently
 * ignores the toggle still prints, just with the signature the operator asked to suppress.
 *
 * WHAT THE SWITCH IS FOR, IN THE UNION'S OWN WORDS
 * ------------------------------------------------
 * The chairman is often away from the office. If a citizen must wait for him to be physically
 * present before a certificate can be handed over, the software has made the queue longer than the
 * paper requires. So the default is DIGITAL: the certificate prints with his signature and seal,
 * legally complete, and the citizen leaves.
 *
 * But there is also the ordinary case of a chairman who wants to sign by hand — and a rubber
 * stamp that an office has used for twenty years. So the operator can switch the images off and
 * print the same document with an EMPTY signature line, which he then signs in person.
 *
 * 🔴 THE TWO MODES PRODUCE THE SAME DOCUMENT. Neither is a draft, neither is "unofficial", and
 * nothing on the paper says which was used. A signature line is either signed or waiting to be
 * signed — that is the whole difference, and the QR code verifies the document identically either
 * way.
 *
 * ⚠️ THE CITIZEN'S OWN DOWNLOAD HAS NO SWITCH. A self-service download must always be complete,
 * because there is nobody at the counter to finish it by hand. The toggle exists only on the
 * operator's print screen, and `SignatureControls` is rendered only there.
 */
import React, { createContext, useContext, useMemo, useState } from "react";

interface ISignatureModeValue {
  /** When false, sheets print an empty signature line for a hand signature. */
  showDigitalSignature: boolean;
  setShowDigitalSignature: (value: boolean) => void;
}

const SignatureModeContext = createContext<ISignatureModeValue>({
  /**
   * 🔴 DIGITAL IS THE DEFAULT, and the fallback must match it. A sheet rendered OUTSIDE the
   * provider — a test, a storybook, a page that forgot the wrapper — should behave like an
   * ordinary print, not like a document missing its signatures.
   */
  showDigitalSignature: true,
  setShowDigitalSignature: () => {
    // No-op outside the provider, deliberately silent: a missing provider is a page-level wiring
    // mistake, and throwing here would break the sheet rather than merely its toggle.
  },
});

export const SignatureModeProvider = ({
  children,
  initial = true,
}: {
  children: React.ReactNode;
  initial?: boolean;
}) => {
  const [showDigitalSignature, setShowDigitalSignature] = useState(initial);
  const value = useMemo(
    () => ({ showDigitalSignature, setShowDigitalSignature }),
    [showDigitalSignature],
  );
  return (
    <SignatureModeContext.Provider value={value}>
      {children}
    </SignatureModeContext.Provider>
  );
};

export const useSignatureMode = (): ISignatureModeValue =>
  useContext(SignatureModeContext);

/**
 * The signature image, or the empty space a hand signature goes in.
 *
 * ⚠️ ONE COMPONENT OWNS THE DECISION, so eighteen sheets cannot each implement it slightly
 * differently — and a sheet cannot "forget" the toggle, because it never sees the boolean.
 *
 * ⚠️ THE SPACE KEEPS ITS HEIGHT WHEN THE IMAGE IS HIDDEN. Removing the element entirely would
 * collapse the line and shift the whole footer up, which moves text between print pages — a
 * layout bug that only appears on paper.
 */
export const SignatureImage = ({
  url,
  alt,
  className = "",
}: {
  url?: string | null;
  alt: string;
  className?: string;
}) => {
  const { showDigitalSignature } = useSignatureMode();

  /**
   * 🔴 ABSENT AND SUPPRESSED ARE THE SAME PIXELS BUT NOT THE SAME REASON: absent means the union
   * has not uploaded a signature, suppressed means the operator is going to sign by hand. Both
   * leave the line empty, and the sheet prints its own label either way.
   */
  if (!showDigitalSignature || !url) return null;

  return (
    <img
      src={url}
      alt={alt}
      className={`max-h-[30px] max-w-[125px] object-contain relative z-10 mix-blend-multiply opacity-[0.96] ${className}`}
    />
  );
};

/**
 * The round seal, drawn BEHIND AND OVER the signature line rather than beside it.
 *
 * 🔴 WHY IT OVERLAPS. On real Bengali government paper the seal is stamped ACROSS the signature —
 * it is what ties the two together, and a seal neatly placed in its own box looks like a logo. So
 * this is absolutely positioned and semi-transparent, and `pointer-events-none` keeps it from
 * swallowing clicks meant for the control above it.
 *
 * ⚠️ IT IS HIDDEN BY THE SAME SWITCH, NOT A SECOND ONE. A document printed for a hand signature
 * must have an empty box — a seal alone would be a worse lie than a signature alone, because it
 * claims the office approved something no officer signed.
 */
export const SealImage = ({
  url,
  alt,
  className = "",
}: {
  url?: string | null;
  alt: string;
  className?: string;
}) => {
  const { showDigitalSignature } = useSignatureMode();
  if (!showDigitalSignature || !url) return null;

  return (
    <img
      src={url}
      alt={alt}
      className={`absolute left-1/2 -translate-x-[30%] -top-5 max-h-[54px] max-w-[54px] object-contain opacity-[0.92] mix-blend-multiply pointer-events-none transform -rotate-6 select-none z-0 ${className}`}
    />
  );
};

/**
 * The operator's print bar: language, and the digital/manual switch.
 *
 * ⚠️ `no-print` ON THE WRAPPER, because a control that appears on the printed page is a control
 * that ends up on a certificate.
 */
export const SignatureControls = ({
  lang,
  setLang,
}: {
  lang: "bn" | "en";
  setLang: (value: "bn" | "en") => void;
}) => {
  const { showDigitalSignature, setShowDigitalSignature } = useSignatureMode();

  const btn = (active: boolean) =>
    `px-3 py-1 rounded text-sm border ${
      active
        ? "bg-teal-700 text-white border-teal-700"
        : "bg-white text-slate-700 border-slate-300"
    }`;

  return (
    <div className="no-print flex flex-wrap items-center gap-3 self-end">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLang("bn")}
          className={btn(lang === "bn")}
        >
          বাংলা
        </button>
        <button
          type="button"
          onClick={() => setLang("en")}
          className={btn(lang === "en")}
        >
          English
        </button>
      </div>

      {/*
        🔴 THE FIRST OPTION IS ALWAYS THE DIGITAL ONE, because that is the default and the
        ordinary outcome. Putting "manual" first would make the common case look like the
        exception, and an operator in a hurry picks the first checkbox he sees.
      */}
      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded px-3 py-1">
        <input
          type="checkbox"
          checked={showDigitalSignature}
          onChange={(event) => setShowDigitalSignature(event.target.checked)}
          className="rounded text-teal-700"
        />
        ডিজিটাল স্বাক্ষর ও সীলসহ প্রিন্ট করুন
      </label>
      {!showDigitalSignature && (
        <span className="text-xs text-amber-700 bg-amber-50 border border-amber-300 rounded px-2 py-1">
          স্বাক্ষরের ঘর ফাঁকা থাকবে — চেয়ারম্যান নিজ হাতে সই করবেন
        </span>
      )}
    </div>
  );
};
