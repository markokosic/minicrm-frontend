// 1. Nötige Imports
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// 2. Mock-Komponente (ersetze diese durch deinen echten Import)
const MockGreeting = ({ name = 'Welt' }) => (
  <div>
    <h1 data-testid="greeting-header">Hallo, {name}!</h1>
    <button onClick={() => console.log('Clicked')}>Klick mich</button>
  </div>
);

// --- DER TEST ---

describe('Minimaler Funktionstest', () => {
  it('sollte den Grußtext korrekt anzeigen', () => {
    // Rendere die Komponente
    render(<MockGreeting name="Alex" />);

    // Suche das Element, das den Text "Alex" enthält (Fall-unempfindlich)
    const headerElement = screen.getByText(/hallo, alex!/i);

    // Assertion: Prüfe, ob das Element im Dokument vorhanden ist
    expect(headerElement).toBeInTheDocument();
  });

  it('sollte den Klick-Button aktivieren', () => {
    // Rendere die Komponente
    render(<MockGreeting />);

    // Finde den Button über seinen zugänglichen Namen
    const clickButton = screen.getByRole('button', { name: /klick mich/i });

    // Assertion: Prüfe, ob der Button nicht disabled ist
    expect(clickButton).toBeEnabled();
  });
});
