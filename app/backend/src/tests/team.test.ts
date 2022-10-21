import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Team from '../database/models/teams';
import { app } from '../app';

const TeamsMock = [
  {
    team_name: 'team 1',
  },
  {
    team_name: 'team 2',
  },
  {
    team_name: 'team 3',
  },
  {
    team_name: 'team 4',
  },
  {
    team_name: 'team 5',
  },
  {
    team_name: 'team 6',
  },
  {
    team_name: 'team 7',
  },
  {
    team_name: 'team 8',
  },
  {
    team_name: 'team 9',
  },
  {
    team_name: 'team 10',
  },
  {
    team_name: 'team 11',
  },
  {
    team_name: 'team 12',
  },
  {
    team_name: 'team 13',
  },
  {
    team_name: 'team 14',
  },
  {
    team_name: 'team 15',
  },
  {
    team_name: 'team 16',
  },
]

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota Teams', () => {
  describe('get /teams', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findAll').resolves(TeamsMock as unknown as Team[]);
    })

    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
    })
    it('Retornando a lista de Times com o status 200', async () => {
      const response = await chai.request(app).get('/teams');
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(TeamsMock);
    })
  })
  describe('get /teams/:id', () => {
    beforeEach(() => {
      sinon.stub(Team, 'findOne').resolves(TeamsMock[0] as unknown as Team);
    })

    afterEach(() => {
      (Team.findOne as sinon.SinonStub).restore();
    })
    it('Retornando um Time com o status 200', async () => {
      const response = await chai.request(app).get('/teams/1');
      expect(response.body).to.be.an('object');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(TeamsMock[0]);
    })
  })
});