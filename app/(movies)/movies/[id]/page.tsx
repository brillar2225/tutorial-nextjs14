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

export default async function MovieDetail({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  
  return (
    <div>
      <h1>Movie Detail: {id}</h1>
    </div>
  )
}