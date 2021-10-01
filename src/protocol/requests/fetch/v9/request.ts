// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Encoder'.
const Encoder = require('../../../encoder')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'apiKey'.
const { Fetch: apiKey } = require('../../apiKeys')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ISOLATION_... Remove this comment to see the full error message
const ISOLATION_LEVEL = require('../../../isolationLevel')

/**
 * Allow fetchers to detect and handle log truncation
 * @see https://cwiki.apache.org/confluence/display/KAFKA/KIP-320%3A+Allow+fetchers+to+detect+and+handle+log+truncation
 */

/**
 * Fetch Request (Version: 9) => replica_id max_wait_time min_bytes max_bytes isolation_level session_id session_epoch [topics] [forgotten_topics_data]
 *   replica_id => INT32
 *   max_wait_time => INT32
 *   min_bytes => INT32
 *   max_bytes => INT32
 *   isolation_level => INT8
 *   session_id => INT32
 *   session_epoch => INT32
 *   topics => topic [partitions]
 *     topic => STRING
 *     partitions => partition current_leader_epoch fetch_offset log_start_offset partition_max_bytes
 *       partition => INT32
 *       current_leader_epoch => INT32
 *       fetch_offset => INT64
 *       log_start_offset => INT64
 *       partition_max_bytes => INT32
 *   forgotten_topics_data => topic [partitions]
 *     topic => STRING
 *     partitions => INT32
 */

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
export ({
  replicaId,
  maxWaitTime,
  minBytes,
  maxBytes,
  topics,
  isolationLevel = ISOLATION_LEVEL.READ_COMMITTED,
  sessionId = 0,
  sessionEpoch = -1,

  // Topics to remove from the fetch session
  forgottenTopics = []
}: any) => ({
  apiKey,
  apiVersion: 9,
  apiName: 'Fetch',
  encode: async () => {
    return new Encoder()
      .writeInt32(replicaId)
      .writeInt32(maxWaitTime)
      .writeInt32(minBytes)
      .writeInt32(maxBytes)
      .writeInt8(isolationLevel)
      .writeInt32(sessionId)
      .writeInt32(sessionEpoch)
      .writeArray(topics.map(encodeTopic))
      .writeArray(forgottenTopics.map(encodeForgottenTopics))
  },
})

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'encodeForg... Remove this comment to see the full error message
const encodeForgottenTopics = ({
  topic,
  partitions
}: any) => {
  return new Encoder().writeString(topic).writeArray(partitions)
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'encodeTopi... Remove this comment to see the full error message
const encodeTopic = ({
  topic,
  partitions
}: any) => {
  return new Encoder().writeString(topic).writeArray(partitions.map(encodePartition))
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'encodePart... Remove this comment to see the full error message
const encodePartition = ({
  partition,
  currentLeaderEpoch = -1,
  fetchOffset,
  logStartOffset = -1,
  maxBytes
}: any) => {
  return new Encoder()
    .writeInt32(partition)
    .writeInt32(currentLeaderEpoch)
    .writeInt64(fetchOffset)
    .writeInt64(logStartOffset)
    .writeInt32(maxBytes)
}
