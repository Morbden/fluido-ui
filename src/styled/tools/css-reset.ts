export const cssReset = `
:root,
body {
  font-family: 'system-ui', 'sans-serif';
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  scroll-behavior: smooth;
}
@supports (-webkit-touch-callout: none) {
  :root,
  body {
    min-height: -webkit-fill-available;
  }
}
*,
*::after,
*::before {
  --flui-color-opacity: 1;
  --flui-bg-opacity: 1;
  --flui-stroke-opacity: 1;
  --flui-fill-opacity: 1;
  --flui-bgColor-opacity: 1;
  box-sizing: border-box;
  -webkit-tap-highlight: transparent;
  user-select: none;
  margin: 0;
  padding: 0;
}
:is(button, a, input, textarea, select, [contentEditable='true']) {
  user-select: none;
}
button {
  cursor: pointer;
}
:any-link {
  text-decoration: inherit;
  color: inherit;
}
[disabled] {
  cursor: default;
}
.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}
.sr-only-focusable:focus,
.sr-only-focusable:active {
  clip: auto !important;
  -webkit-clip-path: none !important;
  clip-path: none !important;
  height: auto !important;
  margin: auto !important;
  overflow: visible !important;
  width: auto !important;
  white-space: normal !important;
}
hr {
  height: 1px;
  min-height: 1px;
  max-height: 1px;
  border: none;
  margin: 1rem 0;
  background-color: rgba(0, 0, 0, 0.12);
}
hr.vertical {
  min-height: unset;
  max-height: unset;
  width: 1px;
  max-width: 1px;
  min-width: 1px;
  margin: 0 1rem;
}
`
