Logik in LoginPage/Login Form einbauen

Implementiere eine eigene useAuth Hook mit TanStack Query, die folgende Funktionen umfasst:

getUser(): Holt den eingeloggten Nutzer über API, nutzt HttpOnly-Cookies für Authentifizierung.

login(), register(), logout(): Führt API-Mutationen aus und aktualisiert den User-Status im Query-Cache.

User-Status verwalten: Nutze TanStack Query Cache als Single Source of Truth für den Auth-Status.

Fehler- und Ladezustände sauber handhaben, z. B. bei Session-Ablauf automatisch ausloggen oder auf Login umleiten.

https://github.com/alan2207/react-query-auth/blob/master/src/index.tsx
https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/features/auth/components/login-form.tsx
https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/lib/auth.tsx#L1

Momentan:
Echte Login Logik implementieren
useAuth probleme lösen
