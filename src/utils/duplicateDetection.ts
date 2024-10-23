import { Issue } from '../types';

const SIMILARITY_THRESHOLD = 0.8;
const MAX_DISTANCE_KM = 1; // Maximum distance to consider as duplicate

function calculateSimilarity(title1: string, title2: string): number {
  const words1 = title1.toLowerCase().split(' ');
  const words2 = title2.toLowerCase().split(' ');
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
}

export function detectDuplicates(newIssue: Issue, existingIssues: Issue[]): Issue[] {
  return existingIssues.filter(issue => {
    const titleSimilarity = calculateSimilarity(newIssue.title, issue.title);
    const distance = calculateDistance(newIssue.lat, newIssue.lng, issue.lat, issue.lng);
    return titleSimilarity >= SIMILARITY_THRESHOLD && distance <= MAX_DISTANCE_KM;
  });
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // Implementation of distance calculation (you can use the same function from geolocationVerification.ts)
  // For brevity, we'll assume it's implemented here
  return 0; // Placeholder return
}