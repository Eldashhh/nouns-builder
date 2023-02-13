import React, { ReactNode, Fragment } from 'react'
import { Flex, Text, TextProps } from '@zoralabs/zord'
import { proposalTileSubtitleVariants } from './index.css'

interface ProposalTileProps {
  title: string
  subtitle: string | number
  subtext?: string
  children?: ReactNode | TextProps
  variant?: 'for' | 'against' | 'abstain'
}

const ProposalTile: React.FC<ProposalTileProps> = (props) => {
  const { title, subtitle, subtext, children, variant } = props

  return (
    <Flex
      p={{ '@initial': 'x4', '@768': 'x6' }}
      direction={{ '@initial': 'row', '@768': 'column' }}
      borderWidth={'normal'}
      borderColor={'border'}
      borderStyle={'solid'}
      borderRadius={'curved'}
      justify={{ '@initial': 'space-between', '@768': 'flex-start' }}
    >
      <Flex w={children ? '100%' : 'auto'} direction={'column'}>
        <Text
          fontSize={16}
          fontWeight={'display'}
          mb={{ '@initial': 'x2', '@768': 'x4' }}
        >
          {title}
        </Text>
        <Text
          className={
            proposalTileSubtitleVariants[
              (variant as keyof typeof proposalTileSubtitleVariants) || 'default'
            ]
          }
        >
          {subtitle}
        </Text>
        {children && <Fragment>{children as ReactNode}</Fragment>}
      </Flex>
      {subtext && (
        <Text color={'tertiary'} pt={'x1'}>
          {subtext}
        </Text>
      )}
    </Flex>
  )
}

export default ProposalTile
