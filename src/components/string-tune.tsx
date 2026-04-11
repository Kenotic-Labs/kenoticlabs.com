"use client";

import { useEffect } from "react";

export function StringTuneInit() {
  useEffect(() => {
    async function init() {
      const mod = await import("@fiddle-digital/string-tune");
      const StringTune = mod.default;
      const st = StringTune.getInstance();

      // 05 - Glide disabled (conflicts with Lenis smooth scroll)
      // 06 - Cursor (custom cursor)
      if (mod.StringCursor) st.use(mod.StringCursor, { lerp: 0.75 });
      // 08 - Spotlight (cursor-tracking light)
      if (mod.StringSpotlight) st.use(mod.StringSpotlight);
      // 09 - Impulse (springlike cursor response)
      if (mod.StringImpulse) st.use(mod.StringImpulse);
      // 015 - Progress (scroll position tracking)
      if (mod.StringProgress) st.use(mod.StringProgress);

      st.start(60);
    }
    init().catch(console.error);
  }, []);

  return null;
}
