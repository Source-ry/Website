import React from 'react'

import { LocalizedLink, useLocalization } from 'gatsby-theme-i18n'
import styled from '@emotion/styled'
import tw from 'twin.macro'


interface LocalizedLinkProps {
  [x: string]: any;
  to: any;
  language: any;
}

interface LocalizedLinkStyleProps {
  $isActive: boolean
}

const WrappedLocalizedLink: React.FC<LocalizedLinkProps & LocalizedLinkStyleProps> = ({ $isActive, ...props }) =>
  <LocalizedLink {...props} />

const StyledLocalizedLink = styled(WrappedLocalizedLink)`
  ${tw`
    uppercase
    text-lg
    font-sans
  `}

  ${({ $isActive }) => $isActive && tw`
    font-bold
  `}
`

export interface NavigationBarItemProps {
  url: string
  children?: React.ReactNode
}

export const NavigationBarItem: React.FC<NavigationBarItemProps> = ({ url, children }) => {
  const { locale } = useLocalization()

  const isActive = React.useMemo(() => window.location.href.endsWith(url), [url])

  return (
    <StyledLocalizedLink
      to={url}
      language={locale}
      $isActive={isActive}>
      {children}
    </StyledLocalizedLink>
  )
}
