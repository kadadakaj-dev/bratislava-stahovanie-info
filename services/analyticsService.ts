// Definujme si rozhranie pre eventData, aby sme mali lepšiu typovú bezpečnosť.
// Môžeš si ho prispôsobiť podľa skutočných dát, ktoré posielaš do analytiky.
interface AnalyticsEventData {
  [key: string]: string | number | boolean | object | null | undefined; // Flexibilný objekt
  // Alebo konkrétnejšie:
  // userId?: string;
  // itemId?: string;
  // value?: number;
  // category?: string;
}

export const logAnalyticsEvent = (eventName: string, eventData?: AnalyticsEventData): void => {
  // Príklad: volanie nejakej analytickej služby (napr. Firebase Analytics, Google Analytics)
  // firebase.analytics().logEvent(eventName, eventData);
  console.log(`Logging event: ${eventName}`, eventData);
};
