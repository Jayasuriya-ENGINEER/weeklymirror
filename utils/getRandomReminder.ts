export function getRandomMessage(messages: string[]) {
  return messages[Math.floor(Math.random() * messages.length)];
}
