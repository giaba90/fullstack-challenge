### 1. Endpoint per `Entry`

#### POST /api/entry (Crea una nuova `Entry`)

**Descrizione:** Questo endpoint crea una nuova `Entry` nel database.

**Richiesta (JSON):**

```json
{
    "applicationHostname": "example.com",
    "type": "WEB",
    "user": "John Doe",
    "country": "USA",
    "ip": "192.168.1.1",
    "device": "Desktop",
    "isDangerous": false,
    "tags": [
        {
            "title": "High Priority",
            "description": "Needs immediate attention",
            "color": "#FF0000"
        },
        {
            "title": "Warning",
            "description": "Potential issue detected",
            "color": "#FFFF00"
        }
    ]
}
```

**Risposta (JSON):** Restituisce l'oggetto `Entry` appena creato.

```json
{
  "id": 8,
  "applicationHostname": "example.com",
  "timestamp": "2025-02-01T16:38:11.233Z",
  "type": "WEB",
  "details": {
    "id": 8,
    "entryId": 8,
    "user": "John Doe",
    "country": "USA",
    "ip": "192.168.1.1",
    "device": "Desktop",
    "isDangerous": false,
    "tags": [
      {
        "id": 20,
        "title": "High Priority",
        "description": "Needs immediate attention",
        "color": "#FF0000",
        "entryDetailId": 8
      },
      {
        "id": 21,
        "title": "Warning",
        "description": "Potential issue detected",
        "color": "#FFFF00",
        "entryDetailId": 8
      }
    ]
  }
}
```

#### GET /api/entry (Legge tutte le `Entry`)

**Descrizione:** Questo endpoint restituisce tutte le `Entry` presenti nel database.

**Risposta (JSON):**

```json
[
  {
    "id": 1,
    "applicationHostname": "example.com",
    "timestamp": "2025-01-28T12:00:00Z",
    "type": "WEB"
  },
  {
    "id": 2,
    "applicationHostname": "another-example.com",
    "timestamp": "2025-01-29T12:00:00Z",
    "type": "MOBILE"
  }
]
```

### 2. Endpoint per `EntryDetail`

#### POST /api/entrydetail (Crea un nuovo `EntryDetail`)

**Descrizione:** Questo endpoint crea una nuova `EntryDetail` nel database, inclusi i `Tag` associati.

**Richiesta (JSON):**

```json
{
  "user": "Joe Smith",
  "country": "USA",
  "ip": "192.168.1.1",
  "device": "Windows 10 / Chrome",
  "isDangerous": true,
  "tags": [
    {
      "title": "ERROR",
      "description": "Description of the error",
      "color": "#FF0000"
    }
  ]
}
```

**Risposta (JSON):** Restituisce l'oggetto `EntryDetail` appena creato con i `Tag` associati.

```json
{
  "id": 1,
  "user": "Joe Smith",
  "country": "USA",
  "ip": "192.168.1.1",
  "device": "Windows 10 / Chrome",
  "isDangerous": true,
  "tags": [
    {
      "id": 1,
      "title": "ERROR",
      "description": "Description of the error",
      "color": "#FF0000"
    }
  ]
}
```

#### GET /api/entrydetail (Legge tutti gli `EntryDetail`)

**Descrizione:** Questo endpoint restituisce tutti gli `EntryDetail` nel database, con i `Tag` correlati inclusi.

**Risposta (JSON):**

```json
[
  {
    "id": 1,
    "user": "Joe Smith",
    "country": "USA",
    "ip": "192.168.1.1",
    "device": "Windows 10 / Chrome",
    "isDangerous": true,
    "tags": [
      {
        "id": 1,
        "title": "ERROR",
        "description": "Description of the error",
        "color": "#FF0000"
      }
    ]
  },
  {
    "id": 2,
    "user": "Jane Doe",
    "country": "Canada",
    "ip": "192.168.2.2",
    "device": "MacOS / Safari",
    "isDangerous": false,
    "tags": [
      {
        "id": 2,
        "title": "INFO",
        "description": "Informative message",
        "color": "#00FF00"
      }
    ]
  }
]
```