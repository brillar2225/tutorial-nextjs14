import styles from "../../styles/home.module.css";
import Movie from "../../components/movie";

export const metadata = {
  title: 'Home',
}

export const BASE_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

/**
 * MEMO:
 * 서버 컴포넌트에서 데이터를 가져오는 방법
 * 1. 서버 컴포넌트에서 데이터를 가져오는 함수를 만든다.
 * 2. 해당 함수를 호출하여 데이터를 가져온다.
 *   - 호출 시에는 비동기 함수로 호출해야 한다(export default async function Page() {...}).
 * 3. 가져온 데이터를 클라이언트 컴포넌트에서 사용한다.
 */
async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(BASE_URL);
  const json = await response.json();
  return json;
}

export default async function Page() {
  const movies = await getMovies();

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          id={movie.id}
          poster_path={movie.poster_path}
        />
      ))}
    </div>
  )
}