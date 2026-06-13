"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  detailSummary: string;
  category: string;
  region: string;
  source: string;
  sourceUrl: string;
}

interface NewsResponse {
  news: NewsItem[];
  lastUpdate: string;
  nextUpdate: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getTimeUntilUpdate(nextUpdate: string) {
  const now = new Date();
  const next = new Date(nextUpdate);
  const diff = next.getTime() - now.getTime();
  
  if (diff <= 0) return "업데이트 중...";
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}시간 ${minutes}분 후`;
  }
  return `${minutes}분 후`;
}

function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    트렌드: "bg-blue-100 text-blue-800",
    기술: "bg-green-100 text-green-800",
    정책: "bg-yellow-100 text-yellow-800",
    산업: "bg-purple-100 text-purple-800",
    시장: "bg-orange-100 text-orange-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
}

export default function ArchitecturePage() {
  const { data, isLoading } = useSWR<NewsResponse>(
    "/api/architecture-news",
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute to check for updates
    }
  );

  const [timeUntil, setTimeUntil] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (data?.nextUpdate) {
      setTimeUntil(getTimeUntilUpdate(data.nextUpdate));
      
      const interval = setInterval(() => {
        setTimeUntil(getTimeUntilUpdate(data.nextUpdate));
      }, 60000); // Update countdown every minute
      
      return () => clearInterval(interval);
    }
  }, [data?.nextUpdate]);

  return (
    <div className="min-h-[calc(100vh-48px)] bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">건축설계 정보</h1>
          <p className="mt-2 text-gray-600">
            공식 기관 및 단체에서 제공하는 건축설계 관련 정보입니다
          </p>
          <p className="mt-1 text-sm text-gray-500">
            각 항목의 상세 정보는 해당 기관의 공식 웹사이트에서 확인하실 수 있습니다
          </p>
          
          {/* Update Info */}
          {data && (
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span>
                최근 업데이트: {formatDateTime(data.lastUpdate)}
              </span>
              <span className="text-gray-300">|</span>
              <span>
                다음 업데이트: {timeUntil}
              </span>
            </div>
          )}
        </div>

        {/* News List */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="border-gray-200">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          ) : (
            data?.news.map((item) => (
              <Card
                key={item.id}
                className="border-gray-200 transition-shadow hover:shadow-md cursor-pointer"
                onClick={() => handleNewsClick(item)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={getCategoryColor(item.category)}
                    >
                      {item.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={item.region === "국내" ? "border-red-300 text-red-700" : "border-blue-300 text-blue-700"}
                    >
                      {item.region}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-gray-900">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.summary}</p>
                  <p className="mt-2 text-xs text-gray-400">출처: {item.source}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* News Detail Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedNews && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className={getCategoryColor(selectedNews.category)}
                    >
                      {selectedNews.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={selectedNews.region === "국내" ? "border-red-300 text-red-700" : "border-blue-300 text-blue-700"}
                    >
                      {selectedNews.region}
                    </Badge>
                  </div>
                  <DialogTitle className="text-xl text-gray-900 leading-tight">
                    {selectedNews.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="mt-4">
                  <div className="prose prose-gray max-w-none">
                    {selectedNews.detailSummary.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  {/* Source Link */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">
                      출처: {selectedNews.source}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={selectedNews.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {selectedNews.source} 공식 사이트 방문
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
