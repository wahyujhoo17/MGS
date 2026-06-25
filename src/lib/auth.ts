const encoder = new TextEncoder();

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function base64urlEncode(str: string): string {
  const base64 = typeof btoa !== "undefined" 
    ? btoa(unescape(encodeURIComponent(str))) 
    : Buffer.from(str, "utf-8").toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return typeof atob !== "undefined"
    ? decodeURIComponent(escape(atob(base64)))
    : Buffer.from(base64, "base64").toString("utf-8");
}

async function getCryptoKey(secret: string) {
  return await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function hashPassword(password: string): Promise<string> {
  const msgUint8 = encoder.encode(password + "mgs-salt-key-2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  return arrayBufferToHex(hashBuffer);
}

export async function signSession(payload: any, secret: string): Promise<string> {
  const data = JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 });
  const key = await getCryptoKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const hexSignature = arrayBufferToHex(signature);
  const base64Data = base64urlEncode(data);
  return `${base64Data}.${hexSignature}`;
}

export async function verifySession(token: string, secret: string): Promise<any | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [base64Data, signatureHex] = parts;
    const data = base64urlDecode(base64Data);
    const key = await getCryptoKey(secret);
    const expectedSignature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
    const expectedHex = arrayBufferToHex(expectedSignature);
    if (signatureHex !== expectedHex) return null;
    const payload = JSON.parse(data);
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
