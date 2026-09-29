export type MissionId = 
  | 'opening'
  | 'map'
  | 'root-mystery'
  | 'distance-mystery'
  | 'graph-lab'
  | 'final-mission'
  | 'final-boss'
  | 'reflection'
  | 'assessment';

export interface Badge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface AssessmentQuestion {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'number-input';
  category: 'Fungsi Irasional' | 'Fungsi Nilai Mutlak' | 'Aplikasi Real Life' | 'Sintesis';
  scenario: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  hint1: string;
  hint2: string;
  conceptSummary: string;
}

export interface UserReflection {
  understandingLevel: number; // 1 to 5
  priorBelief: string;
  newRealization: string;
  absoluteValueInsight: string;
  irrationalFunctionInsight: string;
  realLifeExample: string;
  eurekaMoment: string;
}
