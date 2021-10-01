// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RequestV0P... Remove this comment to see the full error message
import RequestV0Protocol from './request'
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'RESOURCE_T... Remove this comment to see the full error message
import RESOURCE_TYPES from '../../../resourceTypes'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Protocol > Requests > AlterConfigs > v0', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('request', async () => {
    const { buffer } = await RequestV0Protocol({
      resources: [
        {
          type: RESOURCE_TYPES.TOPIC,
          name: 'test-topic-d7fa92c03177d87573b1-38076-21364f66-8613-47e0-b273-bc9de397515e',
          configEntries: [{ name: 'cleanup.policy', value: 'compact' }],
        },
      ],
      validateOnly: false,
    }).encode()
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'expect'.
    expect(buffer).toEqual(Buffer.from(require('../fixtures/v0_request.json')))
  })
})
