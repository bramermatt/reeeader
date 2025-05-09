import { Clerk } from '@clerk/clerk-js'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const clerk = new Clerk(clerkPubKey)
await clerk.load()

const currentPath = window.location.pathname;

if (clerk.user) {
  const userName = clerk.user.firstName || clerk.user.username || 'User';
  if (currentPath === '/index.html' || currentPath === '/') {
    document.getElementById('app').innerHTML = `
      <div id="user-button"></div>
      <p>Hi ${userName}, <a href="pages/home.html">turn page to enter site</a></p>
    `;
  } else {
    document.getElementById('app').innerHTML = `
      <div id="user-button"></div>
    `;
  }

  const userButtonDiv = document.getElementById('user-button');
  clerk.mountUserButton(userButtonDiv);
} else {
  document.getElementById('app').innerHTML = `
    <div id="sign-in"></div>
  `;

  const signInDiv = document.getElementById('sign-in');
  clerk.mountSignIn(signInDiv);
}