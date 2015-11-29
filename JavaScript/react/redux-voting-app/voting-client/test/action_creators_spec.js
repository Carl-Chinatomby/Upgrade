import {expect} from 'chai';
import {fromJS} from 'immutable';

import {setState, vote} from '../src/action_creators';

describe('action_creators', () => {

  it('correctly formats SET_STATE action', () => {
    const state = fromJS({
      state: {
        vote: {
            pair: ['Trainspotting', '28 Days Later']
        }
      }
    })
    const action = setState(state);

    expect(action).to.have.all.keys('type', 'state');
    expect(action.type).to.equal('SET_STATE');
    expect(action.state).to.equal(state);

  });

  it('correctly formats VOTE action', () => {
    const entry = 'Trainspotting'
    const action = vote(entry)

    expect(action).to.have.all.keys('type', 'entry');
    expect(action.type).to.equal('VOTE');
    expect(action.entry).to.equal(entry);
  });

});
