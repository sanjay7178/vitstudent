# Faculty Search API Documentation

## Base URL
http://localhost:3000

## Endpoints

### 1. Get All Faculty Data

Retrieves the complete list of faculty members.

- **URL:** `/api/faculty`
- **Method:** GET
- **Response Format:** JSON

#### Response

An array of faculty objects, each containing:

- `ID`: String
- `Name of the Faculty`: String
- `Designation`: String
- `Name of Department`: String
- `School / Centre Name`: String
- `E-Mail Id`: String
- `Cabin Number`: String

#### Example Response

```json
[
  {
    "ID": "1",
    "Name of the Faculty": "John Doe",
    "Designation": "Professor",
    "Name of Department": "Computer Science",
    "School / Centre Name": "School of Computing",
    "E-Mail Id": "john.doe@example.com",
    "Cabin Number": "CS-101"
  },
  ...
]

```txt
npm install
npm run dev
```

```txt
npm run deploy
```
