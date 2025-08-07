import styles from "../styles/movie-info.module.css";
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
    <div className={styles.container}>
      <img
        src={movie.poster_path}
        className={styles.poster}
        alt={movie.title}
      />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <h3>⭐️ {movie.vote_average.toFixed()}</h3>
        <p>{movie.overview}</p>
        <a href={movie.homepage} target={"_blank"}>
          Homepage &rarr;
        </a>
      </div>
    </div>
  );
}