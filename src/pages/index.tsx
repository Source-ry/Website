import React from 'react'

import { graphql } from 'gatsby'

export interface FrontPageProps {
  data: {
    strapiFrontPage: {
      id: string
      body: string
      locale: 'fi' | 'en'
    }
  }
}

export const query = graphql`
  query FrontPageQuery {
    strapiFrontPage {
      id
      body
      locale
    }
  }
`

export default function FrontPage (props: FrontPageProps): JSX.Element {
  return (
    <>
      <p>Hello, world!</p>
      <div>
        {props.data.strapiFrontPage.body}
      </div>
    </>
  )
}

