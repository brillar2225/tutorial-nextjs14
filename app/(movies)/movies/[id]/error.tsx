"use client";

import { useEffect } from "react";

/**
 * MEMO:
 * 그룹 라우팅되어 있는 페이지에서 에러가 발생한 경우 이 에러 페이지가 랜더링됨.
*/
export default function Error({
    error,
    reset
  }: {
    error: Error;
    reset: () => void;
  }) {
    
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Error: Something went wrong</h2>
      <p>Please try again later.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}