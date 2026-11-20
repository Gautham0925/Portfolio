import { entries, fallback, thanks, type ChatLink } from "./knowledge";

export type Reply = { text: string; link?: ChatLink };

const stopwords = new Set(["a", "an", "the", "is", "are", "was", "were", "do", "does", "did", "he", "his", "him", "she", "her", "i", "you", "your", "me", "my", "can", "could", "would", "should", "of", "to", "in", "on", "at", "for", "and", "or", "with", "what", "which", "how", "any", "some", "tell", "please", "has", "have", "had", "it", "its", "this", "that", "there", "about"]);
const greetings = new Set(["hi", "hello", "hey", "hii", "yo", "namaste"]);
const gratitude = new Set(["thanks", "thank", "thx", "ty"]);

const tokenize = (text: string) => (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((word) => word.length > 1 && !stopwords.has(word));

function match(token: string, keyword: string, weight: number) {
  if (token === keyword || token === `${keyword}s` || keyword === `${token}s`) return 2;
  if (weight > 1) return 0;
  const shared = Math.min(token.length, keyword.length);
  let prefix = 0;
  while (prefix < shared && token[prefix] === keyword[prefix]) prefix++;
  return prefix >= 5 ? 1 : 0;
}

export function reply(question: string): Reply {
  const raw = (question.toLowerCase().match(/[a-z0-9]+/g) ?? []);
  if (raw.length > 0 && raw.length <= 3 && raw.every((word) => greetings.has(word))) {
    return { text: "Hello. What would you like to know about Gautham's work?" };
  }
  if (raw.some((word) => gratitude.has(word)) && raw.length <= 4) return { text: thanks };

  const tokens = tokenize(question);
  let best: { score: number; index: number } | null = null;
  entries.forEach((entry, index) => {
    const keywords = [...new Set(entry.keywords)];
    let score = 0;
    tokens.forEach((token) => {
      let top = 0;
      for (const keyword of keywords) top = Math.max(top, match(token, keyword, entry.weight));
      score += top;
    });
    score *= entry.weight;
    if (score >= 2 && (!best || score > best.score)) best = { score, index };
  });

  const chosen = best ? entries[(best as { index: number }).index] : undefined;
  if (!chosen) return { text: fallback, link: { label: "Open contact form", href: "/contact" } };
  return { text: chosen.answer, link: chosen.link };
}
