const INAPPROPRIATE_WORDS = ['badword1', 'badword2', 'badword3']; // Add more inappropriate words

export function moderateContent(content: string): { isAppropriate: boolean; moderatedContent: string } {
  let moderatedContent = content.toLowerCase();
  let isAppropriate = true;

  INAPPROPRIATE_WORDS.forEach(word => {
    if (moderatedContent.includes(word)) {
      moderatedContent = moderatedContent.replace(new RegExp(word, 'gi'), '*'.repeat(word.length));
      isAppropriate = false;
    }
  });

  return { isAppropriate, moderatedContent };
}