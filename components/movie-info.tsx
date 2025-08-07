import { BASE_URL } from "../app/(home)/page";

async function getMovie(id: string) {
  // MEMO: Next.js 15부터 기본 캐싱이 없어졌기 때문에 아래와 같이 두번째 인자에 명시적으로 전달해야 캐싱이 됨.
  const response = await fetch(`${BASE_URL}/${id}`, {
    cache: "force-cache",
  });
  const json = await response.json();
  return json;
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);
  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  );
}