import type { ReactNode } from 'react'
import Link from 'next/link'

import { Box } from 'components/OffsetBorder/Box'
import { RawButton } from 'components/Button'
import Chip from 'components/Chip'

type CTAStatus = 'over' | 'active' | 'soon'

type CTAProps = {
  title: string
  content?: ReactNode
  children?: ReactNode
  kind?: string
  earn?: number
  points?: string[]
  ctaText?: string
  href?: string
  status?: CTAStatus
  submissionForm?: boolean
}

export const CallToAction = ({
  children,
  title,
  points = [],
  kind = 'Earn Points By',
  earn = 1000,
  href,
  ctaText,
  status = 'active',
  submissionForm = false,
}: CTAProps) => {
  const comingSoon = status === 'soon'
  const ended = status === 'over'
  const button = ctaText ? (
    <RawButton
      border="border"
      className="m-auto w-full max-w-md mb-2 text-md p-2"
      colorClassName="text-black bg-transparent hover:bg-black hover:text-white"
    >
      {href ? <Link href={href}>{ctaText}</Link> : ctaText}
    </RawButton>
  ) : null
  return (
    <div className="mb-3">
      <Box behind="bg-ifpink">
        <div className="p-13">
          <Chip />
          {ended || comingSoon ? (
            <div className="bg-iflightgray text-ifgray px-4 py-2 inline-block mt-2 text-xs md:text-md mb-2">
              {comingSoon ? 'Coming soon!' : 'Phase 1 Ended'}
            </div>
          ) : (
            <strong className="uppercase text-lg">{kind}</strong>
          )}
          <h3 className="text-left text-4xl mt-3 mb-4 font-extended">
            {title}
          </h3>
          {children}
          {points && points.length > 0 && (
            <ul className="pl-3 ml-3">
              {points.map((p: string) => (
                <li className="list-disc my-3" key={p}>
                  {p}
                </li>
              ))}
            </ul>
          )}
          {earn > 0 && !comingSoon && !ended && (
            <div className="bg-ifpink px-4 py-2 inline-block mt-2 text-xs md:text-md">
              Earn up to {earn.toLocaleString('en-US')} points a week
            </div>
          )}
          <div className="mb-8" />
          {!ended && ctaText && href && button ? (
            <Link href={href}>{button}</Link>
          ) : (
            button
          )}
          {!ended && submissionForm && (
            <Link href="https://forms.gle/yrAtzoyKTwLgLTRZA" passHref>
              <RawButton
                border="border"
                className="m-auto w-full mt-2 max-w-md mb-2 text-md p-2"
                colorClassName="text-black bg-transparent hover:bg-black hover:text-white"
              >
                Claim Points
              </RawButton>
            </Link>
          )}
        </div>
      </Box>
    </div>
  )
}

export const renderColumn = ({ title, content, ...ctaProps }: CTAProps) => (
  <CallToAction title={title} key={title} {...ctaProps}>
    <div>{content}</div>
  </CallToAction>
)

export default CallToAction
