import { BASE_URL } from "../app/(home)/page";

async function getVideos(id: string) {
  const response = await fetch(`${BASE_URL}/${id}/videos`);
  const json = await response.json();
  return json;
}

interface VideosListProps {
  id: string;
}

export default async function VideosList({ id }: VideosListProps) {
  const videos = await getVideos(id);
  return (
    <ul>
      {videos.map((video) => (
        <li key={video.id}>
          <a href={`https://www.youtube.com/watch?v=${video.key}`}>{video.name}</a>
        </li>
      ))}
    </ul>
  );
}