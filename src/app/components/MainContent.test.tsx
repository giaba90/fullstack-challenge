import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainContent from "./MainContent";

// Mock della funzione fetch per simulare le richieste API
beforeEach(() => {
  jest.clearAllMocks(); // Resetta i mock prima di ogni test
});

it("should handle empty entries", async () => {
  const mockResponse = {
    json: () => Promise.resolve([]),
    status: 200,
    headers: { get: () => "application/json" },
  };

  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  render(<MainContent />);

  await waitFor(() => {
    expect(screen.getByText("No entries")).toBeInTheDocument();
  });
});

it("should open the EntryNewForm when 'New Entry' button is clicked", async () => {
  render(<MainContent />);

  const newEntryButton = screen.getByText("New Entry");
  expect(newEntryButton).toBeInTheDocument();

  await userEvent.click(newEntryButton);

  expect(screen.getByText("New Entry")).toBeInTheDocument();
});

it("should close the EntryNewForm when onClose is triggered", async () => {
  render(<MainContent />);

  const newEntryButton = screen.getByText("New Entry");
  await userEvent.click(newEntryButton);

  expect(screen.getByText("New Entry")).toBeInTheDocument();

  const closeButton = screen.getByRole("button", { name: /close/i });
  await userEvent.click(closeButton);

  await waitFor(() => {
    expect(screen.queryByText("New Entry Form")).not.toBeInTheDocument();
  });
});

it("should display loading state while fetching entries", async () => {
  const mockResponse = {
    json: () => new Promise((resolve) => setTimeout(() => resolve([]), 1000)),
    status: 200,
    headers: { get: () => "application/json" },
  };

  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  render(<MainContent />);

  // expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText("No entries")).toBeInTheDocument();
  });
});

it("should pass correct props to EntryTable component", async () => {
  const mockEntries = [
    { id: 1, name: "Entry 1" },
    { id: 2, name: "Entry 2" },
  ];

  const mockResponse = {
    json: () => Promise.resolve(mockEntries),
    status: 200,
    headers: { get: () => "application/json" },
  };

  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  render(<MainContent />);

  await waitFor(() => {
    const entryTable = screen.getByRole("table");
    expect(entryTable).toBeInTheDocument();
    expect(entryTable).toHaveTextContent("Entry 1");
    expect(entryTable).toHaveTextContent("Entry 2");
  });
});

it("should render EntryTable component when entries are present", async () => {
  const mockEntries = [
    { id: 1, name: "Entry 1" },
    { id: 2, name: "Entry 2" },
  ];

  const mockResponse = {
    json: () => Promise.resolve(mockEntries),
    status: 200,
    headers: { get: () => "application/json" },
  };

  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  render(<MainContent />);

  await waitFor(() => {
    const entryTable = screen.getByRole("table");
    expect(entryTable).toBeInTheDocument();
    expect(screen.queryByText("No entries")).not.toBeInTheDocument();
  });

  expect(screen.getByText("List Entries")).toBeInTheDocument();
});
