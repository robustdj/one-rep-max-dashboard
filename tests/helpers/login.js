import { authenticateSession, invalidateSession } from 'ember-simple-auth/test-support';

export async function login(context) {
  let currentUser = {
    id: '12345',
    email: 'user1@fitbod.me'
  }
  let workoutApi = context.owner.lookup('service:workout-api')

  workoutApi.setCurrentUser(currentUser)
  return authenticateSession(currentUser);
}

export async function logout() {
  return invalidateSession()
}