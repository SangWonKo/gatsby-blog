/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import * as S from './styles'

interface BioProps {
  title?: string
}
const Bio = ({ title }: BioProps) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      image: file(absolutePath: { regex: "/profile_image.jpeg/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 160, height: 160, placeholder: BLURRED)
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
            email
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const img = data.image

  return (
    <S.BioWrapper>
      <S.BioContainer>
        {title && <S.BioTitle>{title}</S.BioTitle>}
        <S.BioSubtitle>Frontend Engineer</S.BioSubtitle>
        {author?.name && (
          <S.BioContent>
            Written by <strong>{author.name}</strong> {author?.summary || null}
          </S.BioContent>
        )}
        <S.BioSocialWrapper>
          <a href={social?.github || ``} target="_blank" rel="noreferrer">
            Github
          </a>
          <a href={social?.email ? `mailto:${social.email}` : ``}>Email</a>
        </S.BioSocialWrapper>
      </S.BioContainer>
      <GatsbyImage
        image={img.childImageSharp.gatsbyImageData}
        alt="profile image"
        style={{ borderRadius: '16px' }}
      />
    </S.BioWrapper>
  )
}

export default Bio