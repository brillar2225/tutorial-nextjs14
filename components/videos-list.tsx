import styles from "../styles/video-list.module.css";
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
    <div className={styles.container}>
      {videos.map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.name}
        />
      ))}
    </div>
  );
}