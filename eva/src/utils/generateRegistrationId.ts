// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateRegistrationId(eventId: string, seq?: number) {
  // simple human-friendly id: EVT<shortEventId>-REG-<timestamp short>
  const short = String(eventId).slice(-6);
  const ts = Date.now().toString().slice(-6);
  return `EVT${short}-REG-${ts}`;
}
