import type { Entry, EntryState, EntryAction } from '../types/entries';

const initialEntry: Entry = {
    id: 0,
    applicationHostname: '',
    timestamp: '',
    type: '',
};

export const initialState: EntryState = {
    entries: [],
    selectedEntry: null,
    isEditing: false,
    showNewForm: false,
    showEditForm: false,
    editingEntry: null,
    newEntry: initialEntry
};

export function entriesReducer(state: EntryState, action: EntryAction): EntryState {
    switch (action.type) {
        case 'SET_SELECTED_ENTRY':
            return { ...state, selectedEntry: action.payload };

        case 'SET_IS_EDITING':
            return { ...state, isEditing: action.payload };

        case 'SET_SHOW_NEW_FORM':
            return {
                ...state,
                showNewForm: action.payload,
                newEntry: action.payload ? initialEntry : state.newEntry
            };

        case 'SET_SHOW_EDIT_FORM':
            return { ...state, showEditForm: action.payload };

        case 'SET_EDITING_ENTRY':
            return { ...state, editingEntry: action.payload };

        case 'UPDATE_NEW_ENTRY':
            return { ...state, newEntry: action.payload };

        case 'ADD_ENTRY':
            return {
                ...state,
                entries: [...state.entries, action.payload],
                showNewForm: false,
                newEntry: initialEntry
            };

        case 'UPDATE_ENTRY':
            return {
                ...state,
                entries: state.entries.map(entry =>
                    entry.id === action.payload.id
                        ? { ...entry, ...action.payload.entry }
                        : entry
                ),
                showEditForm: false,
                editingEntry: null
            };

        case 'DELETE_ENTRY':
            return {
                ...state,
                entries: state.entries.filter(entry => entry.id !== action.payload),
                selectedEntry: state.selectedEntry?.id === action.payload ? null : state.selectedEntry
            };

        default:
            return state;
    }
} 