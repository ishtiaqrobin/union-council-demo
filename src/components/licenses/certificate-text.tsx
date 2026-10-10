import React from "react";

/**
 * ============================================================================
 * THE ONE WAY A SHEET PRINTS A VALUE THE APPLICANT WROTE
 * ============================================================================
 *
 * WHY THIS MODULE EXISTS, AND WHY IT IS NOT A STYLE HELPER.
 *
 * `ownerNameEn` and its siblings are separate COLUMNS, not translations. The plan
 * (§১৬) splits every certificate field three ways:
 *
 *   · the SYSTEM translates it — dates, money, ward, geography, business type;
 *   · the APPLICANT writes it   — institution name, owner's and parents' names,
 *                                 addresses;
 *   · it is ALREADY LATIN       — NID, mobile, TIN, BIN.
 *
 * Only the middle class can be missing, and when it is, the English document has to
 * say so. The previous form of this — `isEn ? (value_en || value_bn) : value_bn` —
 * printed a Bengali name in the English column with NOTHING to distinguish it from a
 * name that really had been transliterated. A bank or an LC desk reading that
 * document cannot tell the two apart, and that distinction is the entire reason the
 * English column is a separate column rather than an on-the-fly translation.
 *
 * 🔴 SO THE FALLBACK IS "BENGALI **PLUS A NOTE**", AND THE WORDS COME FROM THE
 * BACKEND. `data.lang.fallbackNote` is set by `buildCertificateBlock` from the one
 * exported `CERTIFICATE_FALLBACK_NOTE` constant. Two unions printing two different
 * sentences for the same fact would make the platform's own output unattestable, so
 * the sentence is part of the CONTRACT, not of this component.
 *
 * ⚠️ WHY IT IS SHARED BY ALL THREE SHEETS RATHER THAN DUPLICATED. There are three
 * licence certificates (trade, profession, vehicle) and the platform must not print
 * two different rules on them. A helper copied into each file is a helper that will
 * be fixed in one file — the trade sheet got this treatment first, and the other two
 * were still printing a bare Bengali fallback when this module was written. One
 * definition makes that class of drift impossible rather than merely unlikely.
 *
 * ⚠️ AND WHY THERE IS NO SECOND HELPER FOR THE COMPOSED ADDRESS. The premises line
 * (`circle_road_mohalla` / `business_place`) is assembled by the backend from Bengali
 * columns, and its `_en` counterpart is `""` BY CONSTRUCTION — so it looks like a case
 * that needs its own "there is no English for this" helper. It does not. This function
 * already prints exactly the right thing for it: an empty `enValue` falls through to
 * the Bengali plus the note, and a deployment that DOES fill the English (the demo
 * data does) prints that instead of a note it does not need. A second export for the
 * narrow case was written and then deleted, because it could only ever print a subset
 * of what this one prints.
 */
export const certificateWritten = (
  enValue: string | undefined,
  bnValue: string | undefined,
  fallbackNote: string | undefined,
): React.ReactNode => {
  const english = (enValue ?? "").trim();
  if (english.length > 0) return <>{english}</>;

  return (
    <>
      {bnValue}
      {fallbackNote ? (
        <span className="text-[10px] font-normal italic text-black/70">
          {" "}
          {fallbackNote}
        </span>
      ) : null}
    </>
  );
};
