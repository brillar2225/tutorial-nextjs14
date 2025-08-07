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

import { BASE_URL } from "../../../(home)/page";

async function getMovie(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`);
  const json = await response.json();
  return json;
}

async function getVideos(id: string) {
  const response = await fetch(`${BASE_URL}/${id}/videos`);
  const json = await response.json();
  return json;
}

export default async function MovieDetail({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  /** 
   * MEMO:
   * ```tsx
   * const movie = await getMovie(id);
   * const videos = await getVideos(id);
   * ```
   * 위와 같이 비동기 함수를 호출하면 순차적으로 실행되기 때문에 movie가 완료되기까지 videos는 대기하게 됨.
   * 따라서 아래의 Promise.all과 같이 동시에 실행되도록 최적화 해야함.
  */
  const [movie, videos] = await Promise.all([
    getMovie(id),
    getVideos(id)
  ]);

  return (
    <div>
      <h1>{movie.title}</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <a href={`https://www.youtube.com/watch?v=${video.key}`}>{video.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}