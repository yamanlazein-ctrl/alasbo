// Centerlines are traced in the approved PNG's 1671 × 941 coordinate space.
// These paths only reveal pixels from that image.
const strokes = [
  ['M1427 84 C1350 203 1380 317 1399 463 S1432 660 1321 737', 115],
  ['M1328 132 C1283 188 1273 225 1294 295 S1364 549 1311 606 C1276 655 1211 642 1179 601', 118],
  ['M1268 268 C1221 331 1134 350 1067 410 C1023 447 996 485 982 521', 72],
  ['M1178 598 C1242 580 1264 510 1227 470 C1185 416 1104 479 1046 538 L995 592 C1052 657 1123 616 1178 598', 111],
  ['M886 137 C827 215 851 314 852 430 S856 622 901 597 C936 578 953 539 977 505', 105],
  ['M982 567 C989 679 891 742 790 786 C642 852 503 831 423 750', 112],
  ['M772 340 C755 384 801 418 800 474 C810 529 695 547 636 549 C600 547 605 488 639 458 C676 422 710 472 714 517 C720 599 659 687 565 721 C511 741 463 742 429 731', 108],
  ['M496 351 C502 403 550 439 525 501 C508 547 415 537 401 581 C468 574 549 592 513 648 C471 720 340 759 274 724 C208 683 214 610 254 548 C281 510 321 468 352 440', 115],
] as const

const details = [
  'M444 274 L510 338 L444 403 L379 338 Z',
  'M766 578 L831 646 L766 709 L700 646 Z',
  'M335 763 L400 828 L335 896 L269 828 Z',
  'M415 762 L484 827 L415 895 L347 827 Z',
]

export function BrandStrokeMask() {
  return (
    <svg className="pointer-events-none absolute size-0" aria-hidden="true" focusable="false">
      <defs>
        <mask id="brand-stroke-reveal" x="0" y="0" width="1" height="1" maskContentUnits="objectBoundingBox">
          <g transform="scale(.000598444 .001062699)">
            <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
              {strokes.map(([d, width]) => (
                <path key={d} d={d} strokeWidth={width} data-brand-stroke="" />
              ))}
            </g>
            <g fill="white">
              {details.map((d) => <path key={d} d={d} data-brand-detail="" />)}
            </g>
          </g>
        </mask>
      </defs>
    </svg>
  )
}
