import React, { ReactNode } from 'react'
import { atoms, Flex, Box, Text } from '@zoralabs/zord'
import { Icon } from 'src/components/Icon'
import { BuilderTransaction } from '../../stores/useProposalStore'
import TransactionTypeIcon from '../TransactionTypeIcon'

export enum SimulationError {
  SimulationFailed, // Whole simulation has failed
  TransactionFailed, // One or more of the transactions in the transaction bundle has failed
}

interface ReviewCardProps {
  handleEdit?: () => void
  handleRemove?: () => void
  simulationUrls?: Array<string | undefined>
  simulationError?: SimulationError
  transaction: BuilderTransaction
  disabled?: boolean
  children?: ReactNode
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  handleEdit,
  handleRemove,
  simulationError,
  simulationUrls,
  transaction,
  disabled,
  children,
}) => {
  const showCardAction = (handleEdit && !disabled) || (handleRemove && !disabled)

  const type = transaction.type

  const summary = transaction?.summary
    ? transaction.summary
    : transaction.transactions
        .map(({ functionSignature }) => functionSignature)
        .join(', ')

  return (
    <Box data-testid="review-card">
      <Flex
        gap={'x4'}
        align={'center'}
        justify={'space-between'}
        borderWidth={'normal'}
        borderStyle={'solid'}
        borderColor={simulationError ? 'negative' : 'ghostHover'}
        style={{ borderRadius: '12px' }}
        px={'x4'}
      >
        <Flex align={'center'} gap={'x2'}>
          <TransactionTypeIcon transactionType={type} />
          <Text
            fontSize={16}
            style={{ marginBottom: '2px', textOverflow: 'ellipsis' }}
            className={atoms({
              lineHeight: 24,
              maxWidth: !disabled ? 'x64' : 'auto',
            })}
          >
            {summary}
          </Text>
          {children}
        </Flex>

        {showCardAction && (
          <Flex align={'center'} gap={'x2'} data-testid="actions">
            {handleEdit && (
              <Flex
                as={'button'}
                py={'x2'}
                px={'x4'}
                fontSize={16}
                fontWeight={'label'}
                borderWidth={'none'}
                cursor={'pointer'}
                style={{ lineHeight: '24px', borderRadius: '8px' }}
                alignSelf={'flex-end'}
                onClick={handleEdit}
                type={'button'}
                data-testid="edit"
              >
                Edit
              </Flex>
            )}
            {handleRemove && (
              <Flex onClick={handleRemove} cursor={'pointer'} data-testid="remove">
                <Icon id={'cross'} />
              </Flex>
            )}
          </Flex>
        )}
      </Flex>

      {simulationError === SimulationError.TransactionFailed && (
        <Box color="negative" mt={'x2'}>
          <Text mb={'x2'}>
            Some of the transactions in this bundle will fail to execute.
          </Text>
          {simulationUrls?.map((url) => (
            <Text key={url} mb={'x2'} fontWeight={'display'}>
              <a href={url} target="_blank" rel="noreferrer">
                View details
              </a>
            </Text>
          ))}
        </Box>
      )}
    </Box>
  )
}
