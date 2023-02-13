import * as React from 'react'
import { SVGProps } from 'react'

const SvgTwitter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21 6.778c-.675.31-1.35.542-2.1.619.75-.464 1.35-1.237 1.65-2.088-.75.464-1.5.773-2.325.928A3.583 3.583 0 0 0 15.525 5C13.5 5 11.85 6.701 11.85 8.789c0 .309 0 .618.075.85-3.15-.154-5.85-1.7-7.65-4.02-.375.618-.525 1.237-.525 1.933 0 1.314.675 2.474 1.65 3.17-.6 0-1.2-.155-1.65-.464v.077c0 1.856 1.275 3.402 2.925 3.711-.3.078-.6.155-.975.155-.225 0-.45 0-.675-.077.45 1.546 1.8 2.629 3.45 2.629-1.275 1.005-2.85 1.623-4.575 1.623-.3 0-.6 0-.9-.077A10.271 10.271 0 0 0 8.625 20c6.825 0 10.5-5.799 10.5-10.825v-.464c.75-.54 1.35-1.237 1.875-1.933Z" />
  </svg>
)

export default SvgTwitter
