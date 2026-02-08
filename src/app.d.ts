import type { Session, User } from '$lib/server/auth';

declare global {
    namespace App {
        interface Locals {
            session: Session | null;
            user: User | null;
        }
        // interface Error {}
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export { };
