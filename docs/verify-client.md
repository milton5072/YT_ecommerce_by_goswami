# Email verification client integration

This file shows example client code for verifying an email token.

Option A — send token in JSON body (recommended):

```js
// POST to API
const res = await fetch("/api/auth/register/verify-email", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({ token }),
});

if (res.ok) {
	// verified
} else {
	const payload = await res.json().catch(() => ({}));
	console.error("Verify failed", payload.message);
}
```

Option B — use Authorization header (Bearer):

```js
const res = await fetch("/api/auth/register/verify-email", {
	method: "POST",
	headers: { Authorization: `Bearer ${token}` },
});
```

Notes

- The API accepts the token in multiple forms: JSON body `{ token }`, form-encoded `token=...`, raw token text, `Authorization: Bearer <token>`, or a full URL including `?token=`.
- For email links (clicked in a browser) the server GET handler now redirects to a client page at `/auth/verify-email?token=...` where the client will automatically POST the token and show a friendly result page.
- Avoid sending the whole verification URL in JSON body — send the bare token when possible.
