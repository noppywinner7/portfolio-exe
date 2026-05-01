// Tweaks panel wiring
const { useState: useStateT } = React;

const FONT_OPTIONS = [
  { value: "jetbrains-cormorant", label: "JETBRAINS + CORMORANT" },
  { value: "ibm-playfair",        label: "IBM PLEX + PLAYFAIR" },
  { value: "space-bodoni",        label: "SPACE MONO + BODONI" },
  { value: "vt323-im-fell",       label: "VT323 + IM FELL" },
];
const THEME_OPTIONS = [
  { value: "cream", label: "CREAM" },
  { value: "ash",   label: "ASH" },
  { value: "rust",  label: "RUST" },
  { value: "mono",  label: "MONO" },
];
const DENSITY_OPTIONS = [
  { value: "compact",  label: "COMPACT" },
  { value: "normal",   label: "NORMAL" },
  { value: "spacious", label: "SPACIOUS" },
];

const PortfolioTweaks = ({ tweaks, setTweak }) => (
  <TweaksPanel title="// TWEAKS">
    <TweakSection title="THEME">
      <TweakSelect
        label="COLOR"
        value={tweaks.theme}
        options={THEME_OPTIONS}
        onChange={(v) => setTweak("theme", v)}
      />
      <TweakSelect
        label="FONT PAIR"
        value={tweaks.font}
        options={FONT_OPTIONS}
        onChange={(v) => setTweak("font", v)}
      />
      <TweakSelect
        label="DENSITY"
        value={tweaks.density}
        options={DENSITY_OPTIONS}
        onChange={(v) => setTweak("density", v)}
      />
    </TweakSection>
    <TweakSection title="EFFECTS">
      <TweakSlider
        label="SCANLINES"
        value={tweaks.scanlines}
        min={0} max={1} step={0.05}
        onChange={(v) => setTweak("scanlines", v)}
      />
      <TweakSlider
        label="GRAIN"
        value={tweaks.grain}
        min={0} max={0.3} step={0.01}
        onChange={(v) => setTweak("grain", v)}
      />
      <TweakToggle
        label="VIGNETTE"
        value={tweaks.vignette}
        onChange={(v) => setTweak("vignette", v)}
      />
      <TweakToggle
        label="BOOT ANIMATION"
        value={tweaks.boot}
        onChange={(v) => setTweak("boot", v)}
      />
      <TweakSlider
        label="CURSOR SPEED (s)"
        value={tweaks.cursorSpeed}
        min={0.3} max={2.5} step={0.1}
        onChange={(v) => setTweak("cursorSpeed", v)}
      />
      <TweakToggle
        label="UI SOUND"
        value={tweaks.sound}
        onChange={(v) => { setTweak("sound", v); window.__soundEnabled = v; }}
      />
    </TweakSection>
  </TweaksPanel>
);

window.PortfolioTweaks = PortfolioTweaks;
