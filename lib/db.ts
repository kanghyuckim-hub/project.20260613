import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL 환경변수가 설정되지 않았습니다. .env.local을 확인하세요.");
}

// HTTP 기반 쿼리 함수 - Next.js 서버리스 라우트에서 사용
export const sql = neon(process.env.DATABASE_URL);
