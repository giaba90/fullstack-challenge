### **1. Endpoint per `Entry`**

- **Metodo POST** (per creare una nuova `Entry`):
  - **URL**: `/api/entry`
  - **Descrizione**: Questo endpoint crea una nuova `Entry` nel database.
  - **Richiesta**:
    - **Body** (JSON):
    ```json
    {
      "applicationHostname": "example.com",
      "timestamp": "2025-01-28T12:00:00Z",
      "type": "WEB" // oppure "MOBILE"
    }
    ```
  - **Risposta** (JSON): Restituisce l'oggetto `Entry` appena creato.
    ```json
    {
      "id": 1,
      "applicationHostname": "example.com",
      "timestamp": "2025-01-28T12:00:00Z",
      "type": "WEB"
    }
    ```

- **Metodo GET** (per leggere tutte le `Entry`):
  - **URL**: `/api/entry`
  - **Descrizione**: Questo endpoint restituisce tutte le `Entry` presenti nel database.
  - **Risposta** (JSON):
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

### **2. Endpoint per `EntryDetail`**

- **Metodo POST** (per creare un nuovo `EntryDetail`):
  - **URL**: `/api/entryDetail`
  - **Descrizione**: Questo endpoint crea una nuova `EntryDetail` nel database, inclusi i `Tag` associati.
  - **Richiesta**:
    - **Body** (JSON):
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
  - **Risposta** (JSON): Restituisce l'oggetto `EntryDetail` appena creato con i `Tag` associati.
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

- **Metodo GET** (per leggere tutti gli `EntryDetail` con i `Tag` associati):
  - **URL**: `/api/entryDetail`
  - **Descrizione**: Questo endpoint restituisce tutti gli `EntryDetail` nel database, con i `Tag` correlati inclusi.
  - **Risposta** (JSON):
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

### **Riepilogo degli endpoint**

- **`POST /api/entry`** — Crea una nuova `Entry`.
- **`GET /api/entry`** — Legge tutte le `Entry`.
- **`POST /api/entryDetail`** — Crea un nuovo `EntryDetail` (inclusi i `Tag`).
- **`GET /api/entryDetail`** — Legge tutti gli `EntryDetail` (con i `Tag` associati).
