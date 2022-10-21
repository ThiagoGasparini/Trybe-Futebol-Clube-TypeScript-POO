import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/user';

chai.use(chaiHttp);

const expect = chai.expect;

const UserLogin = {
  email: 'divinesmite@critic.com',
  password: 'secret_admin',
}

const UsersMock =  [
  {
    username: 'Thorim',
    role: 'Paladin',
    email: 'divinesmite@critic.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      // senha: secret_admin
  },
  {
    username: 'Zoro',
    role: 'espadachim',
    email: 'santoryu@ougi.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
      // senha: secret_user
  },
]

const token = Jwt.sign({ userId: 1 }, 'jwt_secret', {
  expiresIn: '1d',
});

describe('Rota Login', () => {
  describe('Usuário válido', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(UsersMock[0] as User);
    })

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Retorna um Token JWT com status 200', async () => {
      const response = await chai.request(app)
        .post('/login')
        .send(UserLogin);

      expect(response.body).to.have.property('token');
      expect(response.status).to.be.equal(200);
    });
  })
  describe('Rota /login/validate', () => {
    beforeEach(async () => {
      sinon.stub(User, 'findOne').resolves(UsersMock[0] as User);
    })

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    })
    it('Retornar usuário encontrado', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', token);
        expect(response.body).to.be.deep.equal({ role: UsersMock[0].role });
        expect(response.status).to.be.equal(200);
    })
  })
})
