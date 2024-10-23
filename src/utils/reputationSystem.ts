const INITIAL_REPUTATION = 100;
const REPORT_REPUTATION_GAIN = 5;
const UPVOTE_REPUTATION_GAIN = 1;

export class ReputationSystem {
  private userReputations: Map<string, number> = new Map();

  getUserReputation(userId: string): number {
    return this.userReputations.get(userId) || INITIAL_REPUTATION;
  }

  addReportReputation(userId: string) {
    const currentReputation = this.getUserReputation(userId);
    this.userReputations.set(userId, currentReputation + REPORT_REPUTATION_GAIN);
  }

  addUpvoteReputation(userId: string) {
    const currentReputation = this.getUserReputation(userId);
    this.userReputations.set(userId, currentReputation + UPVOTE_REPUTATION_GAIN);
  }
}

export const reputationSystem = new ReputationSystem();