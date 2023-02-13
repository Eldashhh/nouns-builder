import ProposalTile from '.'
import React, { Fragment } from 'react'
import { Box } from '@zoralabs/zord'
import { screen } from '@testing-library/react'
import { render } from 'src/test/utils'
import { describe, expect, it } from 'vitest'

describe('proposal tile', () => {
  it('should render a proposal tile', async () => {
    render(
      <Fragment>
        <ProposalTile
          title={'Threshold'}
          subtitle={'1 vote'}
          subtext={'Current threshold'}
        />
      </Fragment>
    )

    expect(screen.getByText(/Threshold/)).toBeInTheDocument()
    expect(screen.getByText(/1 vote/)).toBeInTheDocument()
    expect(screen.getByText(/Current threshold/)).toBeInTheDocument()
  })
})
