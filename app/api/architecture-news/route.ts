import { NextResponse } from "next/server";

// 건축설계 관련 정보 (각 항목은 공식 기관/단체의 정보를 기반으로 작성된 요약본입니다)
const architectureNews = [
  {
    id: 1,
    title: "친환경 건축과 탄소중립 설계 동향",
    summary: "대한건축학회에서 제공하는 친환경 건축 및 탄소중립 설계 관련 최신 연구 동향입니다.",
    detailSummary: "대한건축학회는 국내 건축 분야의 대표적인 학술단체로서, 친환경 건축과 탄소중립 설계에 관한 다양한 연구 자료와 학술 정보를 제공하고 있습니다.\n\n탄소중립 건축은 건물의 설계, 시공, 운영 전 과정에서 탄소 배출을 최소화하는 것을 목표로 합니다. 바이오 기반 건축 자재, 재활용 콘크리트, 저탄소 시멘트 등 새로운 소재와 패시브 하우스 설계 원칙이 주요 연구 주제입니다.\n\n아래 링크에서 대한건축학회의 최신 학술 정보를 확인하실 수 있습니다.",
    category: "트렌드",
    region: "국내",
    source: "대한건축학회",
    sourceUrl: "https://www.aik.or.kr",
  },
  {
    id: 2,
    title: "Autodesk 제너레이티브 디자인 솔루션",
    summary: "Autodesk에서 제공하는 AI 기반 건축 설계 자동화 솔루션 공식 정보입니다.",
    detailSummary: "Autodesk는 CAD/BIM 소프트웨어 분야의 글로벌 선두 기업으로, 제너레이티브 디자인(Generative Design) 기술을 통해 AI 기반 건축 설계 솔루션을 제공하고 있습니다.\n\n제너레이티브 디자인은 설계 목표와 제약 조건을 입력하면 AI가 수천 가지 설계 대안을 자동 생성하는 기술입니다. 공간 배치 최적화, 구조 설계, 에너지 효율 분석 등에 활용됩니다.\n\n아래 링크에서 Autodesk 제너레이티브 디자인 솔루션의 상세 정보를 확인하실 수 있습니다.",
    category: "기술",
    region: "미국",
    source: "Autodesk",
    sourceUrl: "https://www.autodesk.com/solutions/generative-design/architecture",
  },
  {
    id: 3,
    title: "서울시 도시건축 정책 및 가이드라인",
    summary: "서울시 도시건축본부에서 제공하는 공식 도시건축 정책 및 뉴스입니다.",
    detailSummary: "서울시 도시건축본부는 서울시의 도시계획, 건축 정책, 역사문화지구 관리 등을 담당하는 공식 기관입니다.\n\n북촌, 서촌, 익선동 등 역사문화지구의 건축물 관리, 재개발 가이드라인, 디자인 심의 기준 등 서울시 건축 관련 공식 정책 정보를 제공합니다.\n\n아래 링크에서 서울시 도시건축 관련 최신 뉴스와 정책 자료를 확인하실 수 있습니다.",
    category: "정책",
    region: "국내",
    source: "서울시 도시건축본부",
    sourceUrl: "https://news.seoul.go.kr/citybuild",
  },
  {
    id: 4,
    title: "영국 정부 현대 건설 공법(MMC) 정책",
    summary: "영국 정부에서 공식 발표한 모듈러 건축 등 현대 건설 공법 관련 정책 정보입니다.",
    detailSummary: "영국 정부는 주택 공급 확대와 건설 효율성 향상을 위해 현대 건설 공법(Modern Methods of Construction, MMC)을 적극 장려하고 있습니다.\n\nMMC에는 모듈러 건축, 프리패브 공법, 3D 프린팅 건축 등이 포함됩니다. 영국 정부는 이러한 공법을 통해 공사 기간 단축, 품질 향상, 탄소 배출 감소를 목표로 합니다.\n\n아래 링크에서 영국 정부의 MMC 관련 공식 정책 문서를 확인하실 수 있습니다.",
    category: "기술",
    region: "영국",
    source: "영국 정부 (GOV.UK)",
    sourceUrl: "https://www.gov.uk/government/publications/modern-methods-of-construction",
  },
  {
    id: 5,
    title: "사우디아라비아 NEOM 프로젝트 공식 정보",
    summary: "사우디아라비아 NEOM 공식 웹사이트에서 제공하는 THE LINE 프로젝트 정보입니다.",
    detailSummary: "NEOM은 사우디아라비아가 추진 중인 5,000억 달러 규모의 초대형 미래도시 프로젝트입니다. 그 중 THE LINE은 170km 길이의 수직 도시로, 자동차 없이 모든 이동이 가능한 혁신적인 도시 개념입니다.\n\n이 프로젝트에는 전 세계 유수의 건축사사무소들이 참여하고 있으며, 지속가능한 건축과 첨단 기술을 결합한 미래 도시의 모델을 제시하고 있습니다.\n\n아래 링크에서 NEOM THE LINE 프로젝트의 공식 정보를 확인하실 수 있습니다.",
    category: "산업",
    region: "사우디아라비아",
    source: "NEOM 공식",
    sourceUrl: "https://www.neom.com/en-us/regions/theline",
  },
  {
    id: 6,
    title: "국토교통부 건축 정책 및 뉴스",
    summary: "국토교통부 공식 웹사이트에서 제공하는 건축 관련 정책 및 뉴스입니다.",
    detailSummary: "국토교통부는 대한민국의 국토, 교통, 건설 정책을 총괄하는 중앙행정기관입니다. 스마트빌딩, 건축물 안전, 건설 산업 정책 등 건축 관련 공식 정보를 제공합니다.\n\n스마트빌딩 기술 표준화, IoT 기반 건물 관리 시스템, 에너지 관리 시스템 등 관련 정책 자료를 확인할 수 있습니다.\n\n아래 링크에서 국토교통부의 최신 건축 관련 뉴스와 정책을 확인하실 수 있습니다.",
    category: "정책",
    region: "국내",
    source: "국토교통부",
    sourceUrl: "https://www.molit.go.kr",
  },
  {
    id: 7,
    title: "China Daily 중국 건설 산업 뉴스",
    summary: "China Daily에서 제공하는 중국 건설 산업 관련 영문 뉴스입니다.",
    detailSummary: "China Daily는 중국의 대표적인 영문 매체로, 중국 건설 산업의 동향과 뉴스를 국제 독자들에게 전달하고 있습니다.\n\n중국의 건축 자재 시장, 부동산 개발, 인프라 건설 등 건설 산업 전반에 대한 뉴스와 분석을 제공합니다. 중국 건설 시장의 동향은 글로벌 건축 자재 가격에도 영향을 미칩니다.\n\n아래 링크에서 China Daily의 건설 산업 관련 최신 뉴스를 확인하실 수 있습니다.",
    category: "시장",
    region: "중국",
    source: "China Daily",
    sourceUrl: "https://www.chinadaily.com.cn/business",
  },
  {
    id: 8,
    title: "제로에너지건축물 인증제도 공식 안내",
    summary: "한국에너지공단에서 운영하는 제로에너지건축물 인증제도 공식 정보입니다.",
    detailSummary: "제로에너지건축물 인증제도는 한국에너지공단이 운영하는 공식 인증 제도입니다. 건물의 에너지 효율을 평가하고, 에너지 소비를 최소화한 건축물에 인증을 부여합니다.\n\n제로에너지 건축물은 단열 성능 강화, 고효율 설비, 신재생에너지 활용 등을 통해 건물 운영에 필요한 에너지를 자체 생산하는 건물입니다. 2027년부터는 민간 대형 건축물에도 인증이 의무화될 예정입니다.\n\n아래 링크에서 제로에너지건축물 인증제도의 상세 정보를 확인하실 수 있습니다.",
    category: "정책",
    region: "국내",
    source: "한국에너지공단",
    sourceUrl: "https://zeb.energy.or.kr",
  },
];

// Calculate the next update time (9 AM, 3 PM, 9 PM, 3 AM)
function getNextUpdateTime(): Date {
  const now = new Date();
  const updateHours = [3, 9, 15, 21]; // 3 AM, 9 AM, 3 PM, 9 PM
  
  const currentHour = now.getHours();
  
  // Find the next update hour
  let nextHour = updateHours.find(h => h > currentHour);
  
  const nextUpdate = new Date(now);
  if (nextHour !== undefined) {
    nextUpdate.setHours(nextHour, 0, 0, 0);
  } else {
    // Next day at 3 AM
    nextUpdate.setDate(nextUpdate.getDate() + 1);
    nextUpdate.setHours(3, 0, 0, 0);
  }
  
  return nextUpdate;
}

// Get last update time
function getLastUpdateTime(): Date {
  const now = new Date();
  const updateHours = [3, 9, 15, 21];
  
  const currentHour = now.getHours();
  
  // Find the last update hour
  const pastHours = updateHours.filter(h => h <= currentHour);
  
  const lastUpdate = new Date(now);
  if (pastHours.length > 0) {
    lastUpdate.setHours(pastHours[pastHours.length - 1], 0, 0, 0);
  } else {
    // Previous day at 9 PM
    lastUpdate.setDate(lastUpdate.getDate() - 1);
    lastUpdate.setHours(21, 0, 0, 0);
  }
  
  return lastUpdate;
}

export async function GET() {
  const lastUpdate = getLastUpdateTime();
  const nextUpdate = getNextUpdateTime();
  
  // Shuffle news based on last update time to simulate different news each update
  const seed = lastUpdate.getTime();
  const shuffledNews = [...architectureNews].sort(() => {
    return Math.sin(seed) - 0.5;
  });

  return NextResponse.json({
    news: shuffledNews,
    lastUpdate: lastUpdate.toISOString(),
    nextUpdate: nextUpdate.toISOString(),
  });
}
