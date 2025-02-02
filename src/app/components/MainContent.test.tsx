import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainContent from "./MainContent";

// Mock della funzione fetch per simulare le richieste API
beforeEach(() => {
  jest.clearAllMocks(); // Resetta i mock prima di ogni test
});

describe("MainContent", () => {
  it("should render correctly and fetch entries", async () => {
    // Mock del risultato della chiamata a fetch
    const mockResponse = new Response(
      JSON.stringify([
        { id: 1, title: "Entry 1", description: "Description 1" },
        { id: 2, title: "Entry 2", description: "Description 2" },
      ]),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    // Mock di fetch per restituire la risposta simulata
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    render(<MainContent />);

    // Attendi che le entries vengano renderizzate correttamente
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "List Entries"
      );
      expect(screen.getByText("Entry 1")).toBeInTheDocument();
      expect(screen.getByText("Entry 2")).toBeInTheDocument();
    });
  });

  it("should open and close the new entry form", async () => {
    render(<MainContent />);

    // Clicca sul pulsante "New Entry"
    userEvent.click(screen.getByRole("button", { name: /New Entry/i }));

    // Verifica che il form sia visibile
    expect(screen.getByText("New Entry Form")).toBeInTheDocument();

    // Clicca sul pulsante di chiusura del form
    userEvent.click(screen.getByRole("button", { name: /Close/i }));

    // Verifica che il form non sia più visibile
    expect(screen.queryByText("New Entry Form")).not.toBeInTheDocument();
  });

  it("should handle empty entries", async () => {
    const mockResponse = new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    // Mock di fetch per restituire la risposta simulata
    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    render(<MainContent />);

    // Attendi che venga visualizzato il messaggio "No entries"
    await waitFor(() => {
      expect(screen.getByText("No entries")).toBeInTheDocument();
    });
  });

  // Aggiungi altri test per coprire altri scenari, come la gestione degli errori nella chiamata a fetch, l'invio del form, ecc.
});
