import { Helmet } from 'react-helmet-async';

import { AppView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function Admin2() {
  return (
    <>
      <Helmet>
        <title> Skills 2.0 Match | Admin </title>
      </Helmet>

      <AppView />
    </>
  );
}
