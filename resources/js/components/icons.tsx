import React, { SVGProps } from 'react';

export const Icons = {
  user: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path fill="currentColor" d="M3.21101 16.5596C4.32212 15.8563 5.41284 15.3364 6.48318 15C7.55352 14.6636 8.72579 14.4954 10 14.4954C11.2742 14.4954 12.4465 14.6636 13.5168 15C14.5872 15.3364 15.683 15.8563 16.8043 16.5596C17.6504 15.7136 18.3053 14.7335 18.7691 13.6196C19.2329 12.5058 19.4648 11.2986 19.4648 9.99786C19.4648 7.37604 18.5425 5.14342 16.6979 3.3C14.8532 1.45678 12.6182 0.535168 9.99297 0.535168C7.36769 0.535168 5.13507 1.45678 3.29511 3.3C1.45515 5.14342 0.535168 7.37604 0.535168 9.99786C0.535168 11.2986 0.767074 12.5058 1.23089 13.6196C1.6947 14.7335 2.35474 15.7136 3.21101 16.5596ZM10.0034 11.3761C9.00214 11.3761 8.15494 11.0307 7.46177 10.3398C6.7686 9.64883 6.42202 8.80275 6.42202 7.80153C6.42202 6.80031 6.76748 5.95311 7.45841 5.25994C8.14934 4.56677 8.99541 4.22018 9.99664 4.22018C10.9979 4.22018 11.8451 4.56565 12.5382 5.25658C13.2314 5.9475 13.578 6.79358 13.578 7.7948C13.578 8.79603 13.2325 9.64322 12.5416 10.3364C11.8507 11.0296 11.0046 11.3761 10.0034 11.3761ZM10.0086 20C8.62854 20 7.32783 19.7425 6.10642 19.2275C4.88522 18.7123 3.81957 17.9988 2.90948 17.0869C1.99939 16.1747 1.28695 15.1091 0.772171 13.8899C0.25739 12.6709 0 11.3696 0 9.98593C0 8.59042 0.257492 7.2896 0.772477 6.08349C1.28767 4.87757 2.00122 3.81957 2.91315 2.90948C3.82528 1.99939 4.89093 1.28695 6.11009 0.772171C7.32905 0.25739 8.63038 0 10.0141 0C11.4096 0 12.7104 0.257493 13.9165 0.772477C15.1224 1.28767 16.1804 2.00122 17.0905 2.91315C18.0006 3.82528 18.713 4.88593 19.2278 6.09511C19.7426 7.30428 20 8.60306 20 9.99144C20 11.3715 19.7425 12.6722 19.2275 13.8936C18.7123 15.1148 17.9988 16.1804 17.0869 17.0905C16.1747 18.0006 15.1141 18.713 13.9049 19.2278C12.6957 19.7426 11.3969 20 10.0086 20Z" />
    </svg>
  ),
  autorenew: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 14 20" fill="none" {...props}>
      <path fill="currentColor" d="M.85 13.384a8.265 8.265 0 0 1-.62-1.604A6.733 6.733 0 0 1 0 10c0-2.037.689-3.771 2.066-5.202 1.377-1.431 3.07-2.121 5.08-2.07L5.76 1.287 7 0l3.5 3.636L7 7.273 5.76 5.985l1.386-1.44c-1.523-.033-2.803.489-3.84 1.566C2.269 7.19 1.75 8.485 1.75 10a5.269 5.269 0 0 0 .389 2.046L.85 13.384ZM7 20l-3.5-3.636L7 12.727l1.24 1.288-1.386 1.44c1.523.033 2.803-.489 3.84-1.566C11.731 12.81 12.25 11.515 12.25 10a5.268 5.268 0 0 0-.389-2.045l1.288-1.339c.26.505.466 1.04.62 1.604.154.564.231 1.157.231 1.78 0 2.02-.689 3.75-2.066 5.19-1.377 1.439-3.07 2.133-5.08 2.083l1.386 1.44L7 20Z" />
    </svg>
  ),
  visibility: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 20 14" fill="none" {...props}>
      <path fill="currentColor" d="M10.002 10.134c1.012 0 1.872-.353 2.579-1.06.707-.707 1.06-1.566 1.06-2.576s-.354-1.868-1.062-2.574c-.709-.705-1.57-1.058-2.581-1.058-1.012 0-1.872.353-2.579 1.06-.707.707-1.06 1.566-1.06 2.576S6.713 8.37 7.42 9.076c.709.705 1.57 1.058 2.581 1.058Zm0-1.288a2.275 2.275 0 0 1-1.665-.684 2.254 2.254 0 0 1-.687-1.66c0-.65.228-1.205.685-1.662a2.263 2.263 0 0 1 1.663-.686c.652 0 1.207.228 1.665.684.458.455.687 1.009.687 1.66 0 .65-.228 1.205-.685 1.662a2.262 2.262 0 0 1-1.662.686Zm0 4.154c-2.186 0-4.175-.594-5.967-1.781A11.107 11.107 0 0 1 0 6.5a11.11 11.11 0 0 1 4.034-4.72C5.824.595 7.814 0 10 0s4.174.594 5.966 1.781A11.108 11.108 0 0 1 20 6.5a11.11 11.11 0 0 1-4.034 4.719C14.176 12.406 12.186 13 10 13ZM10 11.808a9.66 9.66 0 0 0 5.094-1.42A9.43 9.43 0 0 0 18.69 6.5a9.43 9.43 0 0 0-3.596-3.887A9.66 9.66 0 0 0 10 1.192a9.66 9.66 0 0 0-5.094 1.42A9.43 9.43 0 0 0 1.31 6.5a9.43 9.43 0 0 0 3.596 3.887A9.661 9.661 0 0 0 10 11.808Z" />
    </svg>
  ),
  visibilityOff: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 20 16" fill="none" {...props}>
      <path fill="currentColor" d="m13.476 8.628-1.15-1.104c.08-.7-.125-1.254-.613-1.66-.488-.407-1.024-.571-1.607-.495l-1.15-1.102c.159-.05.33-.086.515-.107.185-.02.36-.03.528-.03 1.022 0 1.885.337 2.588 1.012.703.675 1.054 1.504 1.054 2.485 0 .16-.01.334-.032.52a1.438 1.438 0 0 1-.133.481Zm3.2 3.073-.858-.822a12.032 12.032 0 0 0 1.623-1.463 7.858 7.858 0 0 0 1.249-1.79c-.8-1.592-1.985-2.841-3.555-3.747-1.569-.907-3.28-1.36-5.135-1.36-.418 0-.845.028-1.28.082a8.168 8.168 0 0 0-1.238.249l-.993-.954a8.119 8.119 0 0 1 1.747-.412A14.44 14.44 0 0 1 10 1.373c2.148 0 4.143.557 5.988 1.672C17.832 4.159 19.169 5.686 20 7.626a9.24 9.24 0 0 1-1.366 2.197 12.86 12.86 0 0 1-1.958 1.878ZM17.033 16l-2.991-2.895a9.574 9.574 0 0 1-1.85.561c-.69.142-1.421.213-2.192.213-2.153 0-4.147-.558-5.984-1.672C2.179 11.092.84 9.566 0 7.627a9.358 9.358 0 0 1 1.55-2.464 11.92 11.92 0 0 1 2.177-1.961L1.257.81 2.103 0l15.796 15.189-.865.811ZM4.592 4.037c-.626.42-1.244.94-1.855 1.557A7.156 7.156 0 0 0 1.31 7.626c.8 1.592 1.985 2.84 3.555 3.747 1.569.906 3.28 1.359 5.135 1.359.575 0 1.148-.045 1.72-.136a8.199 8.199 0 0 0 1.431-.341l-1.527-1.446a3.394 3.394 0 0 1-.782.23 4.738 4.738 0 0 1-.843.083c-1.02 0-1.881-.338-2.585-1.012-.704-.675-1.055-1.503-1.055-2.484 0-.241.037-.503.11-.785.075-.283.146-.535.215-.757L4.592 4.037Z" />
    </svg>
  ),
  checked: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 15" {...props}>
      <path fill="currentColor" d="M6.838 15 0 8.23l1.946-1.972 4.892 4.869L18.054 0 20 1.937 6.838 15Z" />
    </svg>
  ),
  east: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 14" {...props}>
      <path fill="currentColor" d="m13.081 14-.941-.961 5.292-5.358H0V6.319h17.442L12.126.967 13.08 0 20 7.003 13.081 14Z" />
    </svg>
  ),
  west: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 14" {...props}>
      <path fill="currentColor" d="M6.924 14 0 7.003 6.924 0l.95.967-5.317 5.352H20v1.362H2.568l5.298 5.358-.942.961Z" />
    </svg>
  ),
  dropDown: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 16 10" fill="none" {...props}>
      <path fill="currentColor" d="M6.87 9.512c.625.65 1.64.65 2.264 0l6.397-6.664a1.71 1.71 0 0 0 .345-1.817C15.626.406 15.046 0 14.396 0L1.603.005C.957.005.372.411.122 1.036a1.72 1.72 0 0 0 .346 1.817l6.397 6.664.005-.005Z" />
    </svg>
  ),
  journal: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 18 20" fill="none" {...props}>
      <path fill="currentColor" d="M2.59651 20C1.87532 20 1.26223 19.761 0.757218 19.283C0.252406 18.805 0 18.2217 0 17.5332V2.47443C0 1.7872 0.250751 1.20299 0.752252 0.721792C1.25356 0.240597 1.86539 0 2.58775 0H14.1529V16.4135H2.59651C2.26873 16.4135 1.98906 16.52 1.75749 16.733C1.52593 16.9461 1.41014 17.2102 1.41014 17.5253C1.41014 17.8402 1.52593 18.1068 1.75749 18.3252C1.98906 18.5434 2.26873 18.6525 2.59651 18.6525H16.5989V2.02293H18V20H2.59651ZM5.13927 15.066H12.7518V1.33344H5.13927V15.066ZM3.73818 15.0669V1.33344H2.59651C2.26036 1.33344 1.97864 1.45089 1.75136 1.68577C1.52388 1.92066 1.41014 2.18382 1.41014 2.47527V15.4009C1.56361 15.303 1.74221 15.2228 1.94592 15.1604C2.14964 15.0981 2.3665 15.0669 2.59651 15.0669H3.73818Z" />
    </svg>
  ),
  schedule: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 18 20" {...props}>
      <path fill="currentColor" d="M1.754 20c-.486 0-.9-.166-1.242-.499C.171 19.168 0 18.776 0 18.324V4.478c0-.452.17-.844.512-1.177.341-.332.756-.499 1.245-.499h2.665V0h1.443v2.802h6.315V0h1.398v2.802h2.665c.489 0 .904.167 1.245.5.341.332.512.724.512 1.176v13.846c0 .452-.17.844-.512 1.177a1.714 1.714 0 0 1-1.242.499H1.754Zm.003-1.336h14.486a.35.35 0 0 0 .247-.107.321.321 0 0 0 .112-.236V9.138H1.398v9.183c0 .086.038.165.112.236a.35.35 0 0 0 .247.107ZM1.398 7.802h15.204V4.48a.321.321 0 0 0-.112-.236.35.35 0 0 0-.247-.107H1.757a.35.35 0 0 0-.247.107.321.321 0 0 0-.112.236V7.8Zm2.414 4.613v-1.336h10.376v1.336H3.812Zm0 3.943v-1.336h7.625v1.336H3.812Z" />
    </svg>
  ),
  users: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 15" {...props}>
      <path fill="currentColor" d="M0 15v-1.92c0-.439.101-.822.303-1.148.202-.326.493-.6.872-.823.94-.564 1.929-1.01 2.966-1.337 1.037-.327 2.213-.49 3.528-.49 1.316 0 2.49.163 3.522.49 1.032.327 2.02.773 2.966 1.338.378.223.668.498.87.824.202.326.303.708.303 1.146V15H0Zm17.412 0v-1.804c0-.737-.14-1.403-.418-2-.278-.595-.637-1.077-1.077-1.445.512.163 1.021.354 1.528.571.506.218 1.012.484 1.516.798.308.172.558.45.75.831.193.382.289.797.289 1.245V15h-2.588ZM7.67 7.169c-.983 0-1.813-.345-2.488-1.033C4.506 5.447 4.17 4.6 4.17 3.598c0-1.004.337-1.85 1.012-2.539C5.856.371 6.686.026 7.67.026c.984 0 1.814.345 2.489 1.033.675.689 1.012 1.535 1.012 2.539 0 1.003-.337 1.849-1.012 2.538-.675.688-1.505 1.033-2.489 1.033Zm7.84-3.584c0 .994-.337 1.838-1.012 2.53-.675.692-1.505 1.039-2.488 1.039-.052 0-.072.006-.06.018.013.012-.01.012-.07-.001.418-.486.75-1.028.993-1.625a5.13 5.13 0 0 0 .366-1.957c0-.705-.125-1.356-.376-1.952A6.67 6.67 0 0 0 11.879 0a.31.31 0 0 1 .068.017c.015.006.036.01.062.01.983 0 1.813.345 2.488 1.036.675.69 1.012 1.531 1.012 2.522Zm-14.1 9.978h12.512v-.482a.812.812 0 0 0-.112-.43c-.074-.123-.208-.238-.401-.347a11.044 11.044 0 0 0-2.653-1.17c-.945-.277-1.972-.415-3.083-.415-1.114 0-2.145.133-3.092.4a9.99 9.99 0 0 0-2.658 1.185c-.197.106-.332.219-.404.338a.822.822 0 0 0-.109.435v.486ZM7.674 5.73c.578 0 1.07-.209 1.477-.626.407-.418.61-.922.61-1.512S9.556 2.5 9.147 2.086a2.007 2.007 0 0 0-1.482-.622c-.579 0-1.071.209-1.478.626a2.09 2.09 0 0 0-.61 1.512c0 .59.206 1.093.615 1.507.41.415.903.622 1.482.622Z" />
    </svg>
  ),
  class: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 16" {...props}>
      <path fill="currentColor" d="m9.993 16-6.269-3.233V6.999L0 5.11 9.993 0 20 5.112v7.432h-1.266V5.748l-2.471 1.253v5.766L9.993 16Zm0-7.222L17.05 5.11 9.993 1.454 2.95 5.11l7.043 3.668Zm0 5.743 5.004-2.59V7.654l-5.004 2.578L4.99 7.654v4.277l5.003 2.59Z" />
    </svg>
  ),
  monitoring: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 20" {...props}>
      <path fill="currentColor" d="M0 20v-2.948l1.738-1.794V20H0Zm4.566 0v-7.66l1.52-1.57.217.225V20H4.566Zm4.565 0v-6.986l1.738 1.794V20H9.13Zm4.566 0v-6.314l1.738-1.794V20h-1.738Zm4.565 0V8.974L20 7.18V20h-1.738ZM0 12.41V9.87l6.518-6.734 5.218 5.385L20 0v2.539l-8.264 8.522-5.218-5.385L0 12.41Z" />
    </svg>
  ),
  settings: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 20" {...props}>
      <path fill="currentColor" d="m8.369 20-.631-2.958a12.368 12.368 0 0 1-1.626-.683 7.462 7.462 0 0 1-1.47-.955l-2.999.928L0 13.623l2.378-1.977a9.159 9.159 0 0 1-.12-.775 7.653 7.653 0 0 1-.044-.849c0-.257.017-.523.051-.798.035-.275.075-.573.123-.892L0 6.372l1.643-2.665 3.028.94c.43-.36.902-.678 1.42-.95a11.567 11.567 0 0 1 1.635-.707L8.37 0h3.262l.631 2.97c.567.202 1.097.435 1.589.696.492.262.965.589 1.417.98l3.089-.94L20 6.373 17.504 8.41c.059.274.1.535.126.783.026.248.039.52.039.815 0 .287-.014.559-.042.814a24.56 24.56 0 0 1-.103.82l2.45 1.98-1.643 2.71-3.063-.962c-.43.365-.886.677-1.368.935-.482.259-1.028.5-1.638.724l-.63 2.97H8.368Zm1.1-1.346h1.03l.592-2.825a6.64 6.64 0 0 0 2.002-.69 6.027 6.027 0 0 0 1.655-1.339l2.88.942.532-.816-2.306-1.894c.109-.347.197-.684.265-1.01a4.99 4.99 0 0 0 .1-1.013c0-.36-.03-.695-.093-1.005a8.076 8.076 0 0 0-.272-.992l2.33-1.935-.509-.82-2.947.932c-.4-.483-.942-.912-1.627-1.285-.684-.374-1.359-.612-2.024-.716l-.552-2.842H9.45l-.528 2.823a6.707 6.707 0 0 0-2.051.665c-.603.317-1.168.769-1.697 1.355l-2.85-.931-.538.819L4.05 7.954a6.506 6.506 0 0 0-.283.998 5.52 5.52 0 0 0-.007 2.095c.064.336.152.672.264 1.008l-2.236 1.868.538.82 2.83-.899a6.317 6.317 0 0 0 1.705 1.333c.623.33 1.306.556 2.05.677l.56 2.8Zm.43-5.276c.994 0 1.836-.326 2.526-.979.69-.652 1.036-1.448 1.036-2.389 0-.94-.346-1.736-1.037-2.388-.69-.651-1.534-.977-2.53-.977-.983 0-1.823.326-2.52.978-.698.653-1.046 1.449-1.046 2.39 0 .94.348 1.736 1.046 2.387.697.652 1.538.978 2.524.978Z" />
    </svg>
  ),
  caretDown: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 10" {...props}>
      <path fill="currentColor" d="M10 10 0 0h20L10 10Z" />
    </svg>
  ),
  add: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path fill="currentColor" d="M8.96376 11.0362H0V8.96376H8.96376V0H11.0362V8.96376H20V11.0362H11.0362V20H8.96376V11.0362Z" />
    </svg>
  ),
  edit: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  fileExport: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 14 20" {...props}>
      <path fill="currentColor" d="M.865 20 0 19.08l3.106-3.21H.532v-1.305H5.24v4.859H3.977v-2.63L.865 20Zm6.368-.65v-1.304h5.18a.31.31 0 0 0 .232-.094.332.332 0 0 0 .092-.24V5.171h-3.75V1.305H1.85a.31.31 0 0 0-.233.094.331.331 0 0 0-.091.24V12.51H.263V1.64c0-.453.155-.84.466-1.16C1.039.16 1.413 0 1.85 0h8.094L14 4.184V17.71c0 .453-.155.839-.465 1.159-.31.32-.684.48-1.123.48H7.233Z" />
    </svg>
  ),
  usersSearch: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 18" {...props}>
      <path fill="currentColor" d="M0 13.925v-1.783c0-.407.093-.762.28-1.065.185-.303.453-.557.802-.764a12.651 12.651 0 0 1 2.73-1.241c.954-.304 2.035-.456 3.24-.456.471 0 .903.024 1.295.072.392.048.784.12 1.178.216a6.698 6.698 0 0 0-.633 1.21 6.694 6.694 0 0 0-.89-.127 12.103 12.103 0 0 0-.942-.036c-1.026 0-1.974.124-2.845.372a9.163 9.163 0 0 0-2.446 1.1c-.181.098-.305.202-.372.313a.768.768 0 0 0-.1.404v.452H8.58c.013.246.042.474.086.685.044.21.101.426.172.648H0Zm7.06-7.27c-.906 0-1.67-.32-2.29-.959-.622-.64-.933-1.425-.933-2.356 0-.932.31-1.717.932-2.356.621-.64 1.385-.96 2.29-.96.906 0 1.67.32 2.29.96.622.639.933 1.424.933 2.356 0 .931-.31 1.717-.932 2.356-.621.64-1.385.959-2.29.959Zm7.216-3.327c0 .923-.31 1.706-.932 2.349-.621.643-1.385.964-2.29.964-.048 0-.066.006-.055.017.012.011-.01.011-.065 0 .385-.452.69-.955.915-1.51.224-.554.336-1.16.336-1.817 0-.654-.115-1.258-.346-1.811A6.205 6.205 0 0 0 10.934 0c.027.004.048.01.063.016a.152.152 0 0 0 .057.008c.905 0 1.669.321 2.29.963.621.64.932 1.421.932 2.34ZM7.064 5.32a1.82 1.82 0 0 0 1.36-.581c.374-.388.56-.855.56-1.403s-.188-1.015-.564-1.4a1.84 1.84 0 0 0-1.365-.577 1.82 1.82 0 0 0-1.36.581 1.949 1.949 0 0 0-.56 1.404c0 .548.188 1.014.564 1.4a1.84 1.84 0 0 0 1.365.576Zm7.003 8.887c.602 0 1.116-.238 1.543-.716.428-.477.635-.983.623-1.517a2.268 2.268 0 0 0-.641-1.577 2.027 2.027 0 0 0-1.525-.65c-.602 0-1.114.216-1.537.65a2.18 2.18 0 0 0-.634 1.58c0 .62.21 1.146.633 1.58.421.434.934.65 1.538.65Zm0 1.335a3.299 3.299 0 0 1-2.46-1.038c-.672-.691-1.008-1.534-1.008-2.526 0-.993.336-1.836 1.008-2.528a3.295 3.295 0 0 1 2.457-1.038c.965 0 1.784.346 2.456 1.038.673.692 1.01 1.533 1.01 2.523 0 .376-.055.732-.164 1.067-.108.335-.25.643-.424.924L20 17.087l-.872.913-3.05-3.137c-.299.221-.614.39-.945.506a3.215 3.215 0 0 1-1.066.173Z" />
    </svg>
  ),
  filter: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 16" {...props}>
      <path fill="currentColor" d="m13.22 8.506 6.614-7.438a.83.83 0 0 0 .12-.183A.499.499 0 0 0 20 .67a.7.7 0 0 0-.172-.465C19.713.068 19.55 0 19.338 0H5.01c-.207 0-.367.068-.482.204a.7.7 0 0 0-.172.465c0 .08.015.152.045.216a.97.97 0 0 0 .116.184l6.612 7.438v6.563c0 .251.092.469.275.653.183.185.4.277.649.277h.249c.25 0 .465-.092.646-.277a.901.901 0 0 0 .272-.653V8.506Zm-9.557 5.955 1.052-1.041-1.961-1.934h4.924V10.01H2.754l1.96-1.928-1.05-1.06L0 10.751l3.663 3.71Zm8.51-7.05L6.81 1.477h10.75l-5.387 5.936Z" />
    </svg>
  ),
  grid: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 20" {...props}>
      <path fill="currentColor" d="M0 8.507V0h8.514v8.507H0ZM0 20v-8.514h8.514V20H0ZM11.493 8.507V0H20v8.507h-8.507Zm0 11.493v-8.514H20V20h-8.507ZM1.553 6.954H6.96v-5.4H1.553v5.4Zm11.493 0h5.4v-5.4h-5.4v5.4Zm0 11.492h5.4V13.04h-5.4v5.408Zm-11.493 0H6.96V13.04H1.553v5.408Z" />
    </svg>
  ),
  list: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 16" {...props}>
      <path fill="currentColor" d="M6.208 14.966V12.96H20v2.007H6.208Zm0-5.977V6.98H20V8.99H6.208Zm0-5.948V1.034H20V3.04H6.208ZM2.07 16a2 2 0 0 1-1.466-.601A1.967 1.967 0 0 1 0 13.953c0-.563.205-1.042.614-1.436a2.05 2.05 0 0 1 1.475-.592 2 2 0 0 1 1.466.601c.403.401.604.883.604 1.446a1.92 1.92 0 0 1-.614 1.436A2.05 2.05 0 0 1 2.07 16Zm0-5.977A2 2 0 0 1 .604 9.42 1.967 1.967 0 0 1 0 7.975c0-.562.205-1.041.614-1.436a2.05 2.05 0 0 1 1.475-.591 2 2 0 0 1 1.466.6c.403.402.604.884.604 1.447a1.92 1.92 0 0 1-.614 1.436 2.05 2.05 0 0 1-1.475.592Zm0-5.948a2 2 0 0 1-1.466-.601A1.967 1.967 0 0 1 0 2.028C0 1.465.205.986.614.592A2.05 2.05 0 0 1 2.089 0a2 2 0 0 1 1.466.601c.403.401.604.883.604 1.446a1.92 1.92 0 0 1-.614 1.436 2.05 2.05 0 0 1-1.475.592Z" />
    </svg>
  ),
  facebook: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 20" {...props}>
      <title>Фейсбук</title>
      <path fill="url(#a)" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z" />
      <path fill="#fff" d="m13.724 13.058.444-2.822H11.39V8.405c0-.772.387-1.526 1.632-1.526h1.264V4.476s-1.147-.19-2.243-.19c-2.29 0-3.785 1.352-3.785 3.799v2.15H5.714v2.823h2.544v6.824a10.335 10.335 0 0 0 3.132 0v-6.824h2.334Z" />
      <defs>
        <linearGradient id="a" x1={10} x2={10} y1={0} y2="19.941" gradientUnits="userSpaceOnUse">
          <stop stopColor="#18ACFE" />
          <stop offset={1} stopColor="#0163E0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  instagram: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 20" {...props}>
      <title>Инстаграм</title>
      <path fill="#C13584" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0Z" />
      <path fill="#fff" d="M10 14.919c1.602 0 1.792-.006 2.425-.035.584-.027.902-.125 1.114-.207.28-.108.48-.239.69-.448.21-.21.34-.41.448-.69.082-.212.18-.53.207-1.114.029-.633.035-.823.035-2.425 0-1.602-.006-1.792-.035-2.425-.027-.585-.125-.902-.207-1.114a1.858 1.858 0 0 0-.448-.69 1.86 1.86 0 0 0-.69-.448c-.212-.083-.53-.18-1.114-.207-.633-.029-.823-.035-2.425-.035-1.602 0-1.792.006-2.425.035-.585.027-.902.125-1.114.207-.28.109-.48.239-.69.448-.21.21-.34.41-.448.69-.083.212-.18.53-.207 1.114-.029.633-.035.823-.035 2.425 0 1.602.006 1.792.035 2.425.027.584.125.902.207 1.114.108.28.238.48.448.69.21.21.41.34.69.448.212.082.53.18 1.114.207.633.029.823.035 2.425.035ZM10 16c-1.63 0-1.834-.007-2.474-.036-.638-.03-1.075-.13-1.456-.279a2.94 2.94 0 0 1-1.063-.692 2.94 2.94 0 0 1-.692-1.063c-.148-.381-.25-.818-.279-1.456C4.006 11.834 4 11.629 4 10c0-1.63.007-1.834.036-2.474.03-.638.13-1.075.279-1.456a2.94 2.94 0 0 1 .692-1.063 2.94 2.94 0 0 1 1.063-.692c.381-.148.818-.25 1.456-.279C8.166 4.007 8.371 4 10 4c1.63 0 1.834.007 2.474.036.638.03 1.075.13 1.456.28.395.152.73.357 1.063.691.333.334.539.668.692 1.063.148.381.25.818.279 1.456.03.64.036.845.036 2.474 0 1.63-.007 1.834-.036 2.474-.03.638-.13 1.075-.279 1.456-.153.395-.359.73-.692 1.063a2.94 2.94 0 0 1-1.063.692c-.381.148-.818.25-1.456.279-.64.03-.845.036-2.474.036Z" />
      <path fill="#fff" d="M10.003 13.078a3.081 3.081 0 1 1 0-6.162 3.081 3.081 0 0 1 0 6.162Zm0-5.08a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM13.925 13.202a.72.72 0 1 0-1.44 0 .72.72 0 0 0 1.44 0Z" />
    </svg>
  ),
  telegram: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 20" {...props}>
      <title>Телеграм</title>
      <path fill="url(#a)" d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z" />
      <path fill="#fff" d="M14.99 5.863c.09-.575-.457-1.029-.969-.804L3.832 9.532c-.366.161-.34.717.04.838l2.102.67c.401.127.835.06 1.185-.181l4.738-3.273c.143-.099.298.104.176.23l-3.41 3.516a.765.765 0 0 0 .133 1.168l3.818 2.395c.428.268.979-.002 1.06-.52l1.317-8.512Z" />
      <defs>
        <linearGradient id="a" x1={10} x2={10} y1={0} y2={20} gradientUnits="userSpaceOnUse">
          <stop stopColor="#37BBFE" />
          <stop offset={1} stopColor="#007DBB" />
        </linearGradient>
      </defs>
    </svg>
  ),
  odnoklassniki: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 20" {...props}>
      <path fill="#fff" d="M4 2h12v16H4z" />
      <path fill="#EB722E" d="M10.01 8.288a1.712 1.712 0 0 0 1.712-1.728A1.715 1.715 0 0 0 10 4.84a1.718 1.718 0 0 0-1.726 1.741c.008.954.777 1.71 1.735 1.707Z" />
      <path fill="#EB722E" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0Zm.014 3.041c1.948.005 3.511 1.599 3.502 3.568-.01 1.924-1.6 3.483-3.544 3.476-1.925-.006-3.503-1.602-3.492-3.53a3.528 3.528 0 0 1 3.534-3.514Zm3.946 8.428c-.431.443-.95.763-1.525.986-.545.21-1.141.317-1.732.388.09.097.132.144.187.2.802.806 1.607 1.607 2.405 2.415.273.275.33.617.18.936-.164.35-.531.58-.89.555-.229-.015-.407-.129-.564-.288-.605-.608-1.221-1.206-1.814-1.826-.172-.18-.255-.146-.408.011-.608.627-1.226 1.243-1.848 1.856-.28.276-.611.325-.936.168-.344-.167-.563-.518-.546-.872.012-.239.13-.421.293-.585.794-.791 1.584-1.585 2.375-2.379.053-.053.102-.108.178-.19-1.079-.113-2.052-.378-2.885-1.03-.103-.08-.21-.159-.304-.25-.365-.35-.401-.751-.113-1.164.247-.354.661-.448 1.092-.245.083.04.163.089.239.141 1.552 1.067 3.684 1.096 5.242.048.155-.118.32-.215.511-.264a.8.8 0 0 1 .918.366c.228.372.225.735-.056 1.024Z" />
    </svg>
  ),
  male: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 8 20" {...props}>
      <path fill="currentColor" d="M1.945 20v-6.883H0V6.924c0-.488.182-.905.547-1.252.364-.347.802-.52 1.314-.52H6.14c.512 0 .95.173 1.314.52.365.347.547.764.547 1.252v6.193H6.055V20h-4.11ZM4 3.751a1.947 1.947 0 0 1-1.394-.547 1.769 1.769 0 0 1-.574-1.33c0-.52.191-.964.574-1.328A1.95 1.95 0 0 1 4.001 0c.547 0 1.012.182 1.394.547.383.364.574.807.574 1.33 0 .52-.191.964-.574 1.328a1.95 1.95 0 0 1-1.396.546Z" />
    </svg>
  ),
  female: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 10 20" {...props}>
      <path fill="currentColor" d="M3.105 20v-5.914H0l3.05-7.9c.161-.4.419-.716.772-.949.353-.233.746-.35 1.178-.35.432 0 .825.117 1.178.35.353.233.61.55.772.949l3.05 7.9H6.895V20h-3.79ZM5 3.751c-.522 0-.965-.182-1.33-.547a1.81 1.81 0 0 1-.547-1.33c0-.52.183-.964.548-1.328A1.814 1.814 0 0 1 5 0c.523 0 .966.182 1.33.547.366.364.548.807.548 1.33 0 .52-.183.964-.548 1.328A1.814 1.814 0 0 1 5 3.75Z" />
    </svg>
  ),
  previous: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 12 20" {...props}>
      <path fill="currentColor" d="M10 20 0 10 10 0l1.775 1.775L3.55 10l8.225 8.225L10 20Z" />
    </svg>
  ),
  next: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 12 20" {...props}>
      <path fill="currentColor" d="M1.809 20 12 10 1.809 0 0 1.775 8.382 10 0 18.225 1.809 20Z" />
    </svg>
  ),
  mail: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 16" {...props}>
      <path fill="currentColor" d="M1.833 16c-.508 0-.94-.181-1.298-.544A1.811 1.811 0 0 1 0 14.136V1.864C0 1.347.178.907.535.544.892.181 1.325 0 1.833 0h16.334c.508 0 .94.181 1.298.544.357.363.535.803.535 1.32v12.272c0 .517-.178.957-.535 1.32-.357.363-.79.544-1.298.544H1.833ZM10 8.527 1.505 2.996v11.138a.32.32 0 0 0 .331.336h16.328a.32.32 0 0 0 .331-.336V2.996L10 8.527Zm0-1.598 8.308-5.4H1.692L10 6.93ZM1.505 2.996V1.529v12.605a.32.32 0 0 0 .331.336h-.331V2.997Z" />
    </svg>
  ),
  call: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 20" {...props}>
      <path fill="currentColor" d="M1.253 20c2.19 0 4.402-.518 6.637-1.555 2.236-1.037 4.293-2.5 6.172-4.392 1.89-1.88 3.351-3.937 4.386-6.168C19.483 5.653 20 3.44 20 1.247c0-.353-.118-.649-.355-.888A1.195 1.195 0 0 0 18.76 0h-3.76c-.305 0-.567.093-.789.278-.221.185-.366.43-.436.731l-.69 3.449c-.048.286-.036.546.037.778.074.233.194.43.36.59L16.2 8.49c-.454.82-.963 1.593-1.527 2.318a21.743 21.743 0 0 1-1.829 2.067 20.492 20.492 0 0 1-2.073 1.82A21.858 21.858 0 0 1 8.36 16.29l-2.729-2.728a1.348 1.348 0 0 0-.596-.376 1.773 1.773 0 0 0-.729-.046l-3.272.657c-.305.07-.554.222-.746.456a1.213 1.213 0 0 0-.289.793v3.713A1.22 1.22 0 0 0 1.253 20ZM17.006 6.9l-2.15-2.058a.227.227 0 0 1-.07-.127.327.327 0 0 1 0-.15l.539-2.694a.249.249 0 0 1 .08-.139.234.234 0 0 1 .151-.046h2.562c.05 0 .09.015.119.046.029.031.044.07.044.116-.046.807-.176 1.64-.39 2.498-.214.858-.509 1.71-.885 2.554ZM6.765 17.072c-.785.372-1.612.657-2.48.854-.87.197-1.682.314-2.437.351a.157.157 0 0 1-.116-.046.157.157 0 0 1-.046-.116v-2.536c0-.061.015-.112.046-.15a.249.249 0 0 1 .14-.081l2.481-.53a.22.22 0 0 1 .122 0 .325.325 0 0 1 .11.07l2.18 2.184Z" />
    </svg>
  ),
  close: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 20 20" {...props}>
      <path fill="currentColor" d="M1.584 20 0 18.416 8.416 10 0 1.584 1.584 0 10 8.416 18.416 0 20 1.584 11.584 10 20 18.416 18.416 20 10 11.584 1.584 20Z" />
    </svg>
  ),
  info: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg fill="none" viewBox="0 0 5 20" {...props}>
      <path fill="currentColor" d="M2.5 4.444c-.688 0-1.276-.217-1.766-.652C.244 3.356 0 2.833 0 2.222c0-.61.245-1.134.734-1.57C1.224.219 1.813 0 2.5 0c.688 0 1.276.218 1.766.653.49.435.734.958.734 1.57 0 .61-.245 1.133-.734 1.569-.49.435-1.079.652-1.766.652ZM.625 20V6.667h3.75V20H.625Z" />
    </svg>
  ),
  delete: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  phone: (props: SVGProps<SVGSVGElement>): JSX.Element => (
    <svg viewBox="0 0 384 512"{...props}>
      <path fill="currentColor" d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64H80V384H304V64z" />
    </svg>
  ),
};
