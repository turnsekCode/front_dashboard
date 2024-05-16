import { Helmet } from 'react-helmet-async';

import {AddProject} from 'src/sections/add-projects/view';


// ----------------------------------------------------------------------

export default function ProjectPage() {
  return (
    <>
      <Helmet>
        <title> Products | Minimal UI </title>
      </Helmet>

      <AddProject />
    </>
  );
}
