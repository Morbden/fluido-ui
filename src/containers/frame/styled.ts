import { styled } from 'ui-styled'
import { Box, BoxProps } from '../box'

export interface FrameProps_ extends BoxProps {
  allowOverflow?: boolean
  context?: boolean
  objectFit?: 'cover' | 'contain'
  preserveRatio?: boolean
  ratio?: string | number
}

function getRatios(ratio: string | number) {
  if (typeof ratio === 'string') {
    const ratios = ratio.trim().split(/\/|:|x/)
    if (ratios.length === 1) ratios[1] = ratios[0]
    return `
    --aspect-w: ${ratios[0]};
    --aspect-h: ${ratios[1]};
    `
  }
  return `
    --aspect-w: ${ratio};
    --aspect-h: ${1};
    `
}

export const Frame_ = styled(Box)<FrameProps_>`
  ${({ ratio }) => getRatios(ratio || 1)}
  aspect-ratio: var(--aspect-w) / var(--aspect-h);
  display: grid;
  grid-template-areas: 'cell';
  position: relative;
  overflow: #and(!$allowOverflow, hidden);
  min-height: #and($preserveRatio, 0);
  isolation: #and($context, isolate);

  & > img,
  & > video,
  & > [style] {
    width: 100%;
    height: 100%;
    object-fit: $objectFit;
  }

  @supports not (aspect-ratio: 1 / 1) {
    &::before {
      grid-area: cell;
      padding-bottom: calc(var(--aspect-h) / var(--aspect-w) * 100%);
      content: '';
    }

    & > * {
      grid-area: cell;
      position: #select($preserveRatio || $allowOverflow, absolute);
    }
  }
`
