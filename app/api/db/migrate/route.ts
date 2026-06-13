import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// POST /api/db/migrate — 테이블 초기 생성
export async function POST() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id          SERIAL PRIMARY KEY,
        email       VARCHAR(255) UNIQUE NOT NULL,
        name        VARCHAR(255),
        provider    VARCHAR(50) DEFAULT 'email',
        created_at  TIMESTAMPTZ DEFAULT NOW(),
        updated_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS monthly_reports (
        id            SERIAL PRIMARY KEY,
        user_id       INTEGER REFERENCES users(id) ON DELETE SET NULL,
        title         VARCHAR(500),
        data_filename VARCHAR(500),
        html_content  TEXT,
        created_at    TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS financial_analyses (
        id              SERIAL PRIMARY KEY,
        user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL,
        company_name    VARCHAR(255),
        fiscal_year     VARCHAR(10),
        industry        VARCHAR(255),
        financial_data  JSONB,
        ratios          JSONB,
        valuations      JSONB,
        created_at      TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    return NextResponse.json({ ok: true, message: "테이블이 생성되었습니다." });
  } catch (error) {
    console.error("마이그레이션 오류:", error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}

// GET /api/db/migrate — 연결 상태 확인
export async function GET() {
  try {
    const result = await sql`SELECT NOW() AS time, current_database() AS db`;
    return NextResponse.json({
      ok: true,
      connected: true,
      time: result[0].time,
      database: result[0].db,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, connected: false, error: String(error) },
      { status: 500 }
    );
  }
}
