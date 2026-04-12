function getUserAgent(): string {
  if (typeof window === "undefined") return "";
  return navigator.userAgent || navigator.vendor || (window as any).opera || "";
}

/**
 * Detects if the user is on any mobile device.
 */
export function isMobileDevice(): boolean {
  return isIOS() || isAndroid();
}

/**
 * Detects specifically if the user is on an iOS device.
 */
export function isIOS(): boolean {
  return /iPhone|iPad|iPod/i.test(getUserAgent());
}

/**
 * Detects specifically if the user is on an Android device.
 */
export function isAndroid(): boolean {
  return /Android/i.test(getUserAgent());
}
