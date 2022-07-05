import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link
} from "@remix-run/react";
import globalStyles from './styles/global.css'

export const meta = () => ({
  charset: "utf-8",
  title: "Remix App",
  viewport: "width=device-width,initial-scale=1",
});
export const links = () => ([
  {
    rel: 'stylesheet',
    href: globalStyles
  },
  {
    rel: 'stylesheet',
    href: 'https://cdn.simplecss.org/simple.min.css'
  }
])

function Layout() {
  return (
    <main>
      <header>
        <Link to='/'>
          <h3>Leandro remix📀</h3>
        </Link>
      </header>
      <Outlet />
      <footer><small>© Copyright 2022 Leandro Martinez</small></footer>
    </main>
  );
}

export default function App() {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
