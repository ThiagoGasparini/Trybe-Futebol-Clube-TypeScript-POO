import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsRoute = Router();

const teamsController = new TeamsController();

teamsRoute.get('/', teamsController.getAllTeams);
teamsRoute.get('/:id', teamsController.getById);

export default teamsRoute;
