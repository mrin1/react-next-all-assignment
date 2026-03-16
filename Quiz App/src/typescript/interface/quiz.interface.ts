export interface CategorySelectionProps {
  categories: { name: string; slug: string }[];
  onSelect: (slug: string) => void;
}

export interface ResultSummaryProps {
  points: number;
  total: number;
  history: any[];
  onRestart: () => void;
}

export interface IQuestion {
  id: string;
  question: {
    text: string;
  };
  correctAnswer: string;
  incorrectAnswers: string[];
  category: string;
  difficulty: string;
}

export interface IQuizState {
  questions: IQuestion[];
  currentQuestionIndex: number;
  score: number;
  isFinished: boolean;
}

interface Question {
  id: string;
  question: { text: string };
  correctAnswer: string;
  incorrectAnswers: string[];
}

interface ReviewLog {
  title: string;
  userChoice: string;
  correctChoice: string;
  isRight: boolean;
}

export interface QuizState {
  questions: Question[];
  categories: Record<string, string[]>;
  step: number;
  points: number;
  history: ReviewLog[];
  isOver: boolean;
  status: 'idle' | 'loading' | 'failed';
}

export interface UseTimerProps {
  initialTime: number;
  onTimeUp: () => void;
  keyTrigger: any; 
}