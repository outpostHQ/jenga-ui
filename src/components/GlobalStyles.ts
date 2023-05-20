import { createGlobalStyle } from 'styled-components';

import { TOKENS } from '../tokens';

interface GlobalStylesProps {
  bodyStyles?: { [key: string]: string };
  fonts?: boolean;
  publicUrl?: string;
  font?: string;
  monospaceFont?: string;
  applyLegacyTokens?: boolean;
}

const BODY_STYLES = {
  'background-color': 'white !important',
  'font-family': 'var(--font)',
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
  margin: '0',
  padding: '0',
  color: 'rgba(20, 20, 70, .75)',
  'font-size': '14px',
  'line-height': '20px',
  'letter-spacing': '0.02em',
  'font-weight': '400',
};

const fontsProvider = ({ publicUrl = '' }) => `
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(${publicUrl}/fonts/Inter-Regular.woff2) format('woff2'),
      url(${publicUrl}/fonts/Inter-Regular.woff) format('woff');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(${publicUrl}/fonts/Inter-Medium.woff2) format('woff2'),
      url(${publicUrl}/fonts/Inter-Medium.woff) format('woff');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(${publicUrl}/fonts/Inter-SemiBold.woff2) format('woff2'),
      url(${publicUrl}/fonts/Inter-SemiBold.woff) format('woff');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(${publicUrl}/fonts/Inter-Bold.woff2) format('woff2'),
      url(${publicUrl}/fonts/Inter-Bold.woff) format('woff');
  }
  @font-face {
    font-family: 'Source Code Pro';
    src: url('${publicUrl}/fonts/SourceCodePro-Regular.woff2') format('woff2'),
      url('${publicUrl}/fonts/SourceCodePro-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'JetBrains Mono';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(${publicUrl}/fonts/JetBrainsMono-Regular.woff2) format('woff2'),
      url(${publicUrl}/fonts/JetBrainsMono-Regular.woff) format('woff');
  }

  @font-face {
    font-family: 'JetBrains Mono';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(${publicUrl}/fonts/JetBrainsMono-Bold.woff2) format('woff2'),
      url(${publicUrl}/fonts/JetBrainsMono-Bold.woff) format('woff');
  }

  @font-face {
    font-family: 'text-security-disc';
    src: url(${publicUrl}/fonts/text-security-disc.woff2) format('woff2'),
      url(${publicUrl}/fonts/text-security-disc.woff) format('woff');
  }
`;

export const GlobalStyles = createGlobalStyle`
  body {
    ${({ applyLegacyTokens }: GlobalStylesProps) => {
      return applyLegacyTokens
        ? Object.entries(TOKENS)
            .map(([key, value]) => {
              // `inherit` value in custom property is reserved for inheritance behavior
              if (value === 'inherit') {
                // so we should rewrite it to contain the actual `inherit` value.
                value = `var(--non-existent-${key}, inherit)`;
              }

              return `--${key}: ${value};`;
            })
            .join('\n    ')
        : '';
    }}
    ${({ bodyStyles }: GlobalStylesProps) => {
      return Object.entries({ ...BODY_STYLES, ...bodyStyles })
        .map(([key, value]) => {
          return `${key}: ${value};`;
        })
        .join('\n    ');
    }}
  }

  :root{
         --op-white: #ffffff;
  --op-black: #000000;

  /* Purple */
  --op-purple-50: #f2f2ff;
  --op-purple-100: #efebff;
  --op-purple-200: #e1daff;
  --op-purple-300: #d7ceff;
  --op-purple-400: #beb3ff;
  --op-purple-500: #a297ff;
  --op-purple-600: #7f7aff;
  --op-purple-700: #6864d4;
  --op-purple-800: #5754ae;
  --op-purple-900: #464287;
  --op-purple-1100: #393568;
  --op-purple-1200: #272447;

  /* Pink */
  --op-pink-50: #fffbff;
  --op-pink-100: #ffecf2;
  --op-pink-200: #ffd8e8;
  --op-pink-300: #ffafd6;
  --op-pink-400: #ee8cbf;
  --op-pink-500: #cf72a4;
  --op-pink-600: #b1598a;
  --op-pink-700: #944170;
  --op-pink-800: #772957;
  --op-pink-900: #5b1140;
  --op-pink-1100: #3c0028;
  --op-pink-1200: #3c0028;

  /* Red */
  --op-red-50: #fffbff;
  --op-red-100: #ffedeb;
  --op-red-200: #ffdad7;
  --op-red-300: #ffb3ae;
  --op-red-400: #ff8983;
  --op-red-500: #ed6561;
  --op-red-600: #cc4c4a;
  --op-red-700: #aa3334;
  --op-red-800: #8a1b1f;
  --op-red-900: #68000c;
  --op-red-1100: #410005;
  --op-red-1200: #410005;

  /* Yellow */
  --op-yellow-50: #fffbff;
  --op-yellow-100: #ffeee2;
  --op-yellow-200: #ffdcc1;
  --op-yellow-300: #ffb877;
  --op-yellow-400: #ee9742;
  --op-yellow-500: #ce7e2a;
  --op-yellow-600: #af650f;
  --op-yellow-700: #8e4f00;
  --op-yellow-800: #6c3a00;
  --op-yellow-900: #4c2700;
  --op-yellow-1100: #2e1500;
  --op-yellow-1200: #2e1500;

  /* Green */
  --op-green-50: #f7ffed;
  --op-green-100: #cdffb1;
  --op-green-200: #b6f398;
  --op-green-300: #9bd67f;
  --op-green-400: #81ba66;
  --op-green-500: #679f4e;
  --op-green-600: #4e8437;
  --op-green-700: #366a21;
  --op-green-800: #1e5108;
  --op-green-900: #0e3900;
  --op-green-1100: #062100;
  --op-green-1200: #062100;

  /* Orange */
  --op-orange-50: #fffbff;
  --op-orange-100: #ffede6;
  --op-orange-200: #ffdbcc;
  --op-orange-300: #ffb693;
  --op-orange-400: #ff8c51;
  --op-orange-500: #e17134;
  --op-orange-600: #c0591c;
  --op-orange-700: #a04100;
  --op-orange-800: #7a3000;
  --op-orange-900: #562000;
  --op-orange-1100: #351000;
  --op-orange-1200: #351000;

  /* Blue */
  --op-blue-50: #fdfbff;
  --op-blue-100: #ecf1ff;
  --op-blue-200: #d5e3ff;
  --op-blue-300: #a8c8ff;
  --op-blue-400: #7bacfa;
  --op-blue-500: #5f92dd;
  --op-blue-600: #4378c1;
  --op-blue-700: #255ea6;
  --op-blue-800: #004689;
  --op-blue-900: #003061;
  --op-blue-1100: #001b3c;
  --op-blue-1200: #001b3c;

  /* Teal */
  --op-teal-50: #f2fffc;
  --op-teal-100: #b1fff7;
  --op-teal-200: #71f7ed;
  --op-teal-300: #4fdbd1;
  --op-teal-400: #25beb5;
  --op-teal-500: #00a29a;
  --op-teal-600: #00857f;
  --op-teal-700: #006a64;
  --op-teal-800: #00504b;
  --op-teal-900: #003734;
  --op-teal-1100: #00201e;
  --op-teal-1200: #00201e;

  /* Violet */
  --op-violet-50: #fffbff;
  --op-violet-100: #f3eeff;
  --op-violet-200: #e3dfff;
  --op-violet-300: #c4c0ff;
  --op-violet-400: #a6a1fd;
  --op-violet-500: #8b87e0;
  --op-violet-600: #726dc4;
  --op-violet-700: #5954a9;
  --op-violet-800: #413b90;
  --op-violet-900: #292278;
  --op-violet-1100: #171347;
  --op-violet-1200: #0e0b29;

  /* Zinc */
  --op-zinc-50: #fafafa;
  --op-zinc-100: #f4f4f5;
  --op-zinc-200: #e4e4e7;
  --op-zinc-300: #d4d4d8;
  --op-zinc-400: #a1a1aa;
  --op-zinc-500: #71717a;
  --op-zinc-600: #52525b;
  --op-zinc-700: #3f3f46;
  --op-zinc-800: #27272a;
  --op-zinc-900: #18181b;
  --op-zinc-1100: #121312;
  --op-zinc-1200: #010101;

  /* Gray */
  --op-gray-50: #fffbff;
  --op-gray-100: #f4eff4;
  --op-gray-200: #e5e1e6;
  --op-gray-300: #c9c5ca;
  --op-gray-400: #adaaaf;
  --op-gray-500: #929094;
  --op-gray-600: #78767a;
  --op-gray-700: #5f5e62;
  --op-gray-800: #47464a;
  --op-gray-900: #313034;
  --op-gray-1100: #1c1b1f;
  --op-gray-1200: #121312;
  }

html[data-theme='light'] {
  /* SURFACES */

}

/* dark theme variables */

html[data-theme='dark'] {
  --op-shadow-color: rgba(0, 0, 0, 0.33);

  /* SURFACES */

  --op-surface-color: var(--op-zinc-1100);
  --op-surface-subdued-color: var(--op-zinc-900);

  --op-surface-hovered-color: var(--op-zinc-800);
  --op-surface-pressed-color: var(--op-zinc-1200);
  --op-surface-active-color: rgba(39, 39, 42, 0.5);
  --op-surface-input-color: var(--op-zinc-1100);

  --op-surface-secondary-color: var(--op-pink-700);
  --op-surface-secondary-subdued-color: var(--op-pink-1100);
  --op-surface-secondary-hovered-color: var(--op-pink-600);
  --op-surface-secondary-pressed-color: var(--op-pink-900);
  --op-surface-secondary-light-color: var(--op-pink-1100);

  --op-surface-primary-color: var(--op-violet-700);
  --op-surface-primary-subdued-color: var(--op-violet-1200);
  --op-surface-primary-hovered-color: var(--op-violet-500);
  --op-surface-primary-pressed-color: var(--op-violet-1100);
  --op-surface-primary-light-color: var(--op-violet-800);

  --op-surface-critical-color: var(--op-red-700);
  --op-surface-critical-subdued-color: var(--op-orange-1100);
  --op-surface-critical-hovered-color: var(--op-red-600);
  --op-surface-critical-pressed-color: var(--op-red-900);

  --op-surface-warning-color: var(--op-yellow-700);
  --op-surface-warning-subdued-color: var(--op-yellow-1100);

  --op-surface-success-color: var(--op-green-700);
  --op-surface-success-subdued-color: var(--op-green-1100);

  /* TEXT */
  --op-text-color: var(--op-gray-100);
  --op-text-soft-color: var(--op-gray-300);
  --op-text-strong-color: var(--op-gray-500);
  --op-text-disabled-color: var(--op-gray-800);

  --op-text-critical-color: var(--op-red-500);
  --op-text-warning-color: var(--op-yellow-500);
  --op-text-success-color: var(--op-green-500);
  --op-text-secondary-color: var(--op-pink-500);

  --op-text-primary-color: var(--op-purple-700);
  --op-text-on-primary-color: var(--op-red-50);

  /* ICONS */
  --op-icon-color: var(--op-gray-100);
  --op-icon-disabled-color: var(--op-gray-300);

  --op-icon-critical-color: var(--op-red-500);
  --op-icon-warning-color: var(--op-yellow-500);
  --op-icon-success-color: rgb(103, 159, 78);

  --op-icon-primary-color: var(--op-violet-500);
  --op-icon-secondary-color: var(--op-pink-500);
  --op-icon-on-primary-color: var(--op-red-50);

  /* BORDERS */

  /* don't use  */

  --op-border-color: #47464a88;
  --op-border-critical-color: var(--op-red-500);
  --op-border-warning-color: var(--op-yellow-500);
  --op-border-success-color: #689e4f;
  --op-border-primary-color: #bbb8e5;
  --op-border-secondary-color: var(--op-pink-500);
  --op-border-focus-color: var(--op-teal-500);
}

  html {


  --op-surface-color: var(--op-white);
  --op-surface-subdued-color: var(--op-zinc-50);
  --op-surface-hovered-color: var(--op-zinc-100);
  --op-surface-pressed-color: var(--op-zinc-200);
  --op-surface-active-color: rgba(228, 228, 231, 0.5);
  --op-surface-input-color: var(--op-white);

  --op-surface-secondary-color: var(--op-pink-700);
  --op-surface-secondary-subdued-color: var(--op-pink-100);
  --op-surface-secondary-hovered-color: var(--op-pink-400);
  --op-surface-secondary-pressed-color: var(--op-pink-800);
  --op-surface-secondary-light-color: var(--op-orange-50);

  --op-surface-primary-color: var(--op-violet-600);
  --op-surface-primary-subdued-color: var(--op-violet-100);
  --op-surface-primary-hovered-color: var(--op-violet-400);
  --op-surface-primary-pressed-color: var(--op-violet-800);
  --op-surface-primary-light-color: var(--op-violet-100);

  --op-surface-critical-color: var(--op-red-700);
  --op-surface-critical-subdued-color: var(--op-red-200);
  --op-surface-critical-hovered-color: var(--op-red-400);
  --op-surface-critical-pressed-color: var(--op-red-800);

  --op-surface-warning-color: var(--op-yellow-500);
  --op-surface-warning-subdued-color: var(--op-yellow-100);

  --op-surface-success-color: var(--op-green-600);
  --op-surface-success-subdued-color: var(--op-green-50);

  /* TEXT */
  --op-text-color: var(--op-gray-1100);
  --op-text-soft-color: var(--op-gray-700);
  --op-text-strong-color: var(--op-gray-900);
  --op-text-disabled-color: var(--op-gray-200);

  --op-text-critical-color: var(--op-red-700);
  --op-text-warning-color: var(--op-yellow-600);
  --op-text-success-color: var(--op-green-600);
  --op-text-secondary-color: var(--op-pink-700);

  --op-text-on-primary-color: var(--op-red-50);
  --op-text-primary-color: var(--op-purple-700);

  /* ICONS */
  --op-icon-color: var(--op-gray-1100);
  --op-icon-disabled-color: var(--op-gray-300);
  --op-icon-on-primary-color: var(--op-red-50);

  --op-icon-critical-color: var(--op-red-700);
  --op-icon-warning-color: var(--op-yellow-600);
  --op-icon-success-color: var(--op-green-600);
  --op-icon-primary-color: var(--op-violet-600);
  --op-icon-secondary-color: var(--op-pink-500);

  --op-text-placeholder-color: #C9C5CA;
  /* BORDERS */

  --op-border-color: var(--op-gray-200);
  --op-border-critical-color: rgba(170, 51, 52, 0.533);
  --op-border-warning-color: rgba(207, 126, 41, 0.533);
  --op-border-success-color: rgba(78, 132, 55, 0.533);
  --op-border-primary-color: rgba(114, 109, 196, 0.533);
  --op-border-secondary-color: rgba(148, 65, 112, 0.533);
  --op-border-focus-color: rgb(79, 219, 209);
  --op-shadow-color: rgba(188, 187, 232, 0.329);

    --font: ${({ font }: GlobalStylesProps) =>
      font ||
      'Inter'}, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    --monospace-font: ${({ monospaceFont }) =>
      `${
        monospaceFont ? `${monospaceFont}, ` : ''
      }Menlo, Monaco, Consolas, 'Courier New', monospace;}`}

  .jenga-notification-container {
    min-width: 288px;
    max-width: 340px;
    width: calc(100vw - 32px);
    position: fixed;
    top: 32px;
    right: 16px;
    z-index: 999999;
  }

  .jenga-notifications {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
  }

  .jenga-notification-enter {
    opacity: 0;
    max-height: 0px;
    margin-bottom: 0px;
    transform: translate(100%, 0);
  }

  .jenga-notification-enter-active {
    opacity: 1;
    max-height: 56px;
    margin-bottom: 8px;
    transform: translate(0, 0);
    transition: all 300ms ease-in;

    & > * {
      margin-bottom: 0px;
    }
  }

  .jenga-notification-exit {
    opacity: 1;
    margin-bottom: 8px;
    max-height: 56px;
    transform: translate(0, 0);
  }

  .jenga-notification-exit-active {
    opacity: 0;
    max-height: 0px;
    margin-bottom: 0px;
    transform: translate(100%, 0);
    transition: all 300ms ease-in;

    & > * {
      margin-bottom: 0px;
    }
  }

  b, strong {
    font-weight: var(--bold-font-weight, 700);
  }

  [type=reset], [type=submit], button, html [type=button] {
    -webkit-appearance: none;
  }

  code {
    font-family: var(--monospace-font);
  }

  ${({ fonts, publicUrl }: GlobalStylesProps) =>
    fonts === false ? '' : fontsProvider({ publicUrl })}

  // Prism Code
  code[class*="language-"],
  pre[class*="language-"] {
    color: var(--dark-color);
    background: none;
    font-family: "Source Code Pro", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    border-radius: 4px;
    border: none;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
    text-shadow: none;
    /*background: #b3d4fc;*/
  }

  pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
  code[class*="language-"]::selection, code[class*="language-"] ::selection {
    text-shadow: none;
    /*background: #b3d4fc;*/
  }

  @media print {
    code[class*="language-"],
    pre[class*="language-"] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*="language-"] {
    overflow: auto;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: transparent;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    border-radius: .3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: var(--dark-04-color);
  }

  .token.keyword,
  .token.tag,
  .token.operator,
  .token.punctuation {
    color: #993388;
  }

  .namespace {
    opacity: .7;
  }

  .token.property,
  .token.boolean,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: var(--pink-color);
  }

  .token.entity,
  .token.number {
    color: #30A666;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: var(--purple-text-color);
  }

  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: var(--dark-color);
  }

  .token.atrule,
  .token.attr-value {
    color: var(--dark-color);
  }

  .token.atrule,
  .token.keyword {
    font-weight: 500;
  }

  .token.function,
  .token.class-name {
    color: var(--pink-color);
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: var(--pink-color);
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .loading-spinner{
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

`;
