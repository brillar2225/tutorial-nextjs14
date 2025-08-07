/**
 * MEMO:
 * Next.js에서 동적 라우트의 params 처리 방법에 대해서
 * 
 * <version 14>
 * @description 동기적으로 params를 구조분해할당해서 사용
 * @example
 * export default function MovieDetail({
 *  params: { id }
 * }: {
 *  params: { id: string }
 * }) {
 *  const { id } = params;
 * }
 * 
 * <version 15>
 * @description params를 Promise로 반환하고 비동기적으로 처리
 * @example
 * export default async function MovieDetail({
 *  params
 * }: {
 *  params: Promise<{ id: string }>
 * }) {
 *  const { id } = await params;
 * }
 * 
 */

import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import VideosList from "../../../../components/videos-list";
import ErrorBoundary from "../../../../components/error-boundary";

interface MovieDetailProps {
  params: { id: string };
}

export default async function MovieDetail({ params: { id } }: MovieDetailProps) {
  /** 
   * MEMO:
   * ```tsx
   * const movie = await getMovie(id);
   * const videos = await getVideos(id);
   * ```
   * 위와 같이 비동기 함수를 호출하면 순차적으로 실행되기 때문에 movie가 완료되기까지 videos는 대기하게 됨.
   * 따라서 Promise.all과 같이 동시에 실행되도록 최적화 해야함(ex: const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);).
   * 하지만 이것은 movie와 videos가 각각 완료될 때 랜더링되는 것이 아니라 모두 완료되어야만 랜더링되는 문제가 있음.
   * 그래서 이 둘을 분리하고 각각 랜더링 되도록 해야함. 이때 Suspense를 사용하여 서버 컴포넌트 단위로 랜더링시킬 수 있음.
   * 즉, 다음과 같이 정리할 수 있음:
   * page 단위 로딩 => loading.tsx
   * server component 단위 로딩 => Suspense
   * 
   * @see https://g.co/gemini/share/8a73988ebe7f
  */
  return (
    <div>
      <h1>Movie Detail Page</h1>
      <Suspense fallback={<p>Loading movie info...</p>}>
        <MovieInfo id={id} />
      </Suspense>
      <ErrorBoundary fallback={<p>Failed to load videos</p>}>
        <Suspense fallback={<p>Loading videos...</p>}>  
          <VideosList id={id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}