// Helpers puros del endpoint /api/lead (sin red), para poder testearlos con node --test.

// Opciones del dropdown de inversion mensual (es + en). Cualquier otro valor se rechaza.
export const INV_OPTIONS = new Set([
  'menos de USD 2.000', 'USD 2.000 a 5.000', 'USD 5.000 a 20.000', 'más de USD 20.000',
  'under USD 2,000', 'USD 2,000 to 5,000', 'USD 5,000 to 20,000', 'over USD 20,000',
]);

// Recorta, saca caracteres de control (evita inyectar lineas en la nota) y limita el largo.
export const clip = (v, n = 200) => String(v || '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, n);

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Devuelve el telefono en formato E.164 ('+549...') o '' si no hay nada usable.
// Si el visitante escribio '+' (o 00) se respeta el numero tal cual. El '+549' solo se agrega
// a numeros locales argentinos: 10 digitos (area + numero) o 11 que arrancan con 9.
export function normalizePhone(raw, lang) {
  const s = String(raw || '').trim().slice(0, 30);
  let digits = s.replace(/\D/g, '');
  if (!digits) return '';
  if (s.startsWith('+')) return '+' + digits;
  if (digits.startsWith('00')) return '+' + digits.replace(/^0+/, '');
  if (lang !== 'es') return '+' + digits;
  const d = digits.replace(/^0+/, '');
  if (d.startsWith('54')) return '+' + d;
  if (d.length === 10) return '+549' + d;
  if (d.length === 11 && d.startsWith('9')) return '+54' + d;
  return '+' + d;
}

// E.164: de 8 a 15 digitos.
export const phoneOk = (p) => /^\+\d{8,15}$/.test(p);
