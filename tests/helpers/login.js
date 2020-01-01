import { authenticateSession, invalidateSession } from 'ember-simple-auth/test-support';

export async function login() {
  return authenticateSession({
    id: '12345',
    email: 'user1@fitbod.me'
  });
}

export async function logout() {
  return invalidateSession()
}