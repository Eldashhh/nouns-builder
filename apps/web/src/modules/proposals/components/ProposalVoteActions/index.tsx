import React, { Fragment } from 'react'
import { Flex } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import { useDaoStore, useLayoutStore } from 'src/stores'
import { Proposal, ProposalStatus, ProposalVote } from 'src/typings'
import VoteStatus from './VoteStatus'
import { AddressType } from 'src/typings'
import { isProposalOpen } from '../../utils'
import OwnerActions from './OwnerActions'
import { useContractReads } from 'wagmi'
import { governorAbi } from 'src/constants/abis'

interface ProposalActionsProps {
  daoName?: string
  proposal: Proposal
}

const ProposalActions: React.FC<ProposalActionsProps> = ({ daoName, proposal }) => {
  const signerAddress = useLayoutStore((state) => state.signerAddress)
  const addresses = useDaoStore((state) => state.addresses)

  const { proposer, title, voteStart, proposalId, timeCreated, status } = proposal

  const { data } = useContractReads({
    enabled: !!signerAddress,
    contracts: [
      {
        abi: governorAbi,
        address: addresses?.governor,
        functionName: 'getVotes',
        args: [signerAddress as AddressType, BigNumber.from(timeCreated)],
      },
      {
        abi: governorAbi,
        address: addresses?.governor,
        functionName: 'vetoer',
      },
    ],
  })

  if (!data) return null

  const [votes, vetoer] = data

  const votesAvailable = !!votes ? votes.toNumber() : 0

  const signerVote: ProposalVote | undefined = signerAddress
    ? proposal.votes?.find(
        (vote) =>
          ethers.utils.getAddress(vote.voter) === ethers.utils.getAddress(signerAddress)
      )
    : undefined

  const proposalOpen = isProposalOpen(status)
  const isProposer =
    !!signerAddress &&
    ethers.utils.getAddress(proposer) == ethers.utils.getAddress(signerAddress)

  const isVetoer = signerAddress === vetoer

  const shouldShowActions =
    status === ProposalStatus.Active ||
    status === ProposalStatus.Pending ||
    signerVote ||
    votesAvailable !== 0 ||
    isProposer ||
    isVetoer

  if (!shouldShowActions) return null

  const showCancel = proposalOpen && isProposer
  const showVeto = proposalOpen && isVetoer

  return (
    <Fragment>
      <Flex
        direction={{ '@initial': 'column', '@768': 'row' }}
        w={'100%'}
        align={'center'}
        justify={'space-between'}
        p={{ '@initial': 'x4', '@768': 'x6' }}
        gap={'x3'}
        borderStyle={'solid'}
        borderWidth={'normal'}
        borderColor={'border'}
        borderRadius={'curved'}
      >
        <VoteStatus
          signerVote={signerVote}
          votesAvailable={votesAvailable}
          proposalId={proposalId}
          voteStart={voteStart}
          state={status}
          daoName={daoName}
          title={title}
        />

        {(showCancel || showVeto) && (
          <OwnerActions
            proposalId={proposalId}
            showCancel={showCancel}
            showVeto={showVeto}
          />
        )}
      </Flex>
    </Fragment>
  )
}

export default ProposalActions
