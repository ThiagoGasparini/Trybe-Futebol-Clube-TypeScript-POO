import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/matches';

const MatchesMock =[
  {
    home_team: 16,
    home_team_goals: 1,
    away_team: 8,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 9,
    home_team_goals: 1,
    away_team: 14,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 4,
    home_team_goals: 3,
    away_team: 11,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team: 3,
    home_team_goals: 0,
    away_team: 2,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team: 7,
    home_team_goals: 1,
    away_team: 10,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 5,
    home_team_goals: 1,
    away_team: 13,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 12,
    home_team_goals: 2,
    away_team: 6,
    away_team_goals: 2,
    in_progress: false,
  },
  {
    home_team: 15,
    home_team_goals: 0,
    away_team: 1,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 1,
    home_team_goals: 0,
    away_team: 12,
    away_team_goals: 3,
    in_progress: false,
  },
  {
    home_team: 2,
    home_team_goals: 0,
    away_team: 9,
    away_team_goals: 2,
    in_progress: false,
  },
  {
    home_team: 13,
    home_team_goals: 1,
    away_team: 3,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team: 6,
    home_team_goals: 0,
    away_team: 4,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 8,
    home_team_goals: 2,
    away_team: 5,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 14,
    home_team_goals: 2,
    away_team: 16,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 10,
    home_team_goals: 0,
    away_team: 15,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 11,
    home_team_goals: 0,
    away_team: 7,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team: 1,
    home_team_goals: 2,
    away_team: 8,
    away_team_goals: 3,
    in_progress: false,
  },
  {
    home_team: 12,
    home_team_goals: 4,
    away_team: 5,
    away_team_goals: 2,
    in_progress: false,
  },
  {
    home_team: 11,
    home_team_goals: 2,
    away_team: 2,
    away_team_goals: 2,
    in_progress: false,
  },
  {
    home_team: 7,
    home_team_goals: 0,
    away_team: 9,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 6,
    home_team_goals: 3,
    away_team: 13,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 4,
    home_team_goals: 3,
    away_team: 3,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 15,
    home_team_goals: 2,
    away_team: 16,
    away_team_goals: 3,
    in_progress: false,
  },
  {
    home_team: 10,
    home_team_goals: 2,
    away_team: 14,
    away_team_goals: 2,
    in_progress: false,
  },
  {
    home_team: 2,
    home_team_goals: 0,
    away_team: 6,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 13,
    home_team_goals: 1,
    away_team: 1,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team: 5,
    home_team_goals: 1,
    away_team: 15,
    away_team_goals: 2,
    in_progress: false,
  },
  {
    home_team: 16,
    home_team_goals: 3,
    away_team: 7,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team: 9,
    home_team_goals: 0,
    away_team: 4,
    away_team_goals: 4,
    in_progress: false,
  },
  {
    home_team: 3,
    home_team_goals: 0,
    away_team: 12,
    away_team_goals: 4,
    in_progress: false,
  },
  {
    home_team: 8,
    home_team_goals: 2,
    away_team: 10,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team: 14,
    home_team_goals: 5,
    away_team: 11,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 1,
    home_team_goals: 1,
    away_team: 16,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 9,
    home_team_goals: 3,
    away_team: 6,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 10,
    home_team_goals: 1,
    away_team: 5,
    away_team_goals: 3,
    in_progress: false,
  },
  {
    home_team: 2,
    home_team_goals: 0,
    away_team: 7,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 15,
    home_team_goals: 0,
    away_team: 13,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 14,
    home_team_goals: 2,
    away_team: 4,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 3,
    home_team_goals: 2,
    away_team: 11,
    away_team_goals: 0,
    in_progress: false,
  },
  {
    home_team: 12,
    home_team_goals: 4,
    away_team: 8,
    away_team_goals: 1,
    in_progress: false,
  },
  {
    home_team: 16,
    home_team_goals: 2,
    away_team: 9,
    away_team_goals: 0,
    in_progress: true,
  },
  {
    home_team: 6,
    home_team_goals: 1,
    away_team: 1,
    away_team_goals: 0,
    in_progress: true,
  },
  {
    home_team: 11,
    home_team_goals: 0,
    away_team: 10,
    away_team_goals: 0,
    in_progress: true,
  },
  {
    home_team: 7,
    home_team_goals: 2,
    away_team: 15,
    away_team_goals: 2,
    in_progress: true,
  },
  {
    home_team: 5,
    home_team_goals: 1,
    away_team: 3,
    away_team_goals: 1,
    in_progress: true,
  },
  {
    home_team: 4,
    home_team_goals: 1,
    away_team: 12,
    away_team_goals: 1,
    in_progress: true,
  },
  {
    home_team: 8,
    home_team_goals: 1,
    away_team: 14,
    away_team_goals: 2,
    in_progress: true,
  },
  {
    home_team: 13,
    home_team_goals: 1,
    away_team: 2,
    away_team_goals: 1,
    in_progress: true,
  }
]

const token = Jwt.sign({ userId: 1 }, 'jwt_secret', {
  expiresIn: '1d',
});

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota Matches', () => {
  describe('get /matches', () => {
    before(() => {
      sinon.stub(Match, 'findAll').resolves(MatchesMock as unknown as Match[]);
    })

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    })
    it('Retornando a lista de Partidas com o status 200', async () => {
      const response = await chai.request(app).get('/matches');
      expect(response.body).to.be.an('array');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(MatchesMock);
    })
  })
})