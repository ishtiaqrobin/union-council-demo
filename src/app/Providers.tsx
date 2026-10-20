"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import { SignatureModeProvider } from "@/providers/SignatureModeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/*
        🔴 ONE PROVIDER FOR THE WHOLE APP, NOT ONE PER PAGE.

        Eighteen sheets ask the same question — "print the digital signature, or leave the line
        empty for a hand signature?" — and a per-page provider would reset to DIGITAL on every
        navigation. An operator who switches to manual for a batch of certificates would have to
        switch again on each page, which is how a control like this ends up not being used.
      */}
      <SignatureModeProvider>
        <Toaster />
        {children}
      </SignatureModeProvider>
    </NextThemesProvider>
  );
}
