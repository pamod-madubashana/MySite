---
trigger: always_on
alwaysApply: true
---
This file defines **mandatory rules** for generating a README.md. Follow this structure exactly. Do not add extra sections. Do not remove any section.

---

## Title, Icon, Short Description (Centered)

The README must start with a centered header block containing:

* Project Title
* Project Icon (width = 200)
* Short description (1–2 lines)

```html
<div align="center">

# <PROJECT_TITLE>

<img src="<ICON_PATH_OR_URL>" width="200" alt="<PROJECT_TITLE> Icon" />

<SHORT_DESCRIPTION>

</div>
```

Rules:

* Icon width must be exactly `200`
* Description must be short and clear
* No extra text above this block

---

## Tech Stack

List the main technologies used in the project.

```md
## Tech Stack

- Frontend: ...
- Backend: ...
- Database: ...
- Other: ...
```

Rules:

* Only list technologies actually used
* Keep it concise

---

## Why This Project Exists

Explain the real purpose of the project.

```md
## Why This Project Exists

- Problem: ...
- Goal: ...
- Outcome: ...
```

Rules:

* No marketing or vague statements
* Must clearly explain the reason for the project

---

## Project Structure

Provide a simplified tree of the repository structure.

```md
## Project Structure

```

src/
...
README.md
...

```
```

Rules:

* Must reflect the real repository structure
* Only include important folders/files

---

## Screenshots

Show project screenshots using markdown images.

```md
## Screenshots

![Screenshot 1](<PATH_OR_URL>)
![Screenshot 2](<PATH_OR_URL>)
```

If screenshots are not available, include this section and write:

```md
Screenshots will be added soon.
```

---

## Key Features

List the main features of the project.

```md
## Key Features

- ...
- ...
- ...
```

Rules:

* Use 5–10 bullet points
* Start bullets with verbs when possible
* Features must match the actual project

---

