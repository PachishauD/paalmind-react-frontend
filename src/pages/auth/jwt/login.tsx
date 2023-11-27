import { Helmet } from 'react-helmet-async';
// sections
import { JwtLoginView } from 'src/sections/auth/jwt';
// import { Auth0LoginView } from'src/sections/auth/auth0';
// import { AmplifyLoginView } from'src/sections/auth/amplify';
// import { JwtLoginView } from 'src/sections/auth/jwt';
// import { FirebaseLoginView } from'src/sections/auth/firebase';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
}
