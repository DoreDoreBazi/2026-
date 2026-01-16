export type Cheongan = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
export type Jiji = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';
export type Ohang = '목' | '화' | '토' | '금' | '수';

export interface AnimalInfo {
  name: string;
  emoji: string;
  hanja: Jiji;
  position?: string; // CSS object-position value (e.g., '50% 30%')
}

export interface Pillar {
  cheongan: Cheongan;
  jiji: Jiji;
}

export interface RecommendationResult {
  name: string;
  first: AnimalInfo & { jiji: Jiji };
  second: (AnimalInfo & { jiji: Jiji }) | null;
}

export interface CalculationError {
  message: string;
}