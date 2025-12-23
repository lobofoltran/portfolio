import React from "react"
import {
  siGithub,
} from "simple-icons/icons"

export function IconGithubSimple(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d={siGithub.path} />
    </svg>
  )
}

export function IconLinkedinSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.028-3.039-1.853-3.039-1.854 0-2.137 1.447-2.137 2.943v5.665H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.268 2.372 4.268 5.456v6.287zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zm1.777 13.019H3.56V9h3.554v11.452z"/>
    </svg>
  )
}
