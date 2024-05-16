import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/profile/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Profile | Minimal UI </title>
      </Helmet>

      <AppView />
    </>
  );
}
