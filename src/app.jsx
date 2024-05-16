/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import ThemeProvider from 'src/theme';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
