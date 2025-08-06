"use client"

/**
 * MEMO:
 * 'use client' 라는 키워드를 사용하면 클라이언트 컴포넌트로 변경됨
 * 단, Next.js App Router에서 말하는 클라이언트 컴포넌트는 CSR의 의미가 아닌 SSR 위에서 동적 랜더링을 위해 hydrate된 컴포넌트를 의미함.
 * 즉, Next.js의 버전 14 이후로 기본적으로는 필요한 HTML 구조를 서버에서 랜더링 되고,
 * 클라이언트에서 동적으로 동작해야 하는 부분이 있다면 hydrate해서 JavaScript와 상호작용하는 방식을 택하고 있음.
 * @example state management, event handling, and access to browser APIs
 * @see https://nextjs.org/docs/app/api-reference/directives/use-client
*/

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();

  return (
    <ul>
      <li>
        <Link href="/">HOME {path === '/' ? '🔥' : ''}</Link>
      </li>
      <li>
        <Link href="/about-us">About Us {path === '/about-us' ? '🔥' : ''}</Link>
      </li>
    </ul>
  )
}