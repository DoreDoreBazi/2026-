import {
  CHEONGAN, JIJI, CHEONGAN_KR, JIJI_KR,
  CHEONGAN_TO_OHANG, JIJI_TO_OHANG, NANGANGMANG,
  CHEONGAN_TO_JIJI, CHUNG, WONJIN, GWIMUN,
  ANIMAL_INFO, OHANG_TO_JIJI
} from './constants';
import { Pillar, Cheongan, Jiji, Ohang, RecommendationResult } from './types';

// 한글 → 한자 변환 맵
const CHEONGAN_KR_TO_HANJA: Record<string, Cheongan> = {};
const JIJI_KR_TO_HANJA: Record<string, Jiji> = {};
CHEONGAN_KR.forEach((kr, i) => { CHEONGAN_KR_TO_HANJA[kr] = CHEONGAN[i]; });
JIJI_KR.forEach((kr, i) => { JIJI_KR_TO_HANJA[kr] = JIJI[i]; });

// 60갑자 유효성 검사
const VALID_COMBINATIONS = new Set<string>();
for (let i = 0; i < 60; i++) {
  VALID_COMBINATIONS.add(CHEONGAN[i % 10] + JIJI[i % 12]);
}

// 주(柱) 파싱 함수
export const parsePillar = (pillar: string): Pillar | null => {
  if (!pillar || pillar.length !== 2) return null;
  
  let cheonganChar = pillar[0];
  let jijiChar = pillar[1];
  
  // 한글이면 한자로 변환
  const cheongan = CHEONGAN_KR_TO_HANJA[cheonganChar] || (CHEONGAN.includes(cheonganChar as Cheongan) ? cheonganChar : null);
  const jiji = JIJI_KR_TO_HANJA[jijiChar] || (JIJI.includes(jijiChar as Jiji) ? jijiChar : null);
  
  if (!cheongan || !jiji) return null;
  
  // 유효성 검사
  if (!VALID_COMBINATIONS.has(cheongan + jiji)) return null;
  
  return { cheongan: cheongan as Cheongan, jiji: jiji as Jiji };
};

// 충/원진/귀문 체크
const hasConflict = (targetJiji: string, sajuJijis: string[]): string | null => {
  for (const jiji of sajuJijis) {
    if (CHUNG[jiji] === targetJiji) return '충(沖)';
    if (WONJIN[jiji] === targetJiji) return '원진(怨嗔)';
    if (GWIMUN[jiji] === targetJiji) return '귀문(鬼門)';
  }
  return null;
};

// 메인 계산 함수
export const calculateRecommendation = (
  name: string,
  yearPillar: string,
  monthPillar: string,
  dayPillar: string,
  timePillar: string
): RecommendationResult | string => { // returns result object or error string

  if (!name.trim()) return '이름을 입력해주세요.';

  const year = parsePillar(yearPillar);
  const month = parsePillar(monthPillar);
  const day = parsePillar(dayPillar);
  const time = parsePillar(timePillar);

  if (!year || !month || !day || !time) {
    return '사주 형식을 확인해주세요. (예: 갑술 또는 甲戌)';
  }

  const monthJiji = month.jiji; 
  const dayCheongan = day.cheongan; 
  const sajuJijis = [year.jiji, month.jiji, day.jiji, time.jiji]; 
  const sajuCheongans = [year.cheongan, month.cheongan, day.cheongan, time.cheongan]; 

  // 1. 사주 오행 분포 계산
  const ohangCount: Record<Ohang, number> = { '목': 0, '화': 0, '토': 0, '금': 0, '수': 0 };
  
  sajuCheongans.forEach(cg => {
    const oh = CHEONGAN_TO_OHANG[cg];
    if (oh) ohangCount[oh]++;
  });
  
  sajuJijis.forEach(jj => {
    const oh = JIJI_TO_OHANG[jj];
    if (oh) ohangCount[oh]++;
  });

  // 2. 부족한 오행 순서 (적은 순서대로)
  const sortedOhang = Object.entries(ohangCount)
    .sort((a, b) => a[1] - b[1])
    .map(entry => entry[0] as Ohang);

  // 난강망에서 용신 추출
  const yongsins = NANGANGMANG[monthJiji]?.[dayCheongan];
  if (!yongsins) {
    return '용신을 찾을 수 없습니다.';
  }

  // 천간 → 지지 변환 후 충/원진/귀문 필터링
  const candidates: Array<any> = [];
  
  for (const yongsin of yongsins) {
    const targetJiji = CHEONGAN_TO_JIJI[yongsin as Cheongan];
    const conflict = hasConflict(targetJiji, sajuJijis);
    
    if (!conflict) {
      candidates.push({
        jiji: targetJiji,
        ...ANIMAL_INFO[targetJiji]
      });
    }
  }

  // 3. 후보가 부족하면 부족한 오행 기반으로 추천
  for (const ohang of sortedOhang) {
    if (candidates.length >= 2) break;
    
    const jijisForOhang = OHANG_TO_JIJI[ohang];
    for (const jiji of jijisForOhang) {
      if (candidates.length >= 2) break;
      const conflict = hasConflict(jiji, sajuJijis);
      if (!conflict && !candidates.find(c => c.jiji === jiji)) {
        candidates.push({
          jiji,
          ...ANIMAL_INFO[jiji]
        });
      }
    }
  }

  if (candidates.length === 0) {
    return '추천 가능한 동물이 없습니다. 사주를 다시 확인해주세요.';
  }

  return {
    name: name.trim(),
    first: candidates[0],
    second: candidates[1] || null
  };
};