import React, { SVGProps } from 'react';

export const Icons = {
  profile: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 100 100" fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M50.402 22.575c11.447 0 20.725 9.279 20.725 20.726 0 4.292-1.697 8.404-3.537 11.588-1.841 3.183-5.327 5.433-7.494 7.515 2-2.794 4.844-5.306 6-8.382 1.151-3.075 1.115-5.116 1.306-6.477-.055-.562-.111-1.124-.17-1.686l-.555.138c-1.39.226-2.795.339-4.203.338-8.637 0-16.048-4.19-19.211-10.164l-1.008-2.592-3.263 2.2a16.585 16.585 0 0 0-4.872 11.766c0 4.596 1.86 8.756 4.872 11.767l3.343 3.086c-7.439-3.147-12.658-10.512-12.658-19.097 0-11.447 9.28-20.727 20.725-20.727ZM50 3.697C24.426 3.697 3.697 24.427 3.697 50c0 11.987 4.554 22.91 12.028 31.133l.976 1.022 1.367-1.368 2.653-6.028c2.598-5.211 2.128-3.76 10.303-4.511h38.757c8.123.752 7.78-.7 9.98 4.511l1.865 4.89c.382.543 1.003 1.093 1.657 1.614l.502.386.49-.516C91.749 72.91 96.303 61.987 96.303 50c0-25.573-20.73-46.303-46.303-46.303ZM50 0c27.614 0 50 22.386 50 50s-22.386 50-50 50C22.387 100 0 77.614 0 50S22.387 0 50 0Z" clipRule="evenodd" />
    </svg>
  ),
  search: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 19 19" fill="none" {...props}>
      <path d="M18.0002 18L12.9502 12.95M18.5002 18.5L15.0002 15" stroke="currentColor" />
      <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="currentColor" />
    </svg>
  ),
  add: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 22 22" fill="none" {...props}>
      <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="currentColor" />
      <path d="M14 11H11M11 11H8M11 11V8M11 11V14" stroke="currentColor" />
    </svg>
  ),
  caretDown: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 400 286"
      fill="none" {...props}>
      <path fill="currentColor" d="m400 .625-199.925 284.75L0 .625h400Z" />
    </svg>
  ),
  circle: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z" clipRule="evenodd" />
    </svg>
  ),
  calendar: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M0 4a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Zm4-2.5h10A2.5 2.5 0 0 1 16.5 4v.75h-15V4A2.5 2.5 0 0 1 4 1.5Zm12.5 4.75V14a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 14V6.25h15Z" clipRule="evenodd" />
      <path fill="currentColor" d="M5.5 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM10 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm4.5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM10 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    </svg>
  ),
  passenger: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 18 19" width={18} height={19} fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M1.5 16.5v.5h15v-.5c0-.597-.354-1.421-1.545-2.166C13.76 13.589 11.81 13 9 13s-4.76.588-5.955 1.334C1.854 15.08 1.5 15.905 1.5 16.5Zm-1.5 0v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1c0-2.5-3-5-9-5s-9 2.5-9 5ZM9 10a4.5 4.5 0 0 0 4.5-4.5v-1a4.5 4.5 0 1 0-9 0v1A4.5 4.5 0 0 0 9 10Zm3-4.5v-1a3 3 0 0 0-6 0v1a3 3 0 1 0 6 0Z" clipRule="evenodd" />
    </svg>
  ),
  increment: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M10 18.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Zm0 1.5c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z" clipRule="evenodd" />
      <path fill="currentColor" d="M10.75 6a.75.75 0 1 0-1.5 0v3.25H6a.75.75 0 0 0 0 1.5h3.25V14a.75.75 0 1 0 1.5 0v-3.25H14a.75.75 0 1 0 0-1.5h-3.25V6Z" />
    </svg>
  ),
  decrement: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M10 18.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Zm0 1.5c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z" clipRule="evenodd" />
      <path fill="currentColor" fillRule="evenodd" d="M5.25 10A.75.75 0 0 1 6 9.25h8a.75.75 0 1 1 0 1.5H6a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
    </svg>
  ),
  coins: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5.5 2V4.5H13.5V2H5.5ZM4 1.5V4.5H3C2.73478 4.5 2.48043 4.60536 2.29289 4.79289C2.10536 4.98043 2 5.23478 2 5.5V8.5H1C0.734784 8.5 0.48043 8.60536 0.292893 8.79289C0.105357 8.98043 0 9.23478 0 9.5V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H2V17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H12.5C13.9169 18.0022 15.2799 17.4576 16.3051 16.4796C17.3303 15.5016 17.9385 14.1656 18.0029 12.7502C18.0674 11.3349 17.5832 9.94919 16.6511 8.88203C15.7191 7.81488 14.4112 7.14858 13 7.022V6H14C14.2652 6 14.5196 5.89464 14.7071 5.70711C14.8946 5.51957 15 5.26522 15 5V1.5C15 1.23478 14.8946 0.98043 14.7071 0.792893C14.5196 0.605357 14.2652 0.5 14 0.5H5C4.73478 0.5 4.48043 0.605357 4.29289 0.792893C4.10536 0.98043 4 1.23478 4 1.5ZM11.5 7.09V6H3.5V8.5H8.725C9.49493 7.7726 10.4585 7.28299 11.5 7.09ZM7.6 10H1.5V12.5H7C7 11.6 7.216 10.75 7.6 10ZM7.207 14H3.5V16.5H8.725C8.00264 15.8189 7.47809 14.9551 7.207 14ZM16.5 12.5C16.5 13.5609 16.0786 14.5783 15.3284 15.3284C14.5783 16.0786 13.5609 16.5 12.5 16.5C11.4391 16.5 10.4217 16.0786 9.67157 15.3284C8.92143 14.5783 8.5 13.5609 8.5 12.5C8.5 11.4391 8.92143 10.4217 9.67157 9.67157C10.4217 8.92143 11.4391 8.5 12.5 8.5C13.5609 8.5 14.5783 8.92143 15.3284 9.67157C16.0786 10.4217 16.5 11.4391 16.5 12.5Z" />
    </svg>
  ),
  userCard: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 20 16" fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M18 1.5H2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5V2a.5.5 0 0 0-.5-.5ZM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Z" clipRule="evenodd" />
      <path fill="currentColor" fillRule="evenodd" d="M11.5 11.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Zm0-3.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 1 1 0 1.5h-3.5A.75.75 0 0 1 11.5 8Zm0-3.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 1 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75Zm-4.625 1.5a.75.75 0 0 0-1.5 0v2.531c-.662.29-1.125.95-1.125 1.719v.5H3v-.5a3.12 3.12 0 0 1 1.373-2.588 2.25 2.25 0 1 1 3.504 0A3.12 3.12 0 0 1 9.25 10.5v.5H8v-.5c0-.769-.463-1.43-1.125-1.719V6.25Z" clipRule="evenodd" />
    </svg>
  ),
  lightning: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 14 20" fill="none" {...props}>
      <path fill="currentColor" fillRule="evenodd" d="M7.5 9.5V3.958L2.52 10.5H6.5v5.542L11.48 9.5H7.5Zm6-1.498a.5.5 0 0 1 .397.801l-8.45 11.098a.25.25 0 0 1-.449-.15v-7.753H.501a.5.5 0 0 1-.398-.8L8.553.098a.25.25 0 0 1 .45.151v7.752h4.496Z" clipRule="evenodd" />
    </svg>
  ),
  dangerModal: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 340 168" fill="none" {...props}>
      <path fill="#fff" d="M24.59 1.26h290.82a22.664 22.664 0 0 1 20.935 13.988 22.655 22.655 0 0 1 1.725 8.672v142.83H1.94V23.92A22.66 22.66 0 0 1 24.59 1.26Z" />
      <path fill="#054752" d="M339.09 167.77H.91V23A22.79 22.79 0 0 1 23.67.23h292.66A22.79 22.79 0 0 1 339.09 23v144.77ZM3 165.72h334V23a20.728 20.728 0 0 0-20.71-20.71H23.67A20.73 20.73 0 0 0 3 23v142.72Z" />
      <path fill="#EDEDED" d="M303.4 25.93H100.76c-9.505 0-17.21 7.703-17.21 17.205 0 9.502 7.705 17.205 17.21 17.205H303.4c9.505 0 17.21-7.703 17.21-17.205 0-9.502-7.705-17.205-17.21-17.205Z" />
      <path fill="#F53F5B" d="M293.77 36.59H134.06a6.547 6.547 0 0 0-6.55 6.545 6.547 6.547 0 0 0 6.55 6.545h159.71c3.617 0 6.55-2.93 6.55-6.545a6.548 6.548 0 0 0-6.55-6.545Z" />
      <path fill="#F53F5B" fillRule="evenodd" d="M86.6 11.3a9.08 9.08 0 0 1 3.08 3.08l30.46 50.77a8.998 8.998 0 0 1-3.08 12.34 9.09 9.09 0 0 1-4.63 1.28H51.51a9 9 0 0 1-7.71-13.62l30.46-50.77A9 9 0 0 1 86.6 11.3Z" clipRule="evenodd" />
      <path fill="#fff" fillRule="evenodd" d="M86 16.89a7.84 7.84 0 0 1 2.67 2.67L115 63.45a7.758 7.758 0 0 1-2.742 10.718 7.758 7.758 0 0 1-3.918 1.052h-52.7A7.77 7.77 0 0 1 49 63.45l26.34-43.89A7.77 7.77 0 0 1 86 16.89Zm-8 4.27L51.67 65.05a4.6 4.6 0 0 0-.67 2.4 4.66 4.66 0 0 0 4.67 4.66h52.67a4.742 4.742 0 0 0 2.4-.66 4.68 4.68 0 0 0 1.6-6.4L86 21.16a4.54 4.54 0 0 0-1.6-1.6 4.66 4.66 0 0 0-6.4 1.6Zm4 36a2.81 2.81 0 1 1 0 5.62 2.81 2.81 0 0 1 0-5.62Zm0-22.68a2.72 2.72 0 0 1 2.72 2.72v.15l-.83 14.78a1.86 1.86 0 1 1-3.72 0l-.86-14.78a2.71 2.71 0 0 1 2.54-2.86l.15-.01Z" clipRule="evenodd" />
      <path fill="#054752" d="M3.09 92.64h334.97v2.05H3.09v-2.05ZM24.82 36.99a9.24 9.24 0 1 0 0-18.48 9.24 9.24 0 0 0 0 18.48Z" />
      <path fill="#fff" d="M20.63 33a1 1 0 0 1-.72-.3 1 1 0 0 1 0-1.45l8.37-8.37a1.025 1.025 0 0 1 1.45 1.45l-8.37 8.37a1.001 1.001 0 0 1-.73.3Z" />
      <path fill="#fff" d="M29 33a1.002 1.002 0 0 1-.73-.3l-8.37-8.37a1.025 1.025 0 0 1 1.45-1.45l8.37 8.37a1 1 0 0 1 0 1.45 1 1 0 0 1-.72.3Z" />
      <path fill="#EDEDED" d="M304.56 115.61H28.12a6.547 6.547 0 0 0-6.55 6.545 6.547 6.547 0 0 0 6.55 6.545h276.44c3.617 0 6.55-2.93 6.55-6.545a6.548 6.548 0 0 0-6.55-6.545ZM156.64 138.71H28.12a6.547 6.547 0 0 0-6.55 6.545 6.547 6.547 0 0 0 6.55 6.545h128.52c3.617 0 6.55-2.93 6.55-6.545a6.548 6.548 0 0 0-6.55-6.545Z" />
    </svg>

  )
};
